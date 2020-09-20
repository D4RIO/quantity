/*
  @licstart  The following is the entire license notice for the 
  JavaScript code in this page.

  Copyright (C) 2020 by Rodriguez, Dario Andres

  The JavaScript code in this page is free software: you can
  redistribute it and/or modify it under the terms of the GNU
  General Public License (GNU GPL) as published by the Free Software
  Foundation, either version 3 of the License, or (at your option)
  any later version.  The code is distributed WITHOUT ANY WARRANTY;
  without even the implied warranty of MERCHANTABILITY or FITNESS
  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

  As additional permission under GNU GPL version 3 section 7, you
  may distribute non-source (e.g., minimized or compacted) forms of
  that code without the copy of the GNU GPL normally required by
  section 4, provided you include this license notice and a URL
  through which recipients can access the Corresponding Source.   


  @licend  The above is the entire license notice
  for the JavaScript code in this page.

  ===============================================================

  This code is meant to use the International Vocabulary of
  Metrology guidelines, as published by the Joint Committee for
  Guides in Metrology (JCGM), in JavaScript.

  I do not 

*/
function reverseString(str) {
  var temp = "";
  for (i = str.length - 1; i >= 0; i--) temp += str.charAt(i);
  return temp;
}

function addGroupSeparator(yourNumber, separator, isDecimal = false) {
  var number = yourNumber.toString();

  if (typeof number != "undefined") {
    /* if it is the whole part, reverse the digits */
    if (!isDecimal) {
      number = reverseString(number);
    }

    number = number.replace(/(\d{3})/g, "$1" + separator);
    if (number.slice(-separator.length) == separator)
      number = number.slice(0, -separator.length);

    if (!isDecimal) {
      number = reverseString(number);
    }
  }
  return number;
}

function getIntegralPart(num) {
  return Math.trunc(num).toString();
}

function getDecimalPart(num, numDecimals) {
  var fraction = (num.toFixed(numDecimals) - Math.trunc(num))
    .toFixed(numDecimals)
    .toString()
    .slice(2);
  if (num < 0) fraction = fraction.slice(1);
  return fraction;
}

/***************************************************************************/
/*                            CLASS Quantity                               */
/***************************************************************************/

class Quantity {
  /**
   * @param {float} yourNumber - The number you want to set
   */
  constructor(yourNumber) {
    this._number = yourNumber;
    this._config = {
      decimalMarker: ".",
      decimalPlaces: 2,
      useGroupSeparator: true,
      useGroupSeparatorOnDecimals: true,
      unit: "",
    };
  }

  /**
   * @param {float} yourNumber - The number you want to set
   */
  set number(yourNumber) {
    this._number = yourNumber;
  }

  get number() {
    return this._number;
  }

  get decimalMarker() {
    return this._config.decimalMarker;
  }

  /**
   * @param {float} yourNumber - The number of decimal places you want to use
   */
  set decimalPlaces(yourNumber) {
    this._config.decimalPlaces = yourNumber;
  }

  get decimalPlaces() {
    return this._config.decimalPlaces;
  }

  /**
   * @param {string} yourUnit - The unit you want
   */
  set unit(yourUnit) {
    this._config.unit = yourUnit;
  }

  get unit() {
    return this._config.unit;
  }

  /**
   * @param {bool} yourChoice - Do we want thousands separator?
   */
  set useGroupSeparator(yourChoice) {
    this._config.useGroupSeparator = yourChoice;
  }

  get useGroupSeparator() {
    return this._config.useGroupSeparator;
  }

  /**
   * @param {bool} yourChoice - Do we want thousands separator on decimals?
   */
  set useGroupSeparatorOnDecimals(yourChoice) {
    this._config.useGroupSeparatorOnDecimals = yourChoice;
  }

  get useGroupSeparatorOnDecimals() {
    return this._config.useGroupSeparatorOnDecimals;
  }

  /**
   * This two methods are used to set up the decimal separator
   */
  preferDot() {
    this._config.decimalMarker = ".";
  }
  preferComma() {
    this._config.decimalMarker = ",";
  }

  /**
   * @param {Object} yourObject - The config object to be set
   */
  loadConfig(yourObject) {
    var temp = Object.assign({}, this._config, yourObject);
    this._config = temp;
  }

  toString() {
    var retStr = "";

    var integral = getIntegralPart(this.number);
    if (this.useGroupSeparator) integral = addGroupSeparator(integral, " ");

    retStr = integral;

    if (this.decimalPlaces) {
      var decimal = getDecimalPart(this.number, this.decimalPlaces);
      if (this.useGroupSeparatorOnDecimals)
        decimal = addGroupSeparator(decimal, " ", true);
      retStr = retStr + this.decimalMarker + decimal;
    }

    if (this.unit.length > 0) retStr = retStr + " " + this.unit;

    return retStr;
  }
}

module.exports = { Quantity };

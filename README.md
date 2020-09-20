# QUANTITY JS #

Quantity is meant to provide an object model to the International Vocabulary of Metrology guidelines and the International System of Units. Yet, I am not part or related to the Joint Committee for Guides in Metrology, neither to the Bureau International des Poids et Mesures. This software is provided in the hope that it is useful.

## Interface ##

The following guidelines are very important for the code and the interface:

  * A quantity is a "property of a phenomenon, body, or substance, where the property has a magnitude that can be expressed as a number and a reference" <https://jcgm.bipm.org/vim/en/1.1.html>.

  * Note: "A reference can be a measurement unit, a measurement procedure, a reference material, or a combination of such." <https://jcgm.bipm.org/vim/en/1.1.html>.

  * The symbol used to separate the integral part of a number from its decimal part is called the
decimal marker. Following a decision by the 22nd CGPM (2003, Resolution 10), the
decimal marker “shall be either the point on the line or the comma on the line.” The
decimal marker chosen should be that which is customary in the language and context
concerned. If the number is between +1 and −1, then the decimal marker is always preceded by a zero. Following the 9th CGPM (1948, Resolution 7) and the 22nd CGPM (2003, Resolution 10),
for numbers with many digits the digits may be divided into groups of three by a space, in
order to facilitate reading. Neither dots nor commas are inserted in the spaces between
groups of three. However, when there are only four digits before or after the decimal
marker, it is customary not to use a space to isolate a single digit. The practice of grouping
digits in this way is a matter of choice; it is not always followed in certain specialized
applications such as engineering drawings, financial statements and scripts to be read by a
computer. For numbers in a table, the format used should not vary within one column. <https://www.bipm.org/utils/common/pdf/si-brochure/SI-Brochure-9-EN.pdf>.


| Name                        | Type          | Purpose                                          |
|:----------------------------|:--------------|:-------------------------------------------------|
| number                      | setter/getter | get/set the inner number                         |
| unit                        | setter/getter | get/set reference                                |
| decimalMarker               | getter        | get the current decimal marker                   |
| preferDot / preferComma     | method        | set the current decimal marker to dot/comma      |
| useGroupSeparator           | method        | flags usage of group separator (strictly space)  |
| useGroupSeparatorOnDecimals | method        | same but on the right side of the decimal marker |


## Learn by example ##

The following code will declare "12 156.25 kg", and then re print to 1 decimal place using commas.

``` JavaScript
// this is to import the constructor
const Quantity = require("./Quantity").Quantity;

var example = new Quantity();

example.number = 12156.25;
example.unit = "kg";
example.decimalPlaces = 1;
example.preferComma();

// you should see 12 156,2 kg
console.log(example.toString());
```


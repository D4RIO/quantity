// this is to import the constructor
const Quantity = require("./Quantity").Quantity;

var example = new Quantity();

example.number = 12156.25;
example.unit = "kg";
example.decimalPlaces = 1;
example.preferComma();

// you should see 12 156,2 kg
console.log(example.toString());

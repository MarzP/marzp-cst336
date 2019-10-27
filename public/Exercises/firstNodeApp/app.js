var date = new Date();
console.log("The current day is " + date.getDate());

var faker = require('faker');
var randomName = faker.name.findName();
console.log(randomName);
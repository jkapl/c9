var faker = require('faker');

console.log("Welcome to My Shop!")

for (var i=0; i<10; i++) {
    console.log(faker.fake("{{commerce.productName}}" + " - $" + "{{commerce.price}}"));
}
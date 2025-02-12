"use strict"
// Create Object
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};

// Freeze Object
Object.freeze(person)

// Test Error
let text;
try {
  person.age = 51;
  text = Object.values(person);
}
catch (err) {
  text = err;
  console.log(text);
}

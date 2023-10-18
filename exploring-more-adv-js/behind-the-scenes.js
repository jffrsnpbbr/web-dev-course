const hobbies = ['Sports', 'Cooking']; // a pointer to the array is stored in memory
const age = 32; // the value itself is stored

hobbies.push('Reading'); // the address of te array doesn't change

// hobbies = ['Coding', 'Sleeping']; // now allowed! new address is stored in memory
console.log(hobbies);

// Primitive values: numbers, strings, booleans & more (undefined)
// Reference values: Objects, Arrays

const person = { age: 32 };
person.name = 'Jeff';

function getAdultYears(p) {
  p.age -= 18;
  return p.age;
  // return p.age - 18;
}


// const adultYears = getAdultYears(person);
const adultYears = getAdultYears({ ...person });
console.log(adultYears);
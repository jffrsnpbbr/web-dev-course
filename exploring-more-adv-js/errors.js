const fs = require('fs');
const path = require('path');

function readFile() {
  try {
    const fileData = fs.readFileSync('data.json');
    console.log('trying...')
    
  } catch (error) {
    console.log(error.message);
  }
  console.log('Hi there!');
}

readFile();

// function doSomething() {
//   // do something ...
//   throw { message: 'Something went wrong! };
// }
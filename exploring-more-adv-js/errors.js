const fs = require('fs');
const path = require('path');

function readFile() {
  try {
    const fileData = fs.readFileSync('data.json');
    console.log('trying...')
  } catch {
    console.log('An error occured!');
  }
  console.log('Hi there!');
}

readFile();
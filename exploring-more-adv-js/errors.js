const fs = require('fs');

function readFile() {
  let fileDdata;
  try {
    // const fileData = fs.readFileSync('data.json');
    fileData = fs.readFileSync('data.json');
    console.log('trying...')
    
  } catch (error) {
    console.log(error.message);
  }
  console.log(fileDdata);
  console.log('Hi there!');
}

readFile();

module.exports = {
  readFile
}
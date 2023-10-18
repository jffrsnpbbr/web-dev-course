// const fs = require('fs');
const fs = require('fs/promises');

function readFile() {
  let fileData;

  // fs.readFile('data.txt', function(error, fileData) {
  //   console.log('File parsing done!');
  //   console.log(fileData.toString());
  //   //  start another async task that sends the data to a database
  // });

  fs.readFile('data.txt')
    .then(function(dataFile) {
      console.log(dataFile.toString());
      // return anotherAsyncOperation;
    })
    .then(function() {
    });

  console.log('Hi there!');
}

readFile();
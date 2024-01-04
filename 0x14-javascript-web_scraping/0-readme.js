#!/usr/bin/node

const fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function (error, content) {
  if (error) {
    console.error(`Error reading the file: ${error.message}`);
  } else {
    console.log(content);
  }
});

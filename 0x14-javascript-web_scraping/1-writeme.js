#!/usr/bin/node 

const fs = require('fs');

fs.writeFile(process.argv[2], process.argv[3], error => {
    if (error) {
        console.error("Error writing to the file:", error);
    } else {
        console.log("File written successfully.");
    }
});


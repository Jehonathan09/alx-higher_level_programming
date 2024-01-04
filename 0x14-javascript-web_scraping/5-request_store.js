#!/usr/bin/node

const fs = require('fs');
const request = require('request');

// Check if both URL and file path are provided
if (process.argv.length < 4) {
    console.error('Usage: node script.js <url> <file-path>');
    process.exit(1); // Exit with an error code
}

const url = process.argv[2];
const filePath = process.argv[3];

// Make a GET request to the specified URL
request.get(url, { encoding: 'utf-8' }, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
    } else if (response.statusCode !== 200) {
        console.error('Unexpected status code:', response.statusCode);
    } else {
        // Write the body response to the specified file with UTF-8 encoding
        fs.writeFile(filePath, body, { encoding: 'utf-8' }, writeError => {
            if (writeError) {
                console.error('Error writing to the file:', writeError);
            } else {
                console.log('Body response saved to:', filePath);
            }
        });
    }
});


#!/usr/bin/node

const request = require('request');

// Check if a URL is provided
if (process.argv.length < 3) {
    console.error('Usage: node script.js <url>');
    process.exit(1); // Exit with an error code
}

const url = process.argv[2];

// Make a GET request
request.get(url, (error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Code:', response.statusCode);
    }
});


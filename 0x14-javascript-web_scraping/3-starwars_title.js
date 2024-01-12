#!/usr/bin/node

const request = require('request');

// Check if the movie ID is provided
if (process.argv.length < 3) {
    console.error('Usage: node script.js <movie-id>');
    process.exit(1); // Exit with an error code
}

const movieId = process.argv[2];
const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

// Make a GET request to the Star Wars API with the specified movie ID
request.get(apiUrl, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
    } else if (response.statusCode !== 200) {
        console.error('Unexpected status code:', response.statusCode);
    } else {
        const movie = JSON.parse(body);

        // Print the title of the movie
        console.log('Title:', movie.title);
    }
});


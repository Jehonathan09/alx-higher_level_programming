#!/usr/bin/node

const request = require('request');

// Check if the API URL is provided
if (process.argv.length < 3) {
    console.error('Usage: node script.js <api-url>');
    process.exit(1); // Exit with an error code
}

const apiUrl = process.argv[2];

// Make a GET request to the Star Wars API
request.get(apiUrl, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
    } else if (response.statusCode !== 200) {
        console.error('Unexpected status code:', response.statusCode);
    } else {
        const films = JSON.parse(body).results;

        // Filter films where "Wedge Antilles" (character ID 18) is present
        const filmsWithWedge = films.filter(film =>
            film.characters.includes('https://swapi-api.alx-tools.com/api/people/18/')
        );

        console.log('Number of movies with Wedge Antilles:', filmsWithWedge.length);
    }
});


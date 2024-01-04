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
request.get(apiUrl, { json: true }, (error, response, movie) => {
    if (error) {
        console.error('Error:', error);
    } else if (response.statusCode !== 200) {
        console.error('Unexpected status code:', response.statusCode);
    } else {
        // Print each character name line by line
        console.log(`Characters in ${movie.title} (${movie.episode_id}):`);
        movie.characters.forEach(characterUrl => {
            request.get(characterUrl, { json: true }, (charError, charResponse, character) => {
                if (charError) {
                    console.error('Error fetching character:', charError);
                } else if (charResponse.statusCode !== 200) {
                    console.error('Unexpected status code for character:', charResponse.statusCode);
                } else {
                    console.log(`- ${character.name}`);
                }
            });
        });
    }
});


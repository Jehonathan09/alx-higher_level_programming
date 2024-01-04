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
        // Print each character name in the same order as the list in the /films/ response
        console.log(`Characters in ${movie.title} (${movie.episode_id}):`);
        const charactersUrls = movie.characters;

        // Use Promise.all to handle asynchronous requests for character details
        Promise.all(charactersUrls.map(characterUrl => fetchCharacterName(characterUrl)))
            .then(characterNames => {
                characterNames.forEach(name => console.log(`- ${name}`));
            })
            .catch(err => console.error('Error fetching characters:', err));
    }
});

// Function to fetch character name from a character URL
function fetchCharacterName(characterUrl) {
    return new Promise((resolve, reject) => {
        request.get(characterUrl, { json: true }, (charError, charResponse, character) => {
            if (charError) {
                reject(charError);
            } else if (charResponse.statusCode !== 200) {
                reject(`Unexpected status code for character: ${charResponse.statusCode}`);
            } else {
                resolve(character.name);
            }
        });
    });
}


#!/usr/bin/node

const request = require('request');

// Check if the API URL is provided
if (process.argv.length < 3) {
    console.error('Usage: node script.js <api-url>');
    process.exit(1); // Exit with an error code
}

const apiUrl = process.argv[2];

// Make a GET request to the specified API URL
request.get(apiUrl, { json: true }, (error, response, todos) => {
    if (error) {
        console.error('Error:', error);
    } else if (response.statusCode !== 200) {
        console.error('Unexpected status code:', response.statusCode);
    } else {
        // Filter and count completed tasks for each user
        const userTasks = {};
        todos.forEach(todo => {
            if (todo.completed) {
                if (userTasks[todo.userId]) {
                    userTasks[todo.userId]++;
                } else {
                    userTasks[todo.userId] = 1;
                }
            }
        });

        // Print users with completed tasks
        console.log('Users with completed tasks:');
        Object.entries(userTasks).forEach(([userId, completedTasks]) => {
            console.log(`User ${userId}: ${completedTasks} completed tasks`);
        });
    }
});


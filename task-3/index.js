'use strict';

// Require express
const express = require('express');
// Create app
const app = express();
// Add middlewares
app.use(express.json());

// Define response codes constancts
const RESPONSE_CODES = {
    NOT_FOUND: 404,
    CREATED: 201,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    SUCCESS: 200
}

// Define candidates array
let candidates = [];

// Create a candidate
app.post('/candidates', function (req, res) {

    // Get expected parameters
    let { id, name, skills } = req.body;

    // Validate request
    if (!id // id is sent
        || typeof id !== "string" // and it's a string
        || !name // name is sent
        || typeof name !== "string" // and it's a string
        || !Array.isArray(skills) // skills is an array
        || skills.length <= 0  // and it's not empty
        || !skills.every(skill => typeof skill === "string")) // and all skills are string

        // Send bad request response
        return res.sendStatus(RESPONSE_CODES.BAD_REQUEST);

    // Filter candidates array to get any candidate with same request id
    let candidateExists = candidates.some(candidate => candidate.id === id);

    // Check if found any candidates with same id
    if (candidateExists)

        // Return conflict response
        return res.sendStatus(RESPONSE_CODES.CONFLICT);

    // Add candidate to candidates array
    candidates.push({
        id,
        name,
        skills
    })

    // Return created response
    res.sendStatus(RESPONSE_CODES.CREATED);
});

// Search candidates
app.get('/candidates/search', function (req, res) {

    // Get expected parameters
    const { skills } = req.query;

    // Split skills to get an array
    const requestSkills = skills ? skills.split(",") : [];

    // Define requestScore
    const requestScore = requestSkills.length;

    // Validate request
    if (requestScore <= 0)

        // Send bad request response
        return res.sendStatus(RESPONSE_CODES.BAD_REQUEST);

    // Check if we have any candidates in the candidates array
    if (candidates.length <= 0) return res.sendStatus(RESPONSE_CODES.NOT_FOUND);

    // Define searchCandidates as a clone of the in-memory candidates array
    const searchCandidates = [...candidates];

    // Define bestCandidate and bestScore
    let bestCandidate;
    let bestScore = 0;

    // Loop through candidates
    for (let candidate of searchCandidates) {

        // Get skills that this candidate possess of the requested skills
        let candidateMatchingSkills = requestSkills.filter(skill => {

            // Requested skill to exist in candidate skills
            return candidate.skills.indexOf(skill) >= 0;
        })

        // Define candidateScore
        const candidateScore = candidateMatchingSkills.length;

        // Check if this candidate has all the skills requested
        if (candidateScore === requestScore) {

            // Set bestCandidate to current candidate and break the loop ..
            // .. no need to loop through the entire list if we can break now.
            bestCandidate = candidate;
            break;
        }

        // Check if this candidate has any of the requested skills
        if (candidateScore > bestScore) {

            // Sent bestCandidate to current index
            bestCandidate = candidate;

            // Set bestScore to the length of candidateMatchingSkills
            bestScore = candidateScore;
        }
    }

    // Check if bestCandidate wasn't found
    if (!bestCandidate) return res.sendStatus(RESPONSE_CODES.NOT_FOUND);

    // Set response content type
    res.setHeader("content-type", "application/json");

    // Return found best candidate
    res.status(RESPONSE_CODES.SUCCESS).send(bestCandidate);
});

// Run server
app.listen(process.env.HTTP_PORT || 3000, () => {
    console.log("Server running on port 3000!")
});

/*
    Write a function, that, given a string S consisting of N lowercase English letters, returns the length of the longest substring in which every letter occurs an even number of times.
    A substring is defined as a contiguous segment of a string. If no such substring exists, return 0.

    bdaaadadb   => 6
    abacb       => 0
    zthtzh      => 6
*/

// Define some constants
const MAX_STRING_LENGTH = 100000;
const ALLOWED_VALUES = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Helper function to validate string
function validate(S) {

    // Check that A is a string
    if (typeof S === "string") {

        // Check length of S to be <= the maximum limit CONST
        if (S.length > 0 &&
            S.length <= MAX_STRING_LENGTH) {

            // Filter S to only get allowed characters
            let filteredString = [...S].filter((value) => {

                return typeof value === "string" // It's a string
                    && ALLOWED_VALUES.indexOf(value) !== -1 // and it's in the allowed values
            });

            // Check length again to make sure we have any values that matches the criteria
            if (filteredString.length > 0) {

                // Return filteredString
                return filteredString.join("");
            }
        }
    }

    return [];
}

function solution(S) {

    // Define longestSubstringLength
    let longestSubstringLength = 0;

    // Validate input
    let validatedInput = validate(S);

    // Check validation result
    if (validatedInput.length > 0) {

        // Loop through characters to define the starting point of the substring
        for (let i = 0; i < validatedInput.length; i++) {

            // Another loop to be used to define the length of the substring
            // It starts with either the longets substring ( to avoid checking shorter substring ) ..
            // .. or 2, and it always jumps 2 elements to avoid checking even length substrings
            for (let j = longestSubstringLength || 2; j <= validatedInput.length; j += 2) {

                // Get substring
                let subString = validatedInput.substr(i, j);

                // Define currentLength
                let currentLength = subString.length;

                // Check if currentLength is <= longestSubstringLength or ..
                // .. currentLength is not an even value to skip the iteration
                if (currentLength <= longestSubstringLength
                    || currentLength % 2 !== 0) continue;

                // Define lettersCount object to hold the number of occurence of each character in the substring
                let lettersCount = {};

                // Loop through subString to check the occurance of each character
                for (let c = 0; c < currentLength; c++) {

                    // Definecontinue current
                    let current = subString[c];

                    // Check how many times this char exists in the string
                    if (lettersCount[current] === undefined) lettersCount[current] = 0;

                    // Increment letter count
                    lettersCount[current]++;
                }

                // Filter values of lettersCount to make sure they're all even
                let allEvenCounts = Object.values(lettersCount).every(letter => letter % 2 === 0);

                // Use current length of subString if it's bigger than latest longestSubstringLength
                if (allEvenCounts
                    && currentLength > longestSubstringLength)
                    longestSubstringLength = currentLength;
            }
        }
    }

    // If nothing was found, return 0 to represent nothing to change
    return longestSubstringLength;
}

module.exports = solution;
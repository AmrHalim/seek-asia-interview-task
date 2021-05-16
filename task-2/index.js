/*
    There are N coins, each showing either heads or tails. We would like all the coins to form a sequence of alternating heads and tails. What is the minimum number of coins that must be reversed to achieve this?

    Write a function that, given an array A consisting of N integers representing the coins, returns the minimum number of coins that must be reversed. Consecutive elements of array A represent consecutive coins and contain either a 0 (heads) or a 1 (tails).

    [0, 1, 2, 3, 4, 5]      => which indexes to change
    ---------------------------------------------------------------
    [1, 0, 1, 0, 1, 1]      => 1, changing 5 to be 0
    [1, 1, 0, 1, 1]         => 2, changing 0 to b 0 and 4 to be 0
    [0, 1, 0]               => 0, nothing to change
    [0, 1, 1, 0]            => 2, changing 0 to be 1 and 2 to be 0
*/

// Define some constants
const MAX_ARRAY_LENGTH = 100;
const ALLOWED_VALUES = [0, 1];

// Helper function to validate array
function validate(A) {

    // Check that A is an array
    if (Array.isArray(A)) {

        // Check length of A to be <= the maximum limit CONST
        if (A.length > 0 &&
            A.length <= MAX_ARRAY_LENGTH) {

            // Filter A to only get positive integers ..
            // .. that are within the range
            let filteredArray = A.filter((value) => {

                return Number(value) !== "NaN" // It's a number
                    && ALLOWED_VALUES.indexOf(value) !== -1 // and it's in the allowed values
            });

            // Check length again to make sure we have any values that matches the criteria
            if (filteredArray.length > 0) {

                // Return filteredArray
                return filteredArray;
            }
        }
    }

    return [];
}

// Helper function to check an array
function check(_array, _opts = { _startWith: 0 }) {

    // Define numberOfTries
    let numberOfTries = 0;

    // Define array to check
    let reversedArray = [..._array];

    // Loop through array
    for (let i = 0; i < reversedArray.length; i++) {

        // Define current
        let current = reversedArray[i];

        // Check if 1st element
        if (i === 0) {

            // Check if it's not the same as _starWith
            if (current !== _opts._startWith) {

                // Increment numberOfTries
                numberOfTries++;

                // Swap values
                reversedArray[i] = _opts._startWith;
            }
        } else {

            // Define previous
            let previous = reversedArray[i - 1];

            // Not first element
            // Check the value against the previous value to swap if needed
            if (previous === current) {

                // Increment numberOfTries
                numberOfTries++;

                // Swap values
                reversedArray[i] = previous === 0 ? 1 : 0;
            }
        }
    }

    // If nothing was found, return 0 to represent nothing to change
    return numberOfTries || 0;
}

function solution(A) {

    // Validate input
    let validatedInput = validate(A);

    // Check validation result
    if (validatedInput.length > 0) {

        // Check number of tries assuming we start with 0
        let startWithHeads = check(validatedInput, { _startWith: 0 });

        // Check number of tries assuming we start with 1
        let startWithTails = check(validatedInput, { _startWith: 1 });

        // Return the minimum
        return Math.min(...[startWithHeads, startWithTails]);
    }

    // If nothing was found, return 0 to represent nothing to change
    return 0;
}

module.exports = solution;
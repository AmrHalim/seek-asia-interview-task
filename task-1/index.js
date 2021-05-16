/*
    Write a function that given an array A as N integers,
    returns the maximum among all one-digit integers
    For example, givn array A as follows:
        [-6, -91, 1011, -100, 84, -22, 0, 1, 473]
    the function should return 1
*/

// Define some constants
const MAX_ARRAY_LENGTH = 1000;
const MAX_ONE_DIGIT_INTEGER = 9;

function solution(A) {

    // Check that A is an array
    if (Array.isArray(A)) {

        // Check length of A to be <= the maximum limit CONST
        if (A.length > 0 &&
            A.length <= MAX_ARRAY_LENGTH) {

            // Filter A to only get positive integers ..
            // .. that are within the range
            let filteredArray = A.filter((value) => {

                return Number(value) !== "NaN" // It's a number
                    && value > 0 // and it's positive
                    && value <= MAX_ONE_DIGIT_INTEGER; // and it doesn't exceed the limit
            });

            // Check length again to make sure we have any positive integers .. 
            // .. and that it doesn't exceed the limit
            if (filteredArray.length > 0) {

                // Sort filteredArray
                filteredArray.sort();

                // Retrun the latest value of the array
                return filteredArray.pop();
            }
        }
    }

    // If nothing was found, return 1
    return 1;
}

module.exports = solution;
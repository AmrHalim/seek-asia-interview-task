/*
    This is a demo task.

    Write a function:

    function solution(A);

    that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

    For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

    Given A = [1, 2, 3], the function should return 4.

    Given A = [−1, −3], the function should return 1.

    Write an efficient algorithm for the following assumptions:

    N is an integer within the range [1..100,000];
    each element of array A is an integer within the range [−1,000,000..1,000,000].
*/

// Define some constants
const MAX_ARRAY_LENGTH = 100000;
const MAX_POSITIVE_VALUE = 1000000;

function solution(A) {

    // Check that A is an array
    if (Array.isArray(A)) {

        // Check length of A to be <= the maximum limit CONST
        if (A.length > 0) {

            // Filter A to only get positive integers ..
            // .. that are within the range
            let filteredArray = A.filter((value) => {

                return Number(value) !== "NaN" // It's a number
                    && value > 0 // and it's positive
                    && value <= MAX_POSITIVE_VALUE; // and it doesn't exceed the limit
            });

            // Check length again to make sure we have any positive integers .. 
            // .. and that it doesn't exceed the limit
            if (filteredArray.length > 0 &&
                filteredArray.length <= MAX_ARRAY_LENGTH) {

                // Sort filteredArray
                filteredArray.sort();

                // Loop through array
                for (let i = 0; i < filteredArray.length; i++) {

                    // Define current
                    let current = filteredArray[i]

                    // Check if current value 
                    if (current <= i + 1) {

                        // Check if we reached the end of the array
                        if (i === filteredArray.length - 1) {

                            // Return the latest value of the array + 1
                            return current + 1;
                        }

                        // Define next
                        let next = filteredArray[i + 1];

                        // Check if next is distance between current and next ..
                        // .. is > 1
                        if (next - current > 1) {

                            // Return current + 1
                            return current + 1;
                        }
                    }
                }
            }
        }
    }

    // If nothing was found, return 1
    return 1;
}

module.exports = solution;


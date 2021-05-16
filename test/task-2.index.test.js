const chai = require("chai");
const should = chai.should();

const testData = [
    {
        value: [1, 0, 1, 0, 1, 1],
        expected: 1
    },
    {
        value: [1, 1, 0, 1, 1],
        expected: 2
    },
    {
        value: [0, 1, 0],
        expected: 0
    },
    {
        value: [0, 1, 1, 0],
        expected: 2
    },

    {
        value: [1, 1, 1, 1],
        expected: 2
    },
    {
        value: [1, 0, 0, 0],
        expected: 1
    },
    {
        value: [1, 1, 1, 1, 1, 0, 0, 0, 0],
        expected: 4
    }
]

const solution = require("../task-2/index");

describe("Task 2 testing", function () {

    context("Minimum number of coins to be reversed to get a sequence of alternating heads and tails.", function () {

        for (let test of testData) {

            it(`Should return ${test.expected}`, function () {

                solution(test.value).should.equal(test.expected);
            })
        }
    })
})
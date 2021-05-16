const chai = require("chai");
const should = chai.should();

const testData = [
    {
        value: "bdaaadadb",
        expected: 6
    },
    {
        value: "abacb",
        expected: 0
    },
    {
        value: "zthtzh",
        expected: 6
    }
]

const solution = require("../task-4/index");

describe("Task 4 testing", function () {

    context("Longest substring with every letter occurs an even number of times in a string.", function () {

        for (let test of testData) {

            it(`Should return ${test.expected}`, function () {

                solution(test.value).should.equal(test.expected);
            })
        }
    })
})
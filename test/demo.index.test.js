const chai = require("chai");
const should = chai.should();

const solution = require("../demo/index");

describe("Demo testing", function () {
    context("First positive integer that doesn't exist in an array of integers.", function () {

        it("Should return 1", function () {
            const values = [-1, -3];
            solution(values).should.equal(1);
        })
    })
})
import assert from "assert"
import requestBuilder from "supertest"
import * as Database from "../src/utilities/Database"

// const assert = require("assert")
// const requestBuilder = require("supertest")
// const Database = require("../src/utilities/Database")

const userToInsert1 = {
    email: "pedro@perez.com",
    name: "Pedro Perez",
    balance: 450000
}
const userToInsert2 = {
    email: "pedro@perez.com",
    name: "Pedro Perez",
    balance: 250000
}
const userToInsert3 = {
    email: "lucas@campo.com",
    name: "Lucas Campo",
    balance: 120000
}

const transferData = {
    "senderId": "lucas@campo.com",
    "receiverId": "pedro@perez.com",
    "amount": 200000
}

const request = requestBuilder("http://localhost:3000/dev")

before(async () => {
    await Database.deleteUser(userToInsert1.email);
    await Database.deleteUser(userToInsert2.email);
    await Database.deleteUser(userToInsert3.email);
})

describe("Users", () => {
    describe("User creation", () => {
        it("Should acknowledge user creation", (done) => {
            request
                .post("/users")
                .send(userToInsert1)
                .expect(201)
                .expect({message: "User created"})
                .end(done)
        })
        it("Should reject user if given email already created", (done) => {
            request
                .post("/users")
                .send(userToInsert2)
                .expect(406)
                .expect({message:"Email address already registered"})
                .end(done)
        })
        it("Should acknowledge user creation", (done) => {
            request
                .post("/users")
                .send(userToInsert3)
                .expect(201)
                .expect({message: "User created"})
                .end(done)
        })
    })
    describe("Balance updating", () => {
        it("Should reject money transfer if there aren't enough funds", (done) => {
            request
                .put("/users/transfer")
                .send(transferData)
                .expect(406)
                .expect({message:"Insufficient Funds"})
                .end(done)
        })
        it("Should update user balance", (done) => {
            request
                .put("/users?userId=lucas@campo.com&amount=100000")
                .expect(202)
                .expect({
                    message:"User balance updated",
                    data: {
                        email: "lucas@campo.com",
                        name: "Lucas Campo",
                        balance: "220000"
                    }
                })
                .end(done)
        })
        it("Should update balance of two users if transfer is approved", (done) => {
            request
                .put("/users/transfer")
                .send(transferData)
                .expect(202)
                .expect({
                    message: "Money Transfer accepted",
                    data: [{
                        email: "lucas@campo.com",
                        name: "Lucas Campo",
                        balance: "20000"
                    }, {
                        email: "pedro@perez.com",
                        name: "Pedro Perez",
                        balance: "650000"
                    }]
                })
                .end(done)
        })
    })})

const express = require('express')
const supertest = require('supertest')

function testServer(route) {
    const app = express.Router()
    route(app)
    return supertest(app)
}
module.exports = testServer;
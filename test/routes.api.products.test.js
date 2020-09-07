const assert = require('assert')
const proxyquire = require('proxyquire')

const {
    productsMock,
    ProductsServiceMock
} = require("../utils/mocks/products")

const testServer = require("../utils/testServer")

describe("routes - api - products", function () {
    const route = proxyquire("../routes/api/products", {
        "../../services/products": ProductsServiceMock
    })
    const request = testServer(route)

    describe("GET /products", function() {
        it("should respond with status 200", function (done) {
            request.get("/api/products").expect(200, done)
        })
    })
})
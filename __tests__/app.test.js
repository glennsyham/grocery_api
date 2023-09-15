const request = require("supertest");
const baseURL = "http://localhost:3000";

//https://github.com/Sam-Meech-Ward/express_jest_and_mocks/blob/express/app.test.js

describe("GET /grocery", () => {
    describe("list grocery", () => {

        test("should respond with a 200 status code", async () => {
            const response = await request(baseURL).get("/grocery");
            expect(response.statusCode).toBe(200);
        });

        test("should specify json in the content type header", async () => {
            const response = await request(baseURL).get("/grocery").send();
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
    });

});

describe("POST /grocery", () => {

    test("should respond with a 200 status code", async () => {
        const response = await request(baseURL).post("/grocery").send(
            { "name": "test", "quantity": 10, "price": 5.0, "purchased": false }
        );
        expect(response.statusCode).toBe(201);
    });

    test("should specify json in the content type header", async () => {
        const response = await request(baseURL).post("/grocery").send(
            { "name": "test", "quantity": 10, "price": 5.0, "purchased": false }
        );
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });

});

describe("PUT /grocery", () => {

    test("should respond with a 200 status code", async () => {
        const response = await request(baseURL).put("/grocery").send(
            { "id": 1, "name": "test", "quantity": 10, "price": 5.0, "purchased": false }
        );
        expect(response.statusCode).toBe(200);
    });

    test("should specify json in the content type header", async () => {
        const response = await request(baseURL).put("/grocery").send(
            { "id": 1, "name": "test", "quantity": 10, "price": 5.0, "purchased": false }
        );
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
});


describe("DELETE /grocery", () => {

    test("should respond with a 201 status code", async () => {
        const response = await request(baseURL).delete("/grocery?id=1").send();
        expect(response.statusCode).toBe(201);
    });

    test("should specify json in the content type header", async () => {
        const response = await request(baseURL).delete("/grocery?id=1").send();
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
});
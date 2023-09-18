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
const add_item = { "name": "test", "quantity": parseInt(10), "price": parseFloat(5.0), "purchased": false };

describe("POST /grocery", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(baseURL).post("/grocery").send(
            add_item
        );

        expect(response.statusCode).toBe(201);
        expect(response.body['grocery'].name).toBe(add_item.name);
        expect(response.body['grocery'].quantity).toBe(add_item.quantity);
        expect(response.body['grocery'].price).toBe(add_item.price);
        expect(response.body['grocery'].purchased).toBe(add_item.purchased);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });


});

describe("PUT /grocery", () => {
    let update_item = { "id": 3, "name": "testchange", "quantity": parseInt(10), "price": parseFloat(5.0), "purchased": false };
    test("should respond with a 200 status code", async () => {
        const response = await request(baseURL).put("/grocery").send(
            update_item
        );
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        expect(response.body['grocery'].name).toBe(update_item.name);
        expect(response.body['grocery'].quantity).toBe(update_item.quantity);
        expect(response.body['grocery'].price).toBe(update_item.price);
        expect(response.body['grocery'].purchased).toBe(update_item.purchased);
        expect(response.statusCode).toBe(200);
    });


});


describe("DELETE /grocery", () => {

    test("should respond with a 201 status code", async () => {
        const response = await request(baseURL).delete("/grocery?id=3").send();
        expect(response.statusCode).toBe(201);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));

    });


});
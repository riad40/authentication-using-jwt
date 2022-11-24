const request = require('supertest')
const app = require('../app')

describe("POST /api/auth/register", () => {
    
    let body = {
        username: "",
        email: "",
        password: "",
        role: ""
    }

    describe("given all registration credintials", () => {
        
        test("success", async () => {
            body = {
                username: "trtretre",
                email: "hghgjhgkkkk@gmail.com",
                password: "kgiygluglulg",
                role: ""
            }
            const response = await request(app).post("/api/auth/register").send(body)
            expect(response.statusCode).toBe(200)
        })

        test("error", async () => {
            body = {
                username: "trtretre",
                email: "hghgjhg@gmail.com",
                password: "kgiygluglulg",
                role: ""
            }
            const response = await request(app).post("/api/auth/register").send(body)
            expect(response.statusCode).toBe(400)
        })
    })

    describe("all or some of registration credintials is null", () => {
        
        test("error", async () => {
            body = {
                username: "",
                email: "",
                password: "",
                role: ""
            }
            const response = await request(app).post("/api/auth/register").send(body)
            expect(response.statusCode).toBe(400)
        })

    })

})
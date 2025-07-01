const request = require("supertest");
const app = require("../app"); // Your Express app

describe("User API", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "John Doe", email: "john@example.com" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });
});

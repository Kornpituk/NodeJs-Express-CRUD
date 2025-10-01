import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import app from "/src/index.js"; // ปรับ path ให้ตรงกับโครงสร้าง project

jest.setTimeout(10000);

describe("Users API Routes", () => {
  let server;
  let testUser;

  beforeAll((done) => {
    server = app.listen(0, done); // เริ่ม server ชั่วคราวบน port random
  });

  afterAll((done) => {
    server.close(done); // ปิด server หลัง test
  });

  it("POST /api/users -> create a new user", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "Route Test", email: "route@gmail.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Route Test");
    testUser = res.body; // เก็บ id สำหรับ test ต่อ
  });

  it("GET /api/users -> get all users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/users/:id -> get user by id", async () => {
    const res = await request(server).get(`/api/users/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", testUser.id);
  });

  it("PUT /api/users/:id -> update user", async () => {
    const res = await request(server)
      .put(`/api/users/${testUser.id}`)
      .send({ name: "Updated Route", email: "updated@route.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Route");
  });

  it("DELETE /api/users/:id -> delete user", async () => {
    const res = await request(server).delete(`/api/users/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(testUser.id);
  });
});

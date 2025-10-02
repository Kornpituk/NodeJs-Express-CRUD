import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import app from "/src/app.js";
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

  it("POST /api/user -> create a new user", async () => {
    const res = await request(server)
      .post("/api/user")
      .send({ name: "Route Test", email: "route@gmail.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.name).toBe("Route Test");
    testUser = res.body.data; // เก็บ user object ไว้ใช้ต่อ
  });

  it("GET /api/users -> get all users", async () => {
    const res = await request(server).get("/api/users");
    console.log(res.body); // 👈 ดูว่าคืนอะไรมาจริงๆ
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /api/users/:id -> get user by id", async () => {
    const res = await request(server).get(`/api/user/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("id", testUser.id); // หรือใช้ testUser.id ถ้ามี
  });

  it("PUT /api/user/:id -> update user", async () => {
    const res = await request(server)
      .put(`/api/user/${testUser.id}`)
      .send({ name: "Updated Route", email: "updated@route.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Updated Route");
  });

  it("DELETE /api/user/:id -> delete user", async () => {
    const res = await request(server).delete(`/api/user/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(testUser.id);
  });
});

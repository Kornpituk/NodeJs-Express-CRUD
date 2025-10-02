import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import pool from "../../config/db.js";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUsersService,
} from "../userModel.js";

jest.setTimeout(10000);

describe("User Service", () => {
  let testUser;

  beforeAll(async () => {
    testUser = await createUserService("Test User", "test@gmail.com");
  });

  afterAll(async () => {
    await deleteUsersService(testUser.id);
    await pool.end();
  });

  it("should get all users", async () => {
    const users = await getAllUsersService();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it("should get user by id", async () => {
    const user = await getUserByIdService(testUser.id);
    expect(user).toHaveProperty("id", testUser.id);
    expect(user).toHaveProperty("name", "Test User");
    expect(user).toHaveProperty("email", "test@gmail.com");
  });

  it("should update user", async () => {
    const updatedUser = await updateUserService(
      testUser.id,
      "Updated User",
      "updated@gmail.com"
    );
    expect(updatedUser.name).toBe("Updated User");
    expect(updatedUser.email).toBe("updated@gmail.com");
  });

  it("should delete user", async () => {
    const deletedUser = await deleteUsersService(testUser.id);
    expect(deletedUser.id).toBe(testUser.id);
    const check = await getUserByIdService(testUser.id);
    expect(check).toBeNull();
  });
});

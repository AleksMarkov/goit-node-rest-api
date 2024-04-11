import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";

import { findUser, clearUsers } from "../services/authServices.js";

const { DB_HOST, PORT = 4000 } = process.env;

describe("test api/users/login route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test api/users/login with valid data", async () => {
    const signupData = {
      email: "pole@cactus.com",
      password: "1234567890",
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(signupData);
    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(signupData.email);
    expect(typeof body.user.subscription).toBe("string");
    expect(typeof body.token).toBe("string");

    const user = await findUser({ email: signupData.email });
    expect(user.email).toBe(signupData.email);
  });
});

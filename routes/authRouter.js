import express from "express";

import authControllers from "../controllers/authControllers.js";

import { userSignupSchema, userSigninSchema } from "../schemas/usersSchemas.js";

import validateBody from "../decorators/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  validateBody(userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/users/login",
  validateBody(userSigninSchema),
  authControllers.signin
);

authRouter.get("/users/current", authenticate, authControllers.getCurrent);

authRouter.post("/users/logout", authenticate, authControllers.logout);

export default authRouter;

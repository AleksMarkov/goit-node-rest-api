import Joi from "joi";

import { emailRegepxp } from "../constants/user-constants.js";

export const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegepxp).required(),
  avatarURL: Joi.string(),
  subscription: Joi.string(),
  token: Joi.string(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegepxp).required(),
  password: Joi.string().min(6).required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Subscription is required.",
      "string.empty": "Subscription cannot be empty.",
      "any.only": "Subscription must be one of ['starter', 'pro', 'business'].",
    }),
});

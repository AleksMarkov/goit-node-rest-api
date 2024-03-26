import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Name is required.",
    "string.empty": "Name cannot be empty.",
    "string.base": "Name must be a string.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Phone is required.",
    "string.empty": "Phone cannot be empty.",
    "string.base": "Phone must be a string.",
  }),
});

export const updateContactSchema1 = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    "string.empty": "Name cannot be empty.",
    "string.base": "Name must be a string.",
  }),
  email: Joi.string().email().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
  }),
  phone: Joi.string().messages({
    "string.empty": "Phone cannot be empty.",
    "string.base": "Phone must be a string.",
  }),
});

export const updateContactSchema2 = updateContactSchema1
  .or("name", "email", "phone")
  .error(new Error("Body must have at least one field"));

export const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

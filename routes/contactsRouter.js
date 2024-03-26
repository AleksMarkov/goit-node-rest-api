import express from "express";

import contactsControllers from "../controllers/contactsControllers.js";

import {
  createContactSchema,
  updateContactSchema1,
  updateContactSchema2,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";

import validateBody from "../decorators/validateBody.js";

import isValidId from "../middlewares/isValidID";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getOneContact);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema1),
  validateBody(updateContactSchema2),
  contactsControllers.updateContact
);

contactsRouter.put(
  "/:id/favorite",
  isValidId,
  validateBody(updateStatusSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;

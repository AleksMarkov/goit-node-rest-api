import express from "express";

import contactsControllers from "../controllers/contactsControllers.js";

import {
  createContactSchema,
  updateContactSchema1,
  updateContactSchema2,
} from "../schemas/contactsSchemas.js";

import validateBody from "../decorators/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema1),
  validateBody(updateContactSchema2),
  contactsControllers.updateContact
);

export default contactsRouter;

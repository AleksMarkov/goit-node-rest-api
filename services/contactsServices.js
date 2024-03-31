import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, setting = {}) => {
  const projection = "-createdAt -updatedAt";
  return Contact.find(filter, projection, setting).populate("owner", "email");
};

export const countContacts = (filter) => Contact.countDocuments(filter);

export const addContact = ({ name, email, phone, favorite, owner }) =>
  Contact.create({ name, email, phone, favorite, owner });

export const getContactByFilter = (filter) => Contact.findOne(filter);

export const updateContactByFilter = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true, runValidators: true });

export const removeContactByFilter = (filter) =>
  Contact.findOneAndDelete(filter);

export const updateStatusContactByFilter = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true, runValidators: true });

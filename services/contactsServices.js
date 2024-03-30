import Contact from "../models/Contact.js";

export const listContacts = (filter = {}, setting = {}) =>
  Contact.find(filter, setting).populate("owner", "email");

export const countContacts = (filter) => Contact.countDocuments(filter);

export const addContact = ({ name, email, phone, favorite, owner }) =>
  Contact.create({ name, email, phone, favorite, owner });

export const getContactByFilter = (filter) => Contact.findById(filter);

export const updateContactByFilter = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true, runValidators: true });

export const removeContactByFilter = (filter) =>
  Contact.findOneAndDelete(filter);

export const updateStatusContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

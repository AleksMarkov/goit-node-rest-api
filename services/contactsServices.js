import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();

export const addContact = ({ name, email, phone, favorite }) =>
  Contact.create({ name, email, phone, favorite });

export const getContactById = (contactId) => {
  const data = Contact.findById(contactId);
  return data;
};

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const removeContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);

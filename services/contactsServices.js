import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();

export const addContact = ({ name, email, phone, favorite }) =>
  Contact.create({ name, email, phone, favorite });

export const getContactById = (id) => {
  const data = Contact.findById(id);
  return data;
};

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const updateStatusContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });

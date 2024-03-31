import {
  listContacts,
  getContactByFilter,
  addContact,
  removeContactByFilter,
  updateContactByFilter,
  updateStatusContactByFilter,
  countContacts,
} from "../services/contactsServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };

  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }
  const result = await listContacts(filter, { skip, limit });
  const total = await countContacts(filter);

  res.json({ result, total });
};

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await getContactByFilter({ owner, _id: id });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact({ ...req.body, owner });
  res.status(201).json(result);
};

export const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await removeContactByFilter({ owner, _id: id });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await updateContactByFilter({ owner, _id: id }, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await updateStatusContactByFilter(
    { owner, _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

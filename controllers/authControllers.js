import fs from "fs/promises";
import path from "path";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import { fileURLToPath } from "url";
import Jimp from "jimp";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const avatarsDir = path.join(dirname, "../", "public", "avatars");

const avatarPath = path.resolve("public", "avatars");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const url = gravatar.url(email);

  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
    avatarURL: url,
  });

  res.status(201).json({
    User: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const singin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password wrong");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await authServices.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const user = req.user;
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });
  res.status(204).json({});
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id, email } = req.user;
  const user = await authServices.updateUser({ _id, email }, { subscription });
  res.json({
    user,
  });
};

const updateAvatar = async (req, res) => {
  const { _id, email } = req.user;
  if (!req.file) {
    throw HttpError(400, "The file with avatar is not found");
  }

  const { path: tempUpload, originalname } = req.file;

  try {
    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250);
    await image.writeAsync(tempUpload);
  } catch (error) {
    console.error("The file is corrupted and cannot be opened:", error);
    throw HttpError(500, "Internal Server Error");
  }

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  const user = await authServices.updateUser({ _id, email }, { avatarURL });

  res.json({
    avatarURL: user.avatarURL,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(singin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};

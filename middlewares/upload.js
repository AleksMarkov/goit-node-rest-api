import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const tempDir = path.join(dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

export const upload = multer({
  storage: multerConfig,
});

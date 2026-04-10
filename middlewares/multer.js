import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const originalName = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9-_]/g, "_");
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${originalName}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({ storage: storage });

export const uploadClientFiles = multer({ storage: storage }).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "liscence", maxCount: 1 },
]);

export const uploadProviderFiles = multer({ storage: storage }).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "liscence", maxCount: 1 },
  { name: "companyProfile", maxCount: 1 },
  { name: "crDocument", maxCount: 1 },
  { name: "establishmentContract", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
  { name: "otherDocuments", maxCount: 1 },
]);

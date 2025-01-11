import express from "express";

import { addQuotationToRequest, deleteQuotation, getAllQuotations, getSingleQuotation } from "../controllers/quotationControllers.js";
import { upload } from "../middlewares/multer.js";

const quotationRoutes = express.Router();

quotationRoutes.post("/create", upload.single("uploadedFile"), addQuotationToRequest);
quotationRoutes.get("/get-all", getAllQuotations);
quotationRoutes.get("/get-single/:id", getSingleQuotation);
quotationRoutes.delete("/delete/:id", deleteQuotation);


export default quotationRoutes;
import express from "express";

import { createTransaction, getAllTransactions, getSingleTransactionById, deleteTransaction } from "../controllers/transactionControllers.js";

const transactionRoutes = express.Router();

transactionRoutes.post("/create", createTransaction);
transactionRoutes.post("/get-all", getAllTransactions);
transactionRoutes.get("/get-single/:id", getSingleTransactionById);
transactionRoutes.delete("/delete/:id", deleteTransaction);

export default transactionRoutes;
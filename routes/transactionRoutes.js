import express from "express";

import { createTransaction, getAllTransactions, getSingleTransactionById, deleteTransaction } from "../controllers/transactionControllers.js";

const transactionRouter = express.Router();

transactionRouter.post("/create", createTransaction);
transactionRouter.post("/get-all", getAllTransactions);
transactionRouter.get("/get-single/:id", getSingleTransactionById);
transactionRouter.delete("/delete/:id", deleteTransaction);

export default transactionRouter;
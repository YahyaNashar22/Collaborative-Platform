import chalk from "chalk";

import Transaction from "../models/transactionModel.js";
import { getAllTransactionsService, getSingleTransactionByIdService } from "../services/transactionServices.js";

// Create New Transaction
export const createTransaction = async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        const transaction = new Transaction({ from, to, amount });
        await transaction.save();

        console.log(chalk.yellow.bold(`Transaction from ${from} to ${to} created`));

        return res.status(201).json({
            message: "Transaction Created Successfully",
            payload: transaction
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem Creating Transaction",
            error: error.message
        });
    }
}

// Get All Transactions
// ? Also can filter transactions by selecting sender and receiver
export const getAllTransactions = async (req, res) => {
    try {
        const { from, to } = req.body;
        const transactions = await getAllTransactionsService({ from, to });

        if (!transactions) return res.status(404).json({ message: "No Transactions found" });

        return res.status(200).json({ message: "Transactions Found Successfully", payload: transactions });
    } catch (error) {
        res.status(500).json({
            message: "Problem Fetching Transactions",
            error: error.message
        });
    }
}

// Get Single Transaction By Id
export const getSingleTransactionById = async (req, res) => {
    try {
        const id = req.params.id;

        const transaction = await getSingleTransactionByIdService(id);

        if (!transaction) return res.status(404).json({ message: "Transaction does not exist" });

        return res.status(200).json({
            message: "Transaction found successfully",
            payload: transaction
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem Fetching Transaction",
            error: error.message
        });
    }
}

// Delete Transaction
export const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id;

        const transaction = await getSingleTransactionByIdService(id);

        if (!transaction) return res.status(404).json({ message: "Transaction does not exist" });

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Deleted Transaction Successfully",
            payload: deletedTransaction
        });

    } catch (error) {
        res.status(500).json({
            message: "Problem Deleting Transaction",
            error: error.message
        });
    }
}
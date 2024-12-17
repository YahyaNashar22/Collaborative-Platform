import chalk from "chalk";
import Transaction from "../models/transactionModel.js";

export const getAllTransactionsService = async ({ from, to }) => {
    try {
        const query = {};

        if (from) query.from = from;
        if (to) query.to = to;

        const transactions = await Transaction.find(query).sort({ createdAt: -1 });
        if (!transactions) {
            console.log(chalk.yellow.bold("No Transactions found"));
            return [];
        }
        console.log(chalk.yellow.bold("Transactions Found"));
        return transactions;
    } catch (error) {
        console.log(chalk.red.bold("Failed To Fetch Transactions"));
        console.error(error);
        return null;
    }
}

export const getSingleTransactionByIdService = async (id) => {
    try {
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            console.log(chalk.yellow.bold(`Transaction Not Found for id ${id}`));
            return null;
        }
        console.log(chalk.yellow.bold(`Transaction ${id} Found`));
        return transaction;
    } catch (error) {
        console.log(chalk.red.bold("Failed To Fetch Transaction"));
        console.error(error);
        return null;
    }
}
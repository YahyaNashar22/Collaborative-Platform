import chalk from "chalk";

import Quotation from "../models/quotationModel.js";

// Create Quotation
export const createQuotationService = async ({ providerId, amount, message, availableHours }) => {
    try {

        const quotation = new Quotation({ providerId, amount, message, availableHours });

        await quotation.save();

        console.log(chalk.green.bold(`Quotation from ${providerId} added successfully`));
        return quotation;

    } catch (error) {
        console.log(chalk.red.bold("Failed To Add Quotation!"));
        console.error(error);
    }
}


// Get Single Quotation
export const getSingleQuotationService = async (id) => {
    try {

        const quotation = await Quotation.findById(id);

        if (!quotation) {
            console.log(chalk.red.bold(`Quotation ${id} not found!`));
            return null;
        }

        console.log(chalk.green.bold(`Quotation ${id} found successfully`));
        return quotation;

    } catch (error) {
        console.log(chalk.red.bold("Failed To Fetch Quotation!"));
        console.error(error);
    }
}
import chalk from "chalk";

import Quotation from "../models/quotationModel.js";

// Create Quotation
export const createQuotationService = async ({ requestId, providerId, amount, message, availableHours, uploadedFile }) => {
    try {

        const quotation = new Quotation({ requestId, providerId, amount, message, availableHours, uploadedFile });

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

// Delete all quotations for a specific request
export const deleteAllRequestQuotations = async (requestId) => {
    try {
        // Find all quotations for the given requestId
        const quotations = await Quotation.find({ requestId });

        // Remove files associated with each quotation
        for (const quotation of quotations) {
            if (quotation.uploadedFile) {
                removeFile(quotation.uploadedFile);
            }
        }

        // Delete all quotations from the database
        await Quotation.deleteMany({ requestId });

        console.log(chalk.green.bold("Quotations and associated files deleted successfully."));
    } catch (error) {
        console.log(chalk.red.bold("Failed To Delete Quotations!"));
        console.error(error);
    }
}
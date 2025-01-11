import chalk from "chalk";
import Quotation from "../models/quotationModel.js";
import { createQuotationService, getSingleQuotationService } from "../services/quotationServices.js";
import removeFile from "../utils/removeFile.js";


// Add Quotation to request
export const addQuotationToRequest = async (req, res) => {
    try {
        const { providerId, amount, message, availableHours, requestId } = req.body;
        const uploadedFile = req.file?.filename;

        // TODO: add the quotation to the request quotations array

        const quotation = await createQuotationService({ requestId, providerId, amount, message, availableHours, uploadedFile });

        return res.status(201).json({
            message: "Quotation Created Successfully",
            quotation: quotation
        })

    } catch (error) {
        res.status(500).json({
            message: "Problem Adding Quotation",
            error: error.message
        });
    }
}


// Get all quotations -- ( for dev only )
export const getAllQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find({}).sort({ createdAt: -1 });

        if (!quotations || quotations.length == 0) return res.status(404).json({ message: "There are no current quotations available", payload: [] });

        return res.status(200).json({
            message: "Quotations fetched successfully",
            payload: quotations
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem Fetching Quotations",
            error: error.message
        });
    }
}


// Get Single Quotation By Id
export const getSingleQuotation = async (req, res) => {
    try {
        const id = req.params.id;

        const quotation = await getSingleQuotationService(id);

        if (!quotation) return res.status(404).json({ message: "Quotation does not exist" });

        return res.status(200).json({ message: "Quotation fetched successfully", payload: quotation });
    } catch (error) {
        res.status(500).json({
            message: "Problem Fetching Quotation",
            error: error.message
        });
    }
}


// Delete Quotation
export const deleteQuotation = async (req, res) => {
    try {
        const id = req.params.id;

        const quotation = await getSingleQuotationService(id);

        if (!quotation) return res.status(404).json({ message: "Quotation does not exist" });

        if (quotation && quotation.uploadedFile) removeFile(quotation.uploadedFile);

        const deletedQuotation = await Quotation.findByIdAndDelete(id);

        console.log(chalk.yellow.bold(`Quotation ${id} deleted successfully`));

        return res.status(200).json({ message: "Quotation Deleted Successfully", payload: deletedQuotation });
    } catch (error) {
        res.status(500).json({
            message: "Problem Deleting Quotation",
            error: error.message
        });
    }
}

import chalk from "chalk";
import Quotation from "../models/quotationModel.js";
import {
  createQuotationService,
  getSingleQuotationService,
} from "../services/quotationServices.js";
import removeFile from "../utils/removeFile.js";
import { addQuotationToRequestService } from "../services/requestServices.js";

// Add Quotation to request
export const addQuotationToRequest = async (req, res) => {
  try {
    const { providerId, amount, description, estimatedDeadline, requestId } =
      req.body;
    const uploadedFile = req.file?.filename;

    // create quotation
    const quotation = await createQuotationService({
      requestId,
      providerId,
      amount,
      description,
      estimatedDeadline,
      uploadedFile,
    });

    // add quotation to request
    await addQuotationToRequestService(requestId, quotation._id);

    return res.status(201).json({
      message: "Quotation Created And Added To Request Successfully",
      quotation: quotation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Adding Quotation",
      error: error.message,
    });
  }
};

// Get all quotations -- ( for dev only )
export const getAllQuotations = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!requestId) {
      return res.status(400).json({
        message: "requestId is required in URL params",
      });
    }

    const quotations = await Quotation.find({ requestId })
      .sort({ createdAt: -1 })
      .populate("providerId", "firstName lastName email")
      .lean();

    if (!quotations || quotations.length === 0) {
      return res.status(404).json({
        message: "No Offers submitted yet.",
        payload: [],
      });
    }

    return res.status(200).json({
      message: "Quotations fetched successfully",
      payload: quotations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Quotations",
      error: error.message,
    });
  }
};

// Get Single Quotation By Id
export const getSingleQuotation = async (req, res) => {
  try {
    const id = req.params.id;

    const quotation = await getSingleQuotationService(id);

    if (!quotation)
      return res.status(404).json({ message: "Quotation does not exist" });

    return res
      .status(200)
      .json({ message: "Quotation fetched successfully", payload: quotation });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Quotation",
      error: error.message,
    });
  }
};

// Delete Quotation
export const deleteQuotation = async (req, res) => {
  try {
    const id = req.params.id;

    const quotation = await getSingleQuotationService(id);

    if (!quotation)
      return res.status(404).json({ message: "Quotation does not exist" });

    if (quotation && quotation.uploadedFile) removeFile(quotation.uploadedFile);

    const deletedQuotation = await Quotation.findByIdAndDelete(id);

    console.log(chalk.yellow.bold(`Quotation ${id} deleted successfully`));

    return res.status(200).json({
      message: "Quotation Deleted Successfully",
      payload: deletedQuotation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Deleting Quotation",
      error: error.message,
    });
  }
};

import chalk from "chalk";
import Project from "../models/projectModel.js";
import Request from "../models/requestModel.js";
import {
  deleteAllRequestQuotations,
  getSingleQuotationService,
  getMultipleQuotationsService,
} from "../services/quotationServices.js";
import {
  changeRequestStageService,
  createRequestService,
  generateStagesAndTimelines,
  getAllClientRequestsService,
  getAllProviderRequestsService,
  getAllRequestsService,
  getProvidersForRequest,
  getRequestByIdService,
} from "../services/requestServices.js";

// Create request
// * When Client requests a service ( Stage 1)
export const createRequest = async (req, res) => {
  try {
    const {
      clientId,
      serviceId,
      title,
      description,
      offerDeadline,
      projectDeadline,
      budget,
    } = req.body;

    const document = req.file ? req.file.path : "";
    console.log(document, "*-**-*--*-*-*-");

    const request = await createRequestService({
      clientId,
      serviceId,
      title,
      description,
      document,
      offerDeadline,
      projectDeadline,
      budget,
    });

    if (!request)
      return res.status(403).json({ message: "Failed to create request" });

    return res.status(201).json({
      message: "request created successfully",
      payload: request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Creating Request",
      error: error.message,
    });
  }
};

// Pass request to providers
// * When admin selects providers and transfers the request to them ( Stage 2 )
// * providers will be able to see the request only if they are on it
export const passRequestToProviders = async (req, res) => {
  try {
    const { requestId, providerIds } = req.body;

    if (!Array.isArray(providerIds)) {
      return res.status(400).json({ message: "providerIds must be an array" });
    }

    // check if request exists
    const request = await getRequestByIdService(requestId);
    if (!request)
      return res.status(404).json({ message: "Request Does Not Exist" });

    const existingProviderIds = request.providerId || [];

    // Calculate IDs to add and remove
    const idsToAdd = providerIds.filter(
      (id) => !existingProviderIds.includes(id)
    );
    const idsToRemove = existingProviderIds.filter(
      (id) => !providerIds.includes(id)
    );

    // Build bulk update operations
    const updateOperations = {};
    if (idsToAdd.length > 0)
      updateOperations.$addToSet = { providerId: { $each: idsToAdd } };
    if (idsToRemove.length > 0)
      updateOperations.$pull = { providerId: { $in: idsToRemove } };

    // Update only if there’s something to change
    if (Object.keys(updateOperations).length > 0) {
      await Request.findByIdAndUpdate(requestId, updateOperations, {
        new: true,
      });

      // Update stage
      await changeRequestStageService(
        requestId,
        2,
        "⏳awaiting providers quotations"
      );
    }

    return res.status(200).json({
      message: `Updated assigned providers for request ${requestId}`,
      added: idsToAdd,
      removed: idsToRemove,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem assigning providers to request",
      error: error.message,
    });
  }
};

// Approve Quotations ( After quotations being created and added in addQuotationToRequest controller)
// * When admin selects quotations and transfers the request to the client ( Stage 3 )
export const approveQuotation = async (req, res) => {
  try {
    const { requestId, quotationIds } = req.body;

    // check if request exists
    const request = await getRequestByIdService(requestId);
    if (!request)
      return res.status(404).json({ message: "Request Does Not Exist" });

    // check if quotation exists
    const quotation = await getMultipleQuotationsService(quotationIds);
    if (!quotation.length)
      return res.status(404).json({ message: "Quotation Does Not Exist" });

    let approvedSet = new Set(
      request.approvedQuotations.map((id) => id.toString())
    );

    let actionMessages = [];

    quotationIds.forEach((id) => {
      if (approvedSet.has(id)) {
        approvedSet.delete(id);
        actionMessages.push(`Removed Quotation ${id}`);
      } else {
        approvedSet.add(id);
        actionMessages.push(`Approved Quotation ${id}`);
      }
    });

    // Update the request
    request.approvedQuotations = Array.from(approvedSet);

    // update stage request
    await changeRequestStageService(
      requestId,
      3,
      "⏳awaiting client to choose quotation"
    );

    // await request.save();

    res.status(200).json({
      message: "Request approve and sent back to client successfully",
      details: actionMessages,
      approvedQuotations: request.approvedQuotations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Sending Request Back",
      error: error.message,
    });
  }
};

// Admin sends back request to client
// * When admin selects quotations and transfers the request to the client ( Stage 3 )
export const sendBackToClient = async (req, res) => {
  try {
    const { requestId } = req.body;

    // check if request exists
    const request = await getRequestByIdService(requestId);
    if (!request)
      return res.status(404).json({ message: "Request Does Not Exist" });

    await changeRequestStageService(
      requestId,
      3,
      "⏳awaiting client to choose quotation"
    );

    res.status(200).json({
      message: "Request sent back to client successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Sending Request Back",
      error: error.message,
    });
  }
};

// Client Select Quotation
// * When client selects quotation and moves to payment gateway or start project( Stage 4 )

export const selectQuotationAndStartProject = async (req, res) => {
  try {
    const { requestId, quotationId } = req.body;

    const request = await getRequestByIdService(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request Does Not Exist" });
    }

    const quotation = await getSingleQuotationService(quotationId);
    if (!quotation) {
      return res.status(404).json({ message: "Quotation Does Not Exist" });
    }

    const newRequest = await Request.findByIdAndUpdate(
      requestId,
      { $set: { selectedQuotation: quotationId } },
      { new: true }
    );

    await changeRequestStageService(requestId, 4, "accepted");

    const result = generateStagesAndTimelines(quotation.estimatedDeadline);

    const project = new Project({
      clientId: request.clientId,
      providerId: quotation.providerId,
      serviceId: request.serviceId,
      amount: quotation.amount,
      stages: result.stages,
      timelines: result.timelines,
      projectDeadline: request.projectDeadline,
      projectEstimatedDeadline: quotation.estimatedDeadline,
      stage: result.stages[0],
      availableHours: quotation.availableHours || [],
    });

    await project.save();

    res.status(201).json({
      message: "Quotation selected and project started successfully",
      payload: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Selecting Quotation or Starting Project",
      error: error.message,
    });
  }
};

// Cancel Request -- for client
export const cancelRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    // check if request exists
    const request = await getRequestByIdService(requestId);
    if (!request)
      return res.status(404).json({ message: "Request Does Not Exist" });

    // mark request as canceled
    await changeRequestStageService(requestId, 4, "canceled");

    res.status(200).json({
      message: "Canceled Request Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Canceling Requests",
      error: error.message,
    });
  }
};

// Get all requests -- for admin
export const getAllRequests = async (req, res) => {
  try {
    const { userId, serviceId, firstName, lastName, phone, name } = req.body;
    const requests = await getAllRequestsService({
      userId,
      serviceId,
      firstName,
      lastName,
      phone,
      name,
    });

    if (!requests || requests.length == 0)
      return res
        .status(404)
        .json({ message: "no requests available", payload: [] });

    return res
      .status(200)
      .json({ message: "requests found successfully", payload: requests });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Requests",
      error: error.message,
    });
  }
};

// Get all client requests -- for client dashboard ( by clientId )
// make sure to send the correct logged in userId from the front end
export const getAllClientRequests = async (req, res) => {
  try {
    const { userId, firstName, lastName, phone, name } = req.body;

    if (!userId)
      return res.status(401).json({ message: "userId must be provided" });

    const requests = await getAllClientRequestsService({
      userId,
      firstName,
      lastName,
      phone,
      name,
    });

    if (!requests || requests.length == 0)
      return res
        .status(404)
        .json({ message: "no requests available", payload: [] });

    return res
      .status(200)
      .json({ message: "requests found successfully", payload: requests });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Requests",
      error: error.message,
    });
  }
};

// Get all provider requests -- for provider dashboard ( by providerId )
// make sure to send the correct logged in userId from the front end
export const getAllProviderRequests = async (req, res) => {
  try {
    const { userId, firstName, lastName, phone, name } = req.body;

    if (!userId)
      return res.status(401).json({ message: "userId must be provided" });

    const requests = await getAllProviderRequestsService({
      userId,
      firstName,
      lastName,
      phone,
      name,
    });

    if (!requests || requests.length == 0)
      return res
        .status(404)
        .json({ message: "no requests available", payload: [] });

    return res
      .status(200)
      .json({ message: "requests found successfully", payload: requests });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Requests",
      error: error.message,
    });
  }
};

// Get all providers that are not assign to specific request id
// helpfull when admin assign request to user

export const getAllProvidersByRequestId = async (req, res) => {
  const { requestId } = req.params;
  const { query } = req.query;

  try {
    if (!requestId) {
      return res.status(400).json({ message: "Request ID is required" });
    }

    const providers = await getProvidersForRequest(requestId, query);

    return res.status(200).json({
      message: "providers fetched successfully",
      payload: providers,
    });
  } catch (error) {
    console.error("Error in providers Fetching:", error);
    return res.status(500).json({
      message: "Failed to fetch providers",
    });
  }
};

// Get single request by id
export const getSingleRequest = async (req, res) => {
  try {
    const id = req.params.id;

    const request = await getRequestByIdService(id);

    if (!request)
      return res.status(404).json({ message: "Request Does Not Exist" });

    res.status(200).json({
      message: "request fetched successfully",
      payload: request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Request",
      error: error.message,
    });
  }
};

//  Delete request
export const deleteRequest = async (req, res) => {
  try {
    const id = req.params.id;

    //check if request exist
    const request = await getRequestByIdService(id);
    if (!request)
      return res.status(404).json({ message: "Request Does Not Exist" });

    await deleteAllRequestQuotations(id);
    await Request.findByIdAndDelete(id);

    res.status(200).json({
      message: "Request and all related quotations deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Deleting Request",
      error: error.message,
    });
  }
};

// request meeting
export const requestRequestMeeting = async (req, res) => {
  try {
    const id = req.params.id;
    const { selectedTime } = req.body;

    //check if request exist
    const request = await getRequestByIdService(id);
    if (!request)
      return res.status(404).json({ message: "Request Does Not Exist" });

    // TODO: Add Request Meeting Template Here ( email )

    res.status(200).json({ message: "Meeting Requested Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Problem Requesting Meeting",
      error: error.message,
    });
  }
};

// TODO: Add reminder logic

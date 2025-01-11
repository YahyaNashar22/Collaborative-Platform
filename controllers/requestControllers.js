import Request from "../models/requestModel.js";
import { changeRequestStageService, createRequestService, getAllRequestsService, getRequestByIdService } from "../services/requestServices.js";


// Create request
// * When Client requests a service ( Stage 1)
export const createRequest = async (req, res) => {
    try {
        const { clientId, serviceId } = req.body;

        const request = await createRequestService({ clientId, serviceId });

        if (!request) return res.status(403).json({ message: "Failed to create request" });

        return res.status(201).json({
            message: "request created successfully",
            payload: request
        })
    } catch (error) {
        res.status(500).json({
            message: "Problem Creating Request",
            error: error.message
        });
    }
}

// Pass request to providers
// * When admin selects providers and transfers the request to them ( Stage 2 )
// * providers will be able to see the request only if they are on it
export const passRequestToProvider = async (req, res) => {
    try {
        const { requestId, providerId } = req.body;

        // check if request exists
        const request = await getRequestByIdService(requestId);

        if (!request) return res.status(404).json({ message: "Request Does Not Exist" });

        // add provider to request
        let updateOperation;

        // check if providerId already exists in the request
        if (request.providerId.includes(providerId)) {
            // remove providerId
            updateOperation = { $pull: { providerId: providerId } };
        } else {
            // add providerId
            updateOperation = { $addToSet: { providerId: providerId } };
        }

        await Request.findByIdAndUpdate(requestId, updateOperation, { new: true });

        await changeRequestStageService(requestId, 2);

        const action = updateOperation.$pull ? 'removed from' : 'added to';

        return res.status(200).json({
            message: `provider ${providerId} successfully ${action} to request ${requestId}`
        });


    } catch (error) {
        res.status(500).json({
            message: "Problem Passing Request To Provider",
            error: error.message
        });
    }
}

// Approve Quotations ( After quotations being created and added in addQuotationToRequest controller)
// * When admin selects quotations and transfers the request to the client ( Stage 3 )
export const approveQuotation = async (req, res) => {
    try {
        const { requestId, quotationId } = req.body;

        // check if request exists
        const request = await getRequestByIdService(requestId);

        if (!request) return res.status(404).json({ message: "Request Does Not Exist" });

        // Approve Quotation
        let updateOperation;

        // check if providerId already exists in the request
        if (request.approvedQuotations.includes(quotationId)) {
            // remove providerId
            updateOperation = { $pull: { approvedQuotations: quotationId } };
        } else {
            // add providerId
            updateOperation = { $addToSet: { approvedQuotations: quotationId } };
        }

        await Request.findByIdAndUpdate(requestId, updateOperation, { new: true });

        const action = updateOperation.$pull ? 'Removed' : 'Approved';

        res.status(200).json({
            message: `${action} Quotation ${quotationId}`,
        })
    } catch (error) {
        res.status(500).json({
            message: "Problem Approving Quotation",
            error: error.message
        });
    }
}

// Admin sends back request to client
// * When admin selects quotations and transfers the request to the client ( Stage 3 )
export const sendBackToClient = async (req, res) => {
    try {
        const { requestId } = req.body;

        // check if request exists
        const request = await getRequestByIdService(requestId);

        if (!request) return res.status(404).json({ message: "Request Does Not Exist" });

        await changeRequestStageService(requestId, 3);

        res.status(200).json({
            message: "Request sent back to client successfully",
        })
    } catch (error) {
        res.status(500).json({
            message: "Problem Sending Request Back",
            error: error.message
        });
    }
}

// Client Select Quotation
// * When client selects quotation and moves to payment gateway( Stage 4 )
export const selectQuotation = async (req, res) => {
    try {

    } catch (error) {

    }
}

// Get all requests -- for admin
export const getAllRequests = async (req, res) => {
    try {
        const requests = await getAllRequestsService();

        if (!requests || requests.length == 0) return res.status(404).json({ message: "no requests available", payload: [] });

        return res.status(200).json({ message: "requests found successfully", payload: requests }); s
    } catch (error) {
        res.status(500).json({
            message: "Problem Fetching Requests",
            error: error.message
        });
    }
}

// Get all clients requests -- for client dashboard ( by clientId )
export const getAllClientRequests = async (req, res) => {
    try {

    } catch (error) {

    }
}

// Get all provider requests -- for provider dashboard ( providerId includes id )
export const getAllProviderRequests = async (req, res) => {
    try {

    } catch (error) {

    }
}

// Get single request by id
export const getSingleRequest = async (req, res) => {
    try {


    } catch (error) {

    }
}



// Cancel | Delete request
export const deleteRequest = async (req, res) => {
    try {

    } catch (error) {

    }
}

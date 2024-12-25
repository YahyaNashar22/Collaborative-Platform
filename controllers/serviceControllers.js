import { createServiceService, editServiceService, deleteServiceService, getAllServicesService, getSingleServiceByIdService } from "../services/serviceServices.js";
import removeImage from "../utils/removeImage.js";

// Create Service Controller
export const createServiceController = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { image } = req.file?.filename;

        const service = await createServiceService({ name, description, image });

        return res.status(201).json({
            message: "Service Created Successfully",
            payload: service,
        })
    } catch (error) {
        res.status(500).json({
            message: "Problem Creating Service",
            error: error.message
        });
    }
}

// Edit Service Controller
export const editServiceController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const { image } = req.file?.filename;

        const service = await getSingleServiceByIdService(id);

        if (!service) return res.status(404).json({
            message: "Service Does Not Exist!"
        });

        if (image && service.image) removeImage(service.image);

        const editedService = await editServiceService(id, { name, description, image });

        return res.status(200).json({
            message: `${editedService.name} Edited Successfully`,
            payload: editedService
        })
    } catch (error) {
        res.status(500).json({
            message: "Problem Editing Service",
            error: error.message
        });
    }
}

// Get All Services
export const getAllServicesController = async (req, res) => {
    try {
        const services = await getAllServicesService();

        if (services.length == 0)
            return res.status(200).json({
                message: "No Current Services Available, Consider Adding Some!",
                payload: services
            });
        return res.status(200).json({
            message: "Services Fetched Successfully",
            payload: services
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem Fetching Services",
            error: error.message
        });
    }
}

// Get Single Service By Id
export const getSingleServiceByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await getSingleServiceByIdService(id);

        if (!service)
            return res.status(404).json({
                message: "Service Does Not Exist!"
            });

        return res.status(200).json({
            message: "Service Found Successfully",
            payload: service
        });

    } catch (error) {
        res.status(500).json({
            message: "Problem Fetching Service",
            error: error.message
        });
    }
}

// Delete Service
export const deleteServiceController = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await getSingleServiceByIdService(id);

        if (!service)
            return res.status(404).json({
                message: "Service Does Not Exist!"
            });

        if (service.image) removeImage(service.image);


        const deletedService = await deleteServiceService(id);

        return res.status(200).json({
            message: `${deletedService.name} Service Deleted Successfully`,
            payload: deletedService
        })

    } catch (error) {
        res.status(500).json({
            message: "Problem Deleting Service",
            error: error.message
        });
    }
}
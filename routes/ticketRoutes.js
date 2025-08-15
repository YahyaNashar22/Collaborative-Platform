import express from "express";
import { ticketTemplate } from "../utils/emailTemplates";



const ticketRoutes = express.Router();

ticketRoutes.post('/send-ticket', (req, res) => {
    const {
        senderId,
        projectId,
        clientId,
        providerId,
        message
    } = req.body;

    try {
        ticketTemplate(senderId,
            projectId,
            clientId,
            providerId,
            message);
        res.status(201).json({ message: "Email Sent Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
}
);



export default ticketRoutes;
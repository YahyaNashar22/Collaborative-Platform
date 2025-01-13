import { getProjectByIdService } from "../services/projectServices.js";

// check if project files are already uploaded
const checkProjectFilesState = async (req, res, next) => {
    try {
        const id = req.params.id;
        const project = await getProjectByIdService(id);

        if (!project) {
            return res.status(404).json({ message: "Project Not Found!" });
        }

        if (project.isUploadedFiles) {
            return res.status(400).json({ message: "Files already uploaded" });
        }

        // If project is found and files aren't uploaded yet, proceed
        next();
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export default checkProjectFilesState;
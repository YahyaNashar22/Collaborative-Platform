import { getProjectByIdService } from "../services/projectServices.js";

// check if project files are already uploaded
const checkProjectFilesState = async (req, res, next) => {
  try {
    const { id, stageId } = req.params;
    const project = await getProjectByIdService(id);

    if (!project) {
      return res.status(404).json({ message: "Project Not Found!" });
    }

    const stage = project.stages.id(stageId);
    if (!stage) {
      return res.status(404).json({ message: "Stage Not Found!" });
    }

    if (stage.isUploadedFiles) {
      return res
        .status(400)
        .json({ message: "Files already uploaded for this stage" });
    }

    // If project is found and files aren't uploaded yet, proceed
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default checkProjectFilesState;

import { useRef, useState } from "react";
import styles from "./ProjectConfiguration.module.css";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import FileDrop from "../../../../libs/common/lib-file-dropper/FileDrop";
import dayjs from "dayjs";
import { Project } from "../../../../interfaces/FullRequests";
import Window from "../../../../libs/common/lib-window/Window";
import PhasesSkeletonLoading from "../../../../shared/PhasesSkeletonLoading/PhasesSkeletonLoading";
import { toast } from "react-toastify";
import {
  createStage,
  requestFiles,
  requestMeeting,
  sendTicket,
  setStageComplete,
  updateStages,
  uploadFile,
} from "../../../../services/ProjectServices";
import { User } from "../../../../interfaces/User";

type ProjectConfigurationProps = {
  // onClickNode: (id: string) => void;
  projectData: Project;
  userData: User | null;
  onBack: () => void;
  // updateStage: (
  //   stageId: string,
  //   projectId: string,
  //   updatedData: { [key: string]: string | Date }
  // ) => void;
};

type NodeId = "timeline" | "files" | "quotation";

const ProjectConfiguration = ({
  // onClickNode,
  projectData,
  onBack,
  // updateStage,
  userData,
}: ProjectConfigurationProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const nodes = [
    { id: "timeline", title: "Project Timeline" },
    { id: "files", title: "Project Files" },
    { id: "quotation", title: "Project Quotation" },
  ] as const;

  const [selected, setSelected] = useState<NodeId>("timeline");
  const [message, setMessage] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<number>();
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [saveWindow, setSaveWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorSendTicket, setErrorSendTicket] = useState("");
  const [requestFileWindow, setRequestFileWindow] = useState<boolean>(false);
  const [sendTicketWindow, setSendTicketWindow] = useState<boolean>(false);
  const [requestMeetingWindow, setRequestMeetingWindow] =
    useState<boolean>(false);
  const [requestMeetingData, setRequestMeetingData] = useState("");
  const [requestFileData, setRequestFileData] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });
  const [phases, setPhases] = useState(
    projectData.stages.map((stage) => ({
      _id: stage._id,
      name: stage.name || "",
      description: stage.description || "",
      start: stage.start?.split("T")[0] || "",
      end: stage.end?.split("T")[0] || "",
      status: stage.status,
      projectFiles: stage.projectFiles,
      isUploadedFiles: stage.isUploadedFiles,
    }))
  );

  const handleSelect = (id: NodeId) => {
    setSelected(id);
    // onClickNode(id);
  };

  const handleCreatePhase = async () => {
    setIsLoading(true);
    const payload = {
      name: `stage ${phases.length + 1}`,
      description: "",
      isUploadedFiles: false,
      projectFiles: "",
      start: new Date(),
      end: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "not_started",
    };

    try {
      const result = await createStage(projectData._id, payload);

      if (result) setPhases((prev) => [...prev, result]);
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      }, 0);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error with Creation!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    value: string | Date | boolean,
    name: keyof (typeof phases)[number],
    index: number
  ) => {
    setPhases((prev) =>
      prev.map((phase, i) =>
        i === index ? { ...phase, [name]: value } : phase
      )
    );
    // to prevant calling this service if provider confirm the stage when assign stages
    if (projectData.assignedStage === true) {
      handleCompleteStage(index);
    }
  };

  const handleCompleteStage = async (index: number) => {
    setIsLoading(true);
    try {
      const result = await setStageComplete(projectData._id, phases[index]._id);
      // add it manually on the front end
      setPhases(result);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePhases = async () => {
    setIsLoading(true);
    try {
      const result = await updateStages(projectData._id, phases);
      // update manualy
      setPhases(result);
      projectData.assignedStage = true;
      setSaveWindow(false);
    } catch (error) {
      toast.error("Error With update!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStage = () => {
    setIsLoading(true);
    setPhases((prev) => prev.filter((_, index) => index !== selectedStage));
    setDeleteWindow(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const viewer =
    userData?.role !== "provider" || projectData.assignedStage === true;

  const handleUploadFile = async (file: File, stageId: string) => {
    if (!file) return;
    try {
      const result = await uploadFile(projectData._id, stageId, file);

      const { projectFiles } = result;
      setPhases((prevPhases) =>
        prevPhases.map((phase) =>
          phase._id === stageId
            ? {
                ...phase,
                isUploadedFiles: true,
                projectFiles,
              }
            : phase
        )
      );

      toast.success("File uploaded successfully.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    }
  };

  const handleRequestFile = async () => {
    if (!requestFileData.title.trim()) {
      toast.error("Title is required to send a file request.");
      return;
    }

    try {
      const result = await requestFiles(projectData._id, requestFileData);
      toast.success("File request sent successfully.");
      setRequestFileWindow(false);
      setRequestFileData({ title: "", description: "" });
    } catch (error) {
      toast.error("Failed to send file request.");
    }
  };

  const handleRequestMeeting = async () => {
    if (!requestMeetingData.trim()) {
      toast.error("Meeting url is required to send a meeting request.");
      return;
    }

    try {
      await requestMeeting(projectData._id, requestMeetingData);
      toast.success("Meeting request sent successfully.");
      setRequestMeetingWindow(false);
      setRequestMeetingData("");
    } catch (error) {
      toast.error("Failed to send Meeting request.");
    }
  };

  const handleSendTicket = async () => {
    if (message.length === 0) {
      setErrorSendTicket("Message is required to send a ticket.");
      return;
    }
    const payload = {
      senderId: userData?._id,
      projectId: projectData._id,
      clientId: projectData.clientId,
      providerId: projectData.providerId,
    };
    try {
      const result = await sendTicket(payload);
      toast.success("Ticket request sent successfully.");
    } catch (error) {
      error;
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={`${styles.backWrapper} d-f align-center pointer`}
          onClick={onBack}
        >
          <span className={styles.backArrow}>←</span>
          <span className={styles.backText}>Back</span>
        </div>
        <header className={`${styles.subNavbar} d-f `}>
          {nodes.map(({ id, title }, index: number) => (
            <>
              <div
                key={index}
                className={`${styles.node} ${
                  selected === id ? styles.selected : ""
                } d-f f-dir-col align-center justify-center pointer`}
                onClick={() => handleSelect(id)}
              >
                <div
                  className={`${styles.step}  d-f align-center justify-center`}
                >
                  {index + 1}
                </div>
                <div className={styles.title}>{title}</div>
              </div>
              {index + 1 !== nodes.length && (
                <div className={styles.line}></div>
              )}
            </>
          ))}
        </header>
        {/* timeline view */}
        <main className={styles.content}>
          {selected === "timeline" && (
            <div className={`${styles.timelineContainer} d-f f-dir-col`}>
              {!viewer && (
                <div className={styles.addBtn}>
                  <LibButton
                    label="+ Add Phase"
                    onSubmit={handleCreatePhase}
                    backgroundColor="transparent"
                    color="#6550b4"
                    bold={true}
                    hoverColor="#563db11c"
                  />
                </div>
              )}

              <div
                className={`${styles.phasesWrapper} d-f f-dir-col gap-1`}
                ref={contentRef}
              >
                {isLoading ? (
                  <PhasesSkeletonLoading />
                ) : (
                  phases.map((phase, i: number) => (
                    <div key={phase._id} className={styles.phaseCard}>
                      <div className="d-f align-center justify-between">
                        <h4>{phase.name}</h4>
                        <div
                          className={`${styles.statusBadge} ${
                            styles[phase.status]
                          }`}
                        >
                          {phase.status
                            .replace("_", " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </div>
                      </div>

                      <TextInput
                        name="name"
                        label="Phase Name"
                        type="string"
                        placeholder="Phase Name"
                        required={false}
                        value={phase.name}
                        disabled={viewer}
                        onChange={(value: string) =>
                          handleChange(value, "name", i)
                        }
                      />

                      <TextAreaInput
                        name="description"
                        label="Description"
                        placeholder="Enter description"
                        disabled={viewer}
                        required={false}
                        value={phase.description}
                        onChange={(value: string) =>
                          handleChange(value, "description", i)
                        }
                      />

                      <div className="d-f gap-1">
                        <TextInput
                          name="start"
                          label="Start Date"
                          placeholder="Pick a date"
                          type="date"
                          disabled={viewer}
                          value={
                            new Date(phase.start).toISOString().split("T")[0]
                          }
                          required={false}
                          onChange={(value: string) =>
                            handleChange(value, "start", i)
                          }
                        />
                        <TextInput
                          name="end"
                          label="End Date"
                          placeholder="Pick a date"
                          type="date"
                          disabled={viewer}
                          value={
                            new Date(phase.end).toISOString().split("T")[0]
                          }
                          required={false}
                          onChange={(value: string) =>
                            handleChange(value, "end", i)
                          }
                        />
                      </div>

                      {phase.start &&
                        phase.end &&
                        dayjs(phase.start).isAfter(dayjs(phase.end)) && (
                          <small className="error">
                            * Start date must be before end date
                          </small>
                        )}

                      <div className="d-f align-center justify-between">
                        {userData?.role === "provider" && (
                          <label
                            className={`d-f align-center ${
                              phase.status !== "in_progress" ? "" : "pointer"
                            }
                             `}
                          >
                            <input
                              name="status"
                              className="pointer"
                              type="checkbox"
                              checked={phase.status === "completed"}
                              disabled={phase.status !== "in_progress"}
                              onChange={(e) =>
                                handleChange(
                                  e.target.checked
                                    ? "completed"
                                    : "in_progress",
                                  "status",
                                  i
                                )
                              }
                            />
                            Completed
                          </label>
                        )}

                        {!viewer && (
                          <LibButton
                            label="Delete"
                            disabled={viewer}
                            onSubmit={() => {
                              setSelectedStage(i);
                              setDeleteWindow(true);
                            }}
                            bold={true}
                            padding="0"
                            backgroundColor="#e53935"
                            hoverColor="#c62828"
                          />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className={`${styles.buttons} d-f align-center justify-end`}>
                {!viewer && (
                  <LibButton
                    label="Save"
                    disabled={viewer}
                    onSubmit={() => {
                      setSaveWindow(true);
                    }}
                    backgroundColor="#825beb"
                    hoverColor="#6c46d9"
                    padding="0"
                  />
                )}
                {userData?.role !== "admin" && (
                  <div className="buttons d-f align-center gap-05">
                    <LibButton
                      label="Request Meeting"
                      onSubmit={() => setRequestMeetingWindow(true)}
                      backgroundColor="#57417e"
                      hoverColor="#49356a"
                      padding="0 20px"
                    />
                    <LibButton
                      label="Send ticket"
                      onSubmit={() => {
                        setErrorSendTicket("");
                        setMessage("");
                        setSendTicketWindow(true);
                      }}
                      backgroundColor="#57417e"
                      hoverColor="#49356a"
                      padding="0 20px"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {/* files view */}
          {selected === "files" && (
            <div className={`${styles.filesContainer} d-f f-dir-col`}>
              {phases.map((phase, index: number) => (
                <FileDrop
                  key={index}
                  phase={phase}
                  userRole={userData?.role as string}
                  assignedStages={projectData.assignedStage}
                  // isUploadedFiles={phase.isUploadedFiles}

                  onUpload={(file, stageId) => handleUploadFile(file, stageId)}
                  onRequest={() => setRequestFileWindow(true)}
                />
              ))}
            </div>
          )}

          {/* quotation view */}
          {selected === "quotation" && (
            <div className={styles.quotationContainer}>
              <div className={styles.dataGroup}>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Project Title</span>
                  <div className={styles.dataValue}>{projectData?.title}</div>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Project Description</span>
                  <div className={styles.dataValue}>
                    {projectData.description || "No Description"}
                  </div>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Project Deadline</span>
                  <div className={styles.dataValue}>
                    {
                      new Date(projectData?.projectDeadline)
                        .toISOString()
                        .split("T")[0]
                    }
                  </div>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Estimated Deadline</span>
                  <div className={styles.dataValue}>
                    {
                      new Date(projectData?.projectEstimatedDeadline)
                        .toISOString()
                        .split("T")[0]
                    }
                  </div>
                </div>
                {/* <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Service</span>
                <div className={styles.dataValue}>UI/UX Design</div>
              </div> */}
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>Project Cost</span>
                  <div className={styles.dataValue}>
                    {projectData?.amount} $
                  </div>
                </div>
                {/* <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Attached File</span>
                <div className={styles.dataValue}>
                  <a href="#" className={styles.fileLink}>
                    proposal.pdf
                  </a>
                </div>
              </div> */}
              </div>
            </div>
          )}
        </main>

        {deleteWindow && (
          <Window
            title="Delete Stage"
            visible={deleteWindow}
            onClose={() => setDeleteWindow(false)}
            isErrorWindow="true"
          >
            <small className="mb-1 d-b">
              are you sure do you want to delete this stage ?
            </small>
            <div className={`${styles.btns} d-f align-center justify-between`}>
              <LibButton
                label="Cancel"
                onSubmit={() => setDeleteWindow(false)}
                bold={true}
                padding="0"
                outlined
                color="var(--deep-purple)"
                hoverColor="#8563c326"
              />
              <LibButton
                label="Confirm"
                onSubmit={handleDeleteStage}
                bold={true}
                padding="0"
                backgroundColor="#e53935"
                hoverColor="#c62828"
              />
            </div>
          </Window>
        )}
        {saveWindow && (
          <Window
            title="Save Stage"
            visible={saveWindow}
            onClose={() => setSaveWindow(false)}
            isErrorWindow="true"
          >
            <small className="mb-1 d-b f-12">
              are you sure do you want to Save these stages ?
            </small>
            <div className={`${styles.btns} d-f align-center justify-between`}>
              <LibButton
                label="Cancel"
                onSubmit={() => setSaveWindow(false)}
                bold={true}
                padding="0"
                outlined
                color="var(--deep-purple)"
                hoverColor="#8563c326"
              />
              <LibButton
                label="Confirm"
                onSubmit={handleSavePhases}
                bold={true}
                padding="0"
              />
            </div>
          </Window>
        )}
      </div>
      {requestFileWindow && (
        <Window
          title="Request Files"
          visible={requestFileWindow}
          onClose={() => setRequestFileWindow(false)}
        >
          <div className="d-f f-dir-col gap-1">
            <TextInput
              name="title"
              label="Title"
              type="text"
              placeholder="Enter a title for the file request"
              value={requestFileData.title}
              required={true}
              onChange={(value: string) =>
                setRequestFileData((prev) => ({ ...prev, title: value }))
              }
            />
            <TextInput
              name="description"
              label="Description"
              type="text"
              placeholder="Enter description"
              value={requestFileData.description}
              required={true}
              onChange={(value: string) =>
                setRequestFileData((prev) => ({ ...prev, description: value }))
              }
            />

            <div className="d-f align-center justify-between mt-1">
              <LibButton
                label="Cancel"
                onSubmit={() => setRequestFileWindow(false)}
                bold={true}
                padding="0"
                outlined
                color="var(--deep-purple)"
                hoverColor="#8563c326"
              />
              <LibButton
                label="Send Request"
                onSubmit={handleRequestFile}
                bold={true}
                backgroundColor="#825beb"
                hoverColor="#6c46d9"
              />
            </div>
          </div>
        </Window>
      )}

      {sendTicketWindow && (
        <Window
          title="Send Ticket"
          visible={sendTicketWindow}
          onClose={() => setSendTicketWindow(false)}
        >
          <div className="d-f f-dir-col gap-1">
            <TextInput
              name="message"
              label="Message"
              type="text"
              placeholder="Enter your message"
              value={message}
              errorMessage={errorSendTicket}
              required={true}
              onChange={(value: string) => setMessage(value)}
            />

            <div className="d-f align-center justify-between mt-1">
              <LibButton
                label="Cancel"
                onSubmit={() => setSendTicketWindow(false)}
                bold={true}
                padding="0"
                outlined
                color="var(--deep-purple)"
                hoverColor="#8563c326"
              />
              <LibButton
                label="Send Ticket"
                onSubmit={handleSendTicket}
                bold={true}
                backgroundColor="#825beb"
                hoverColor="#6c46d9"
              />
            </div>
          </div>
        </Window>
      )}
      {requestMeetingWindow && (
        <Window
          title="Request Meeting"
          visible={requestMeetingWindow}
          onClose={() => setRequestMeetingWindow(false)}
        >
          <div className="d-f f-dir-col gap-1">
            <TextInput
              name="meeting"
              label="Meeting Link"
              type="url"
              placeholder="Enter meeting link"
              value={requestMeetingData}
              required={true}
              onChange={(value: string) => setRequestMeetingData(value)}
            />

            <div className="d-f align-center justify-between mt-1">
              <LibButton
                label="Cancel"
                onSubmit={() => setRequestMeetingWindow(false)}
                bold={true}
                padding="0"
                outlined
                color="var(--deep-purple)"
                hoverColor="#8563c326"
              />
              <LibButton
                label="Send Request"
                onSubmit={handleRequestMeeting}
                bold={true}
                backgroundColor="#825beb"
                hoverColor="#6c46d9"
              />
            </div>
          </div>
        </Window>
      )}
    </>
  );
};
export default ProjectConfiguration;

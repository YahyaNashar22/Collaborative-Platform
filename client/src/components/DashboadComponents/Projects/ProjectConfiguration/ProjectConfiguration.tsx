/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProjectConfiguration.module.css";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import FileDrop from "../../../../libs/common/lib-file-dropper/FileDrop";
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
import {
  faArrowLeft,
  faClock,
  faFile,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldError, Validate } from "../../../../utils/Validate";
import { useTranslation } from "react-i18next";

type ProjectConfigurationProps = {
  // onClickNode: (id: string) => void;
  projectData: Project;
  userData: User | null;
  onBack: () => void;
  emitStagesSave: (projectId: string) => void;
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
  emitStagesSave,
  userData,
}: ProjectConfigurationProps) => {
  const { t } = useTranslation();

  const contentRef = useRef<HTMLDivElement>(null);

  const nodes = [
    {
      id: "quotation",
      title: "Project Quotation",
      icon: <FontAwesomeIcon icon={faQuoteRight} />,
    },
    {
      id: "timeline",
      title: "Project Timeline",
      icon: <FontAwesomeIcon icon={faClock} />,
    },
    {
      id: "files",
      title: "Project Files",
      icon: <FontAwesomeIcon icon={faFile} />,
    },
  ] as const;

  const [selected, setSelected] = useState<NodeId>("quotation");
  const [selectedStage, setSelectedStage] = useState<number>();
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [saveWindow, setSaveWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [requestFileWindow, setRequestFileWindow] = useState<boolean>(false);
  const [sendTicketWindow, setSendTicketWindow] = useState<boolean>(false);
  const [requestMeetingWindow, setRequestMeetingWindow] =
    useState<boolean>(false);
  const [requestMeetingData, setRequestMeetingData] = useState({
    title: "",
    description: "",
    meetingLink: "",
    time: "",
  });

  const [completeStageWindow, setCompleteStageWindow] =
    useState<boolean>(false);
  const [currentCompletedStage, setCurrentCompletedStage] = useState<
    number | null
  >(null);

  const [errorRequestMeeting, setErrorRequestMeeting] = useState<FieldError>({
    title: "",
    description: "",
    meetingLink: "",
    time: "",
  });

  const [sendTicketData, setSendTicketData] = useState({
    title: "",
    description: "",
  });

  const [errorSendTicket, setErrorSendTicket] = useState<FieldError>({
    title: "",
    description: "",
  });
  const [requestFileData, setRequestFileData] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });
  const [phases, setPhases] = useState<{ [key: string]: any }>(
    projectData.stages.map((stage) => ({
      _id: stage._id,
      name: stage.name || "",
      description: stage.description || "",
      start: stage.start?.split("T")[0] || "",
      end: stage.end?.split("T")[0] || "",
      status: stage.status,
      projectFiles: stage.projectFiles,
      isUploadedFiles: stage.isUploadedFiles,
      hasError: false,
      isProviderCompleted: stage.isProviderCompleted,
      isClientCompleted: stage.isClientCompleted,
    })),
  );

  useEffect(() => {
    console.log(phases);
  }, [phases]);

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
      hasError: false,
    };

    try {
      const result = await createStage(projectData._id, payload);

      if (result) setPhases((prev: any) => [...prev, result]);
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      }, 0);
    } catch (error) {
      toast.error((error as any)?.data?.message || t("Error with Creation!"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    value: string | Date | boolean,
    name: keyof (typeof phases)[number],
    index: number,
  ) => {
    if (projectData.assignedStage) {
      setCurrentCompletedStage(index);
      setCompleteStageWindow(true);
      return;
    }

    setPhases((prev) =>
      prev.map((phase: any, i: number) => {
        if (i === index) {
          const updatedPhase = { ...phase, [name]: value };

          let hasError = false;
          if (updatedPhase.start && updatedPhase.end) {
            const startDate = new Date(updatedPhase.start);
            const endDate = new Date(updatedPhase.end);
            if (endDate < startDate) {
              hasError = true;
            }
          }

          return { ...updatedPhase, hasError };
        }
        return phase;
      }),
    );
  };

  const validateDate = (phases: any) => {
    const hasAnyError = phases.some((phase: any) => phase.hasError);
    if (hasAnyError) return { hasError: true, cleanPhases: [] };

    // Remove hasError field before submitting
    const cleanPhases = phases.map(({ hasError, ...rest }) => rest);
    return { hasError: false, cleanPhases };
  };

  const handleCompleteStage = async () => {
    if (currentCompletedStage === null) {
      toast.error(t("No stage found"));
      return;
    }
    const { hasError } = validateDate(phases);
    if (hasError) {
      toast.error(t("Cannot complete stage while there are date errors."));
      return;
    }
    setIsLoading(true);
    try {
      const result = await setStageComplete(
        projectData._id,
        phases[currentCompletedStage]._id,
      );
      // add it manually on the front end
      setPhases(result);
      setCompleteStageWindow(false);
      setCurrentCompletedStage(null);
    } catch (error) {
      toast.error((error as any)?.data?.message || t("Error Occurred!"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePhases = async () => {
    const { hasError, cleanPhases } = validateDate(phases);
    if (hasError) {
      toast.error(t("Please fix all date errors before saving."));
      return;
    }
    setIsLoading(true);
    try {
      const result = await updateStages(projectData._id, cleanPhases as any);
      // update manualy
      setPhases(result);
      // only update stage based on the role if client else update the stages
      if (userData?.role === "client") emitStagesSave(projectData._id);
      setSaveWindow(false);
    } catch (error) {
      toast.error(
        (error as any)?.response?.data.message || t("Error With update!"),
      );
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

  const viewer = userData?.role !== "provider";

  const handleUploadFile = async (file: File, stageId: string) => {
    if (!file) return;

    setIsUploadLoading(true);
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
            : phase,
        ),
      );

      toast.success(t("File uploaded successfully."));
    } catch (error) {
      toast.error((error as any)?.data?.message || t("Error Occurred!"));
    } finally {
      setIsUploadLoading(false);
    }
  };

  const handleRequestFile = async () => {
    if (!requestFileData.title.trim()) {
      toast.error(t("Title is required to send a file request."));
      return;
    }

    try {
      await requestFiles(projectData._id, requestFileData);
      toast.success(t("File request sent successfully."));
      setRequestFileWindow(false);
      setRequestFileData({ title: "", description: "" });
    } catch (error) {
      toast.error(
        (error as any)?.data?.message || t("Failed to send file request."),
      );
    }
  };

  const resetRequestMeetingFields = () => {
    setRequestMeetingData({
      title: "",
      description: "",
      meetingLink: "",
      time: "",
    });
    setErrorRequestMeeting({
      title: "",
      description: "",
      meetingLink: "",
      time: "",
    });
  };

  const resetSendTicket = () => {
    setSendTicketData({
      title: "",
      description: "",
    });
    setErrorSendTicket({
      title: "",
      description: "",
    });
  };

  const handleChangeRequestMeeting = (value: string, name: string) => {
    setRequestMeetingData((prev) => ({ ...prev, [name]: value }));
    const fieldError = Validate(name, value, true, "text");
    setErrorRequestMeeting((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleChangeSendTicket = (value: string, name: string) => {
    setSendTicketData((prev) => ({ ...prev, [name]: value }));
    const fieldError = Validate(name, value, true, "text");
    setErrorSendTicket((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleRequestMeeting = async () => {
    const newErrors: FieldError = {
      title: Validate("title", requestMeetingData.title, true, "text"),
      description: Validate(
        "description",
        requestMeetingData.description,
        true,
        "text",
      ),
      time: Validate("time", requestMeetingData.time, true, "text"),
      meetingLink: Validate(
        "meetingLink",
        requestMeetingData.meetingLink,
        true,
        "text",
      ),
    };

    setErrorRequestMeeting(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      return;
    }
    try {
      await requestMeeting(projectData._id, requestMeetingData);
      toast.success(t("Meeting request sent successfully."));
      resetRequestMeetingFields();
      setRequestMeetingWindow(false);
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message ||
          t("Failed to send Meeting request."),
      );
    }
  };

  const handleSendTicket = async () => {
    const newErrors: FieldError = {
      title: Validate("title", sendTicketData.title, true, "text"),
      description: Validate(
        "description",
        sendTicketData.description,
        true,
        "text",
      ),
    };

    setErrorSendTicket(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      return;
    }
    const payload: Partial<{ [key: string]: string }> = {
      senderId: userData?._id,
      projectId: projectData._id,
      clientId: projectData.clientId,
      providerId: projectData.providerId,
      title: sendTicketData.title,
      description: sendTicketData.description,
    };
    try {
      await sendTicket(projectData._id, payload);
      resetSendTicket();
      setSendTicketWindow(false);
      toast.success(t("Ticket request sent successfully."));
    } catch (error) {
      toast.error((error as any)?.data?.message || t("Failed to send ticket."));
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={`${styles.backWrapper} d-f align-center pointer`}
          onClick={onBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className={styles.backText}>{t("Back")}</span>
        </div>
        <header className={`${styles.subNavbar} d-f `}>
          {nodes.map(({ id, title, icon }, index: number) => (
            <React.Fragment key={id}>
              <div
                className={`${styles.node} ${
                  selected === id ? styles.selected : ""
                } d-f f-dir-col align-center justify-center pointer`}
                onClick={() => handleSelect(id)}
              >
                <div
                  className={`${styles.step}  d-f align-center justify-center`}
                >
                  {icon}
                </div>
                <div className={styles.title}>{t(title)}</div>
              </div>
              {index + 1 !== nodes.length && (
                <div className={styles.line}></div>
              )}
            </React.Fragment>
          ))}
        </header>
        {/* timeline view */}
        {userData?.role !== "admin" && (
          <div className="buttons d-f align-end justify-end gap-05 my-1 mr-1">
            <LibButton
              label="Request Meeting"
              onSubmit={() => {
                resetRequestMeetingFields();
                setRequestMeetingWindow(true);
              }}
              backgroundColor="#57417e"
              hoverColor="#49356a"
              padding="0 20px"
            />
            <LibButton
              label="Send ticket"
              onSubmit={() => {
                resetSendTicket();
                setSendTicketWindow(true);
              }}
              backgroundColor="#57417e"
              hoverColor="#49356a"
              padding="0 20px"
            />
          </div>
        )}
        <main className={styles.content}>
          {selected === "timeline" && (
            <div className={`${styles.timelineContainer} d-f f-dir-col`}>
              {!viewer && !projectData.assignedStage && (
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
                  phases.map((phase: any, i: number) => (
                    <div key={i} className={styles.phaseCard}>
                      <div className="d-f align-center justify-between">
                        <h4>{phase.name}</h4>
                        <div
                          className={`${styles.statusBadge} ${
                            styles[phase.status]
                          }`}
                        >
                          {phase.status
                            .replace("_", " ")
                            .replace(/\b\w/g, (c: any) => c.toUpperCase())}
                        </div>
                      </div>

                      <TextInput
                        name="name"
                        label={t("Phase Name")}
                        type="string"
                        placeholder={t("Phase Name")}
                        required={false}
                        value={phase.name}
                        disabled={
                          (viewer || projectData.assignedStage) as boolean
                        }
                        onChange={(value: string) =>
                          handleChange(value, "name", i)
                        }
                      />

                      <TextAreaInput
                        name="description"
                        label={t("Description")}
                        placeholder="Enter description"
                        disabled={
                          (viewer || projectData.assignedStage) as boolean
                        }
                        required={false}
                        value={phase.description}
                        onChange={(value: string) =>
                          handleChange(value, "description", i)
                        }
                      />

                      <div className="d-f gap-1">
                        <TextInput
                          name="start"
                          label={t("Start Date")}
                          placeholder={t("Pick a date")}
                          type="date"
                          disabled={
                            (viewer || projectData.assignedStage) as boolean
                          }
                          minDate={new Date().toISOString().split("T")[0]}
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
                          label={t("End Date")}
                          placeholder={t("Pick a date")}
                          type="date"
                          disabled={
                            (viewer || projectData.assignedStage) as boolean
                          }
                          minDate={new Date().toISOString().split("T")[0]}
                          value={
                            new Date(phase.end).toISOString().split("T")[0]
                          }
                          required={false}
                          onChange={(value: string) =>
                            handleChange(value, "end", i)
                          }
                        />
                      </div>

                      {phase.hasError && (
                        <small className="error">
                          {t("* End date must come before end date")}
                        </small>
                      )}

                      <div className="d-f align-center justify-between">
                        {userData?.role !== "admin" && (
                          <div className="d-f justify-between w-100">
                            <label
                              className={`d-f align-center ${
                                phase.isProviderCompleted ||
                                userData?.role === "client" ||
                                phase.status !== "in_progress"
                                  ? ""
                                  : "pointer"
                              }
                             `}
                            >
                              <input
                                name="status"
                                className={`${
                                  phase.isProviderCompleted ||
                                  userData?.role === "client" ||
                                  phase.status !== "in_progress"
                                    ? ""
                                    : "pointer"
                                } `}
                                type="checkbox"
                                checked={
                                  phase.isProviderCompleted ||
                                  phase.status === "completed"
                                }
                                disabled={
                                  phase.isProviderCompleted ||
                                  phase.status !== "in_progress" ||
                                  userData?.role === "client"
                                }
                                onChange={(e) =>
                                  handleChange(
                                    e.target.checked
                                      ? "completed"
                                      : "in_progress",
                                    "status",
                                    i,
                                  )
                                }
                              />
                              {t("Partner Completed")}
                            </label>
                            <label
                              className={`d-f align-center ml-1 ${
                                phase.isClientCompleted ||
                                phase.status !== "in_progress" ||
                                userData?.role === "provider"
                                  ? ""
                                  : "pointer"
                              }
                             `}
                            >
                              <input
                                name="status"
                                className={`${
                                  phase.isClientCompleted ||
                                  phase.status !== "in_progress" ||
                                  userData?.role === "provider"
                                    ? ""
                                    : "pointer"
                                } `}
                                type="checkbox"
                                checked={
                                  phase.isClientCompleted ||
                                  phase.status === "completed"
                                }
                                disabled={
                                  phase.isClientCompleted ||
                                  phase.status !== "in_progress" ||
                                  userData?.role === "provider"
                                }
                                onChange={(e) =>
                                  handleChange(
                                    e.target.checked
                                      ? "completed"
                                      : "in_progress",
                                    "status",
                                    i,
                                  )
                                }
                              />
                              {t("Client Completed")}
                            </label>
                          </div>
                        )}

                        {userData?.role === "provider" &&
                          !projectData.assignedStage && (
                            <LibButton
                              label="Delete"
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
                {!projectData.assignedStage && (
                  <LibButton
                    label={`${userData?.role === "client" ? "Accept" : "Save"}`}
                    onSubmit={() => {
                      setSaveWindow(true);
                    }}
                    disabled={phases.length === 0}
                    backgroundColor="#825beb"
                    hoverColor="#6c46d9"
                    padding="0"
                  />
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
                  phase={phase as any}
                  userRole={userData?.role as string}
                  assignedStages={projectData.assignedStage}
                  // isUploadedFiles={phase.isUploadedFiles}
                  viewer={viewer}
                  isUploadLoading={isUploadLoading}
                  onUpload={(file, stageId) =>
                    handleUploadFile(file as any, stageId)
                  }
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
                  <span className={styles.dataLabel}>{t("Project Title")}</span>
                  <div className={styles.dataValue}>{projectData?.title}</div>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>
                    {t("Project Description")}
                  </span>
                  <div className={styles.dataValue}>
                    {projectData.description || "No Description"}
                  </div>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>
                    {t("Project Deadline")}
                  </span>
                  <div className={styles.dataValue}>
                    {
                      new Date(projectData?.projectDeadline)
                        .toISOString()
                        .split("T")[0]
                    }
                  </div>
                </div>
                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>
                    {t("Estimated Deadline")}
                  </span>
                  <div className={styles.dataValue}>
                    {
                      new Date(projectData?.projectEstimatedDeadline)
                        .toISOString()
                        .split("T")[0]
                    }
                  </div>
                </div>

                <div className={styles.dataItem}>
                  <span className={styles.dataLabel}>{t("Project Cost")}</span>
                  <div className={styles.dataValue}>
                    {projectData?.amount} $
                  </div>
                </div>
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
              {t("are you sure do you want to delete this stage ?")}
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
            title="Save Stages"
            visible={saveWindow}
            onClose={() => setSaveWindow(false)}
            isErrorWindow="true"
          >
            <small className="mb-1 d-b f-12">
              ⚠️ {t("this action is irreversible")}
              <br />
              {t("are you sure do you want to Save these stages ?")}
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
        {completeStageWindow && (
          <Window
            title="Complete Stage"
            visible={completeStageWindow !== null}
            onClose={() => {
              setCurrentCompletedStage(null);
              setCompleteStageWindow(false);
            }}
            isErrorWindow="true"
          >
            <small className="mb-1 d-b f-12">
              ⚠️ {t("this action is irreversible")}
              <br />
              {t("are you sure do you want to Complete this stage ?")}
            </small>
            <div className={`${styles.btns} d-f align-center justify-between`}>
              <LibButton
                label="Cancel"
                onSubmit={() => {
                  setCurrentCompletedStage(null);
                  setCompleteStageWindow(false);
                }}
                bold={true}
                padding="0"
                outlined
                color="var(--deep-purple)"
                hoverColor="#8563c326"
              />
              <LibButton
                label="Confirm"
                onSubmit={handleCompleteStage}
                bold={true}
                padding="0"
              />
            </div>
          </Window>
        )}
      </div>
      {requestFileWindow && (
        <Window
          title={t("Request Files")}
          visible={requestFileWindow}
          onClose={() => setRequestFileWindow(false)}
        >
          <div className="d-f f-dir-col gap-1">
            <TextInput
              name="title"
              label={t("Title")}
              type="text"
              placeholder={t("Enter a title for the file request")}
              value={requestFileData.title}
              required={true}
              onChange={(value: string) =>
                setRequestFileData((prev) => ({ ...prev, title: value }))
              }
            />
            <TextInput
              name="description"
              label={t("Description")}
              type="text"
              placeholder={t("Enter description")}
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
          title={t("Send Ticket")}
          visible={sendTicketWindow}
          onClose={() => {
            resetSendTicket();
            setSendTicketWindow(false);
          }}
        >
          <div className="d-f f-dir-col gap-1">
            <p style={{ color: "var(--dark-grey)", fontStyle: "italic" }}>
              {t("Email will be sent directly to admin")}
            </p>
            <TextInput
              name="title"
              label={t("Ticket title")}
              type="text"
              placeholder={t("Enter your title")}
              value={sendTicketData.title}
              errorMessage={errorSendTicket.title}
              required={true}
              onChange={handleChangeSendTicket}
            />
            <TextAreaInput
              name="description"
              label={t("Ticket description")}
              placeholder={t("Enter your description")}
              value={sendTicketData.description}
              errorMessage={errorSendTicket.description}
              required={true}
              onChange={handleChangeSendTicket}
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
          title={t("Request Meeting")}
          visible={requestMeetingWindow}
          onClose={() => setRequestMeetingWindow(false)}
        >
          <div className="d-f f-dir-col gap-1">
            <p style={{ color: "var(--dark-grey)", fontStyle: "italic" }}>
              {t("Email will be sent to both parties ( client and provider )")}
            </p>
            <TextInput
              name="title"
              label={t("Meeting title")}
              type="text"
              placeholder={t("Enter meeting title")}
              value={requestMeetingData.title}
              required={true}
              onChange={handleChangeRequestMeeting}
              errorMessage={errorRequestMeeting.title}
            />
            <TextInput
              name="time"
              label={t("Meeting time")}
              type="date"
              placeholder={t("Pick a date")}
              minDate={new Date().toISOString().split("T")[0]}
              value={requestMeetingData.time}
              required={true}
              onChange={handleChangeRequestMeeting}
              errorMessage={errorRequestMeeting.time}
            />
            <TextAreaInput
              name="description"
              label={t("Meeting Description")}
              placeholder={t("Enter meeting description")}
              value={requestMeetingData.description}
              required={true}
              onChange={handleChangeRequestMeeting}
              errorMessage={errorRequestMeeting.description}
            />
            <TextInput
              name="meetingLink"
              label={t("Meeting Link")}
              type="url"
              placeholder={t("Enter meeting link")}
              value={requestMeetingData.meetingLink}
              required={true}
              onChange={handleChangeRequestMeeting}
              errorMessage={errorRequestMeeting.meetingLink}
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

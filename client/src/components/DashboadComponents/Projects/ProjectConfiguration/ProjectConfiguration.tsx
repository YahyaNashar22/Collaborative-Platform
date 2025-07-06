import { useRef, useState } from "react";
import styles from "./ProjectConfiguration.module.css";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import FileDrop from "../../../../libs/common/lib-file-dropper/FileDrop";
import dayjs from "dayjs";

type ProjectConfigurationProps = {
  onClickNode: (id: string) => void;
};

type NodeId = "timeline" | "files" | "quotation";

const ProjectConfiguration = ({ onClickNode }: ProjectConfigurationProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const nodes = [
    { id: "timeline", title: "Project Timeline" },
    { id: "files", title: "Project Files" },
    { id: "quotation", title: "Project Quotation" },
  ] as const;

  const [selected, setSelected] = useState<NodeId>("timeline");
  const [phases, setPhases] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      name: "",
      description: "",
      from: "",
      to: "",
      completed: false,
    }))
  );

  const handleSelect = (id: NodeId) => {
    setSelected(id);
    onClickNode(id);
  };

  const handleAddPhase = () => {
    setPhases((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: "",
        description: "",
        from: "",
        to: "",
        completed: false,
      },
    ]);

    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    }, 0);
  };

  const getPhaseColor = (to: string): string => {
    if (!to) return "#fff";

    const now = dayjs();
    const deadline = dayjs(to);
    const diff = deadline.diff(now, "day");

    if (diff < 0) return "#ffe6e6";
    if (diff <= 3) return "#fff3cd";
    if (diff <= 7) return "#e0f7fa";
    return "#f4f4f4";
  };
  return (
    <div className={styles.wrapper}>
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
            {index + 1 !== nodes.length && <div className={styles.line}></div>}
          </>
        ))}
      </header>
      {/* timeline view */}
      <main className={styles.content}>
        {selected === "timeline" && (
          <div className={`${styles.timelineContainer} d-f f-dir-col`}>
            <div className={styles.addBtn}>
              <LibButton
                label="+ Add Phase"
                onSubmit={handleAddPhase}
                backgroundColor="transparent"
                color="#6550b4"
                bold={true}
                hoverColor="#563db11c"
              />
            </div>

            <div className={styles.phasesWrapper} ref={contentRef}>
              {phases.map((phase, i) => (
                <div
                  key={phase.id}
                  className={styles.phaseCard}
                  style={{ backgroundColor: getPhaseColor(phase.to) }}
                >
                  <h4>Phase {phase.id}</h4>

                  <TextInput
                    name="phaseName"
                    label="Phase Name"
                    type="string"
                    placeholder="Phase Name"
                    required={false}
                    value={phase.name}
                    onChange={(value: string) =>
                      setPhases((prev) =>
                        prev.map((p, idx) =>
                          idx === i ? { ...p, name: value } : p
                        )
                      )
                    }
                  />

                  <TextAreaInput
                    name="description"
                    label="Description"
                    placeholder="Enter description"
                    required={false}
                    value={phase.description}
                    onChange={(value: string) =>
                      setPhases((prev) =>
                        prev.map((p, idx) =>
                          idx === i ? { ...p, description: value } : p
                        )
                      )
                    }
                  />

                  <div className="d-f gap-1">
                    <TextInput
                      name="from"
                      label="Start Date"
                      placeholder="Pick a date"
                      type="date"
                      value={phase.from}
                      required={false}
                      onChange={(value: string) =>
                        setPhases((prev) =>
                          prev.map((p, idx) =>
                            idx === i ? { ...p, from: value } : p
                          )
                        )
                      }
                    />
                    <TextInput
                      name="to"
                      label="End Date"
                      placeholder="Pick a date"
                      type="date"
                      value={phase.to}
                      required={false}
                      onChange={(value: string) =>
                        setPhases((prev) =>
                          prev.map((p, idx) =>
                            idx === i ? { ...p, to: value } : p
                          )
                        )
                      }
                    />
                  </div>

                  {phase.from &&
                    phase.to &&
                    dayjs(phase.from).isAfter(dayjs(phase.to)) && (
                      <p style={{ color: "red", fontSize: "0.85rem" }}>
                        Start date must be before end date
                      </p>
                    )}

                  <div className="d-f align-center justify-between">
                    <label className="d-f align-center pointer">
                      <input
                        className="pointer"
                        type="checkbox"
                        checked={phase.completed}
                        onChange={(e) =>
                          setPhases((prev) =>
                            prev.map((p, idx) =>
                              idx === i
                                ? { ...p, completed: e.target.checked }
                                : p
                            )
                          )
                        }
                      />
                      Completed
                    </label>

                    <LibButton
                      label="Save"
                      onSubmit={() => console.log("Saving phase", phase)}
                      backgroundColor="#825beb"
                      hoverColor="#6c46d9"
                      padding="0"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={`${styles.buttons} d-f align-center justify-end`}>
              <LibButton
                label="Send Ticket"
                onSubmit={console.log}
                backgroundColor="#57417e"
                hoverColor="#49356a"
                padding="0 2.3rem"
              />
              <LibButton
                label="Request Meeting"
                onSubmit={console.log}
                backgroundColor="#825beb"
                hoverColor="#6c46d9"
                padding="0 20px"
              />
            </div>
          </div>
        )}
        {/* files view */}
        {selected === "files" && (
          <div className={`${styles.filesContainer} d-f f-dir-col`}>
            {phases.map((phase) => (
              <FileDrop
                key={phase.id}
                phaseId={phase.id}
                onFileChange={(file) =>
                  console.log("File selected for Phase", phase.id, file)
                }
                onUpload={(file) =>
                  console.log("Uploading for Phase", phase.id, file)
                }
                onRequest={(id) => console.log("Requesting file for Phase", id)}
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
                <div className={styles.dataValue}>Website Redesign</div>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Requested By</span>
                <div className={styles.dataValue}>John Doe</div>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Service</span>
                <div className={styles.dataValue}>UI/UX Design</div>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Deadline</span>
                <div className={styles.dataValue}>August 15, 2025</div>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Project Cost</span>
                <div className={styles.dataValue}>$3,500</div>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.dataLabel}>Attached File</span>
                <div className={styles.dataValue}>
                  <a href="#" className={styles.fileLink}>
                    proposal.pdf
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectConfiguration;

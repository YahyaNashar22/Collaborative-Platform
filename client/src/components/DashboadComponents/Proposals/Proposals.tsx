import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Proposals.module.css";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCheck } from "@fortawesome/free-solid-svg-icons";
import { downloadFile } from "../../../services/FileUpload";
import Window from "../../../libs/common/lib-window/Window";
import axiosInstance from "../../../Config/axiosInstence";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";

interface Proposal {
  _id: string;
  amount: string;
  description: string;
  estimatedDeadline: string[];
  requestId: string;
  providerId: { [key: string]: string };
  uploadedFile: string;
}

interface ProposalsType {
  data: Proposal[];
  onBack: () => void;
  isAdmin: boolean;
  onAcceptProposalByAdmin: (id: string[], requestId: string) => void;
  onAcceptProposalByClient: (id: string, requestId: string) => void;
}

const Proposals = ({
  data,
  onBack,
  isAdmin,
  onAcceptProposalByAdmin,
  onAcceptProposalByClient,
}: ProposalsType) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounceSearch(searchValue, 300);
  const [proposals, setProposals] = useState(data);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [confirmedIds, setConfirmedIds] = useState<string[]>([]);
  const [isConfirmSubmitWindow, setIsConfirmSubmitWindow] = useState(false);

  // reject popup state
  const [isRejectWindowOpen, setIsRejectWindowOpen] = useState(false);

  const [rejectData, setRejectData] = useState({
    email: "",
    title: "Your proposal has been rejected",
    description: "",
    proposalId: "",
    providerId: "",
    requestId: "",
  });
  const [isRejecting, setIsRejecting] = useState(false);

  const isExpanded = (id: string) => expandedIds.includes(id);
  // const shouldShowToggle = (desc: string) => desc.length > 100;

  const toggleDescription = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const toggleConfirm = (proposalId: string) => {
    if (isAdmin) {
      setConfirmedIds((prev) =>
        prev.includes(proposalId)
          ? prev.filter((id) => id !== proposalId)
          : [...prev, proposalId]
      );
    } else {
      setConfirmedIds((prev) =>
        prev.includes(proposalId) ? [] : [proposalId]
      );
    }
  };

  const openRejectWindow = (proposal: Proposal) => {
    setRejectData({
      email: proposal.providerId.email,
      title: "Your proposal has been rejected",
      description: "",
      proposalId: proposal._id,
      providerId: proposal.providerId._id,
      requestId: proposal.requestId,
    });
    setIsRejectWindowOpen(true);
  };

  const handleRejectSubmit = async () => {
    setIsRejecting(true);
    try {
      await axiosInstance.post("/requests/reject-proposal", {
        proposalId: rejectData.proposalId,
        email: rejectData.email,
        title: rejectData.title,
        description: rejectData.description,
        providerId: rejectData.proposalId,
        requestId: rejectData.requestId,
      });

      // remove from list
      setProposals((prev) =>
        prev.filter((p) => p._id !== rejectData.proposalId)
      );

      setIsRejectWindowOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error rejecting proposal");
    } finally {
      setIsRejecting(false);
    }
  };

  const emitAcceptedProposals = () => {
    if (confirmedIds.length === 0) return;

    if (isAdmin) {
      onAcceptProposalByAdmin(confirmedIds, data[0].requestId);
    } else {
      onAcceptProposalByClient(confirmedIds[0], data[0].requestId);
    }
  };

  const isConfirmed = (id: string) => confirmedIds.includes(id);

  const filteredData = proposals.filter((proposal) =>
    proposal.description
      .toLowerCase()
      .includes(debouncedSearchValue.toLowerCase())
  );

  return (
    <main className={`${styles.wrapper} w-100`}>
      <div className={`${styles.header} d-f justify-between`}>
        <TextInput
          placeholder="Search by description..."
          type="text"
          value={searchValue}
          name="search_proposals"
          required={false}
          hasIcon={true}
          onChange={handleSearch}
        />
      </div>

      <h4 className={styles.title}>
        Proposals{" "}
        <span style={{ color: "var(--light-grey)" }}>({data.length})</span>
      </h4>

      <div className={styles.content}>
        <div className={styles.gridWrapper}>
          <div className={styles.gridContainer}>
            <div
              className={`${styles.gridHeader} ${
                isAdmin ? styles.withProvider : styles.noProvider
              } d-f`}
            >
              {/* <h4>Title</h4> */}
              <h4>Description</h4>
              <h4>Deadline</h4>
              <h4>Amount</h4>
              <h4>File</h4>
              {isAdmin && <h4>Provider</h4>}

              <h4>Confirm</h4>
              {isAdmin && <h4>Reject</h4>}
            </div>

            {filteredData.map((proposal, idx) => {
              const confirmed = isConfirmed(proposal._id);
              return (
                <div
                  key={proposal._id ?? idx}
                  className={`${styles.gridRow} ${
                    confirmed ? styles.confirmedRow : ""
                  }  ${isAdmin ? styles.withProvider : styles.noProvider}`}
                >
                  <div className={`${styles.proposalInfo} d-f f-dir-col`}>
                    <p
                      title={proposal.description}
                      onClick={(e) => toggleDescription(e, proposal._id)}
                      className={`${
                        !isExpanded(proposal._id)
                          ? styles.ellipsis
                          : styles.expanded
                      } ${styles.cell}`}
                    >
                      {proposal.description || "—"}
                    </p>
                  </div>

                  <p className={styles.cell}>
                    {proposal.estimatedDeadline?.[0]?.split("T")[0] ?? "N/A"}
                  </p>

                  <p className={styles.cell}>{proposal.amount || "—"} $</p>

                  <p className={styles.cell}>
                    {proposal.uploadedFile ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(proposal.uploadedFile);
                        }}
                        className={styles.downloadLink}
                        title="Download file"
                        type="button"
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    ) : (
                      "—"
                    )}
                  </p>

                  {isAdmin && (
                    <p className={styles.cell}>
                      {proposal.providerId ? (
                        <>
                          {proposal.providerId.firstName}{" "}
                          {proposal.providerId.lastName}
                          <br />
                          <small>({proposal.providerId.email})</small>
                        </>
                      ) : (
                        "—"
                      )}
                    </p>
                  )}

                  <div className={`${styles.cell} d-f align-center`}>
                    <button
                      className={`${styles.confirmToggle} ${
                        confirmed ? styles.confirmedToggle : ""
                      }`}
                      onClick={() => toggleConfirm(proposal._id)}
                      type="button"
                    >
                      {confirmed ? (
                        <>
                          <FontAwesomeIcon icon={faCheck} />
                          <span>Confirmed</span>
                        </>
                      ) : (
                        <span>Confirm</span>
                      )}
                    </button>
                  </div>

                  {isAdmin && (
                    <div className={`${styles.cell} d-f align-center`}>
                      <button
                        className={styles.confirmToggle}
                        onClick={() => openRejectWindow(proposal)}
                        type="button"
                      >
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="d-f gap-05 justify-end">
            <LibButton
              label="Back"
              onSubmit={onBack}
              backgroundColor="#57417e"
              hoverColor="#49356a"
              padding="0 20px"
            />
            <LibButton
              label={`Submit (${confirmedIds.length})`}
              onSubmit={() => setIsConfirmSubmitWindow(true)}
              backgroundColor="#4CAF50"
              hoverColor="#3e9d3e"
              padding="0 20px"
              disabled={confirmedIds.length === 0}
            />
          </div>
        </div>
      </div>

      {/* Reject Proposal Window */}
      {isRejectWindowOpen && (
        <Window
          title="Reject Proposal"
          visible={isRejectWindowOpen}
          onClose={() => setIsRejectWindowOpen(false)}
          isErrorWindow="true"
        >
          <div className="d-f f-dir-col gap-1">
            <TextAreaInput
              label="Message"
              placeholder="Explain briefly why the proposal was rejected..."
              name="description"
              required={true}
              value={rejectData.description}
              onChange={(value) =>
                setRejectData((prev) => ({ ...prev, description: value }))
              }
            />
          </div>

          <div
            className="d-f align-center justify-between"
            style={{ marginTop: "1rem" }}
          >
            <LibButton
              label="Cancel"
              onSubmit={() => setIsRejectWindowOpen(false)}
              bold={true}
              padding="0"
              outlined
              color="var(--deep-purple)"
              hoverColor="#8563c326"
              disabled={isRejecting}
            />
            <LibButton
              label="Send"
              onSubmit={handleRejectSubmit}
              bold={true}
              padding="0"
              disabled={isRejecting}
            />
          </div>
        </Window>
      )}

      {isConfirmSubmitWindow && (
        <Window
          title="Confirm Submission"
          visible={isConfirmSubmitWindow}
          onClose={() => setIsConfirmSubmitWindow(false)}
          isErrorWindow="true"
        >
          <small>
            Once confirmed, proposals cannot be changed. Are you sure you want
            to proceed?
          </small>
          <div
            className="d-f align-center justify-between"
            style={{ marginTop: "1rem" }}
          >
            <LibButton
              label="Cancel"
              onSubmit={() => setIsConfirmSubmitWindow(false)}
              bold={true}
              padding="0"
              outlined
              color="var(--deep-purple)"
              hoverColor="#8563c326"
            />
            <LibButton
              label="Confirm"
              onSubmit={() => {
                setIsConfirmSubmitWindow(false);
                emitAcceptedProposals();
              }}
              bold={true}
              padding="0"
            />
          </div>
        </Window>
      )}
    </main>
  );
};

export default Proposals;

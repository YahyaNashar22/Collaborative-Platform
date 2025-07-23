import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Proposals.module.css";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faCheck } from "@fortawesome/free-solid-svg-icons";
import { downloadFile } from "../../../services/FileUpload";

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
  const [proposals] = useState(data);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [confirmedIds, setConfirmedIds] = useState<string[]>([]);

  const isExpanded = (id: string) => expandedIds.includes(id);
  const shouldShowToggle = (desc: string) => desc.length > 100;

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
            <div className={`${styles.gridHeader} d-f`}>
              <h4>Description</h4>
              <h4>Deadline</h4>
              <h4>Amount</h4>
              <h4>File</h4>
              {isAdmin && <h4>Provider</h4>}

              <h4>Confirm</h4>
            </div>

            {filteredData.map((proposal, idx) => {
              const confirmed = isConfirmed(proposal._id);
              return (
                <div
                  key={proposal._id ?? idx}
                  className={`${styles.gridRow} ${
                    confirmed ? styles.confirmedRow : ""
                  }`}
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
                    {shouldShowToggle(proposal.description) && (
                      <span
                        onClick={(e) => toggleDescription(e, proposal._id)}
                        className={`${styles.toggleText} bold pointer`}
                      >
                        {isExpanded(proposal._id) ? "Show less" : "Show more"}
                      </span>
                    )}
                  </div>

                  <p className={styles.cell}>
                    {proposal.estimatedDeadline?.[0] ?? "N/A"}
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
                      proposal.providerId ? (
                      <>
                        {proposal.providerId.firstName}{" "}
                        {proposal.providerId.lastName}
                        <br />
                        <small>({proposal.providerId.email})</small>
                      </>
                      ) : ( "—" )
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
              onSubmit={emitAcceptedProposals}
              backgroundColor="#4CAF50"
              hoverColor="#3e9d3e"
              padding="0 20px"
              disabled={confirmedIds.length === 0}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Proposals;

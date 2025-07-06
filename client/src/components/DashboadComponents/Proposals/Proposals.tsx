import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Proposals.module.css";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";

import itachi from "../../../assets/images/itachi-uchiha-naruto-amoled-black-background-5k-5800x3197-4962.png";
import ProposalTable from "./ProposalTable/ProposalTable";
import { Proposal } from "../../../interfaces/Proposal";
import Window from "../../../libs/common/lib-window/Window";
import FileInput from "../../../libs/common/lib-file-input/FileInput";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";

interface proposalFormType {
  estimatedDeadline: string;
  amount: number;
  file: File;
  description: string;
}

const Proposals = () => {
  const mockData: Proposal[] = [
    {
      id: "1",
      image: itachi,
      title: "Design Landing Page",
      description:
        "Create a clean, modern landing page for a new SaaS product.",
      deadline: "2025-07-15",
      status: "Pending",
      price: "250$",
      isConfirmed: false,
    },
    {
      id: "2",
      image: itachi,
      title: "Develop Blog API",
      description: "Build RESTful API for a blogging platform with Node.js.",
      deadline: "2025-07-10",
      status: "In Progress",
      price: "500$",
      isConfirmed: true,
    },
    {
      id: "3",
      image: itachi,
      title: "Create Mobile Wireframes",
      description: "Design UX wireframes for a mobile app in Figma.",
      deadline: "2025-07-20",
      status: "Completed",
      price: "300$",
      isConfirmed: true,
    },
    {
      id: "4",
      image: itachi,
      title: "Test Payment Gateway",
      description: "Write integration and E2E tests for Stripe payment flow.",
      deadline: "2025-07-08",
      status: "Pending",
      price: "150$",
      isConfirmed: false,
    },
  ];

  const [onWindowOpen, setOnWindowOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounceSearch(searchValue, 300);
  const [proposals, setProposals] = useState<Proposal[]>(mockData);
  const [proposalForm, setProposalForm] = useState<proposalFormType>({
    estimatedDeadline: "",
    amount: 0,
    file: new File([], ""),
    description: "",
  });
  const [hasError, setHasError] = useState(false);

  const filteredData: Proposal[] = proposals.filter(
    (data) =>
      data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
      data.description
        .toLowerCase()
        .includes(debouncedSearchValue.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleCardClick = (id: string) => {
    console.log("Card clicked with id:", id);
  };

  const handleConfirmationClick = (id: string) => {
    setProposals((prev) =>
      prev.map((proposal) =>
        proposal.id === id
          ? { ...proposal, isConfirmed: !proposal.isConfirmed }
          : proposal
      )
    );
  };

  const handleAddRequest = () => {
    setHasError(false);
    setProposalForm({
      estimatedDeadline: "",
      amount: 0,
      file: new File([], ""),
      description: "",
    });
    setOnWindowOpen(true);
  };

  const handleSubmitProposal = () => {
    if (proposalForm.amount <= 0) {
      setHasError(true);
      return;
    }
    console.log(proposalForm);
    setOnWindowOpen(false);
  };

  return (
    <>
      <main className={`${styles.wrapper} w-100`}>
        <div className={`${styles.header} d-f justify-between`}>
          <TextInput
            placeholder="Search"
            type="text"
            value={searchValue}
            name="search_projects"
            required={false}
            hasIcon={true}
            onChange={handleSearch}
          />
          <LibButton
            label="+ Add New"
            onSubmit={handleAddRequest}
            backgroundColor="transparent"
            color="#6550b4"
            bold={true}
            hoverColor="#563db11c"
          />
        </div>
        <div className={styles.content}>
          <ProposalTable
            data={filteredData}
            onRowClick={(id: string) => handleCardClick(id)}
            onConfirmationClick={(id: string) => handleConfirmationClick(id)}
          />
        </div>
      </main>
      <Window
        visible={onWindowOpen}
        onClose={() => setOnWindowOpen(false)}
        size="large"
        title="Add New Proposal"
      >
        <form>
          <div className="d-f" style={{ gap: "1rem" }}>
            <TextInput
              name="estimatedDeadline"
              label="Estimated deadline"
              type="string"
              placeholder="Ex: 3 weeks, 1 month ..."
              required={false}
              value={proposalForm["estimatedDeadline"]}
              onChange={(value: string) =>
                setProposalForm((prev) => ({
                  ...prev,
                  estimatedDeadline: value,
                }))
              }
            />
            <TextInput
              name="amount"
              min={0}
              max={999999}
              label="Amount"
              type="number"
              placeholder="Amount"
              required={true}
              value={proposalForm["amount"].toString()}
              onChange={(value: string) => {
                setHasError(false);
                setProposalForm((prev) => ({
                  ...prev,
                  amount: Number(value),
                }));
              }}
              errorMessage={hasError ? "* This field is required" : ""}
            />
          </div>
          <FileInput
            name="file"
            label="Attach your file"
            placeholder="Attach your file"
            required={false}
            value={proposalForm["file"]}
            onChange={(file: File) =>
              setProposalForm((prev) => ({
                ...prev,
                file: file,
              }))
            }
          />

          <TextAreaInput
            name="description"
            label="Description"
            placeholder="Enter description"
            required={false}
            value={proposalForm["description"]}
            onChange={(value: string) =>
              setProposalForm((prev) => ({
                ...prev,
                description: value,
              }))
            }
          />
        </form>
        <div className={styles.btn}>
          <LibButton label="Submit" onSubmit={handleSubmitProposal} />
        </div>
      </Window>
    </>
  );
};

export default Proposals;

import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Proposals.module.css";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";

import itachi from "../../../assets/images/itachi-uchiha-naruto-amoled-black-background-5k-5800x3197-4962.png";
import ProposalTable from "./ProposalTable/ProposalTable";
import { Proposal } from "../../../interfaces/Proposal";

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
    {
      id: "5",
      image: itachi,
      title: "Optimize SEO",
      description: "Improve SEO performance across all product pages.",
      deadline: "2025-07-18",
      status: "In Progress",
      price: "400$",
      isConfirmed: false,
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounceSearch(searchValue, 300);
  const [proposals, setProposals] = useState<Proposal[]>(mockData);

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
    console.log("Add New Proposal clicked");
  };

  return (
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
  );
};

export default Proposals;

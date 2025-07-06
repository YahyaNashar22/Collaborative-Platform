import { useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Requests.module.css";
import Cards from "../Cards/Cards";
import useDebounceSearch from "../../../hooks/useDebounceSearch";
import LibButton from "../../../libs/common/lib-button/LibButton";
import RequestForm from "./RequestForm/RequestForm";
import Proposals from "../Proposals/Proposals";

type FormField = {
  label: string;
  type: string;
  placeholder: string;
  name: FormFieldName;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  hasCurrency?: boolean;
  errorMessage?: string;
};

type ViewState = "LIST" | "CREATE" | "SELECT";

type FormFieldName =
  | "requestTitle"
  | "serviceName"
  | "description"
  | "document"
  | "offerDeadline"
  | "projectDeadline"
  | "budget";

type Project = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  offerDeadline: string;
  onClick: (id: string) => void;
};

const Requests = () => {
  const mockData: Project[] = [
    {
      id: "1",
      title: "Design a Landing Page",
      description: "Need a clean and modern landing page for a SaaS product.",
      deadline: "July 20, 2025",
      offerDeadline: "July 15, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "2",
      title: "Develop Mobile App",
      description: "Build a cross-platform mobile app with React Native.",
      deadline: "August 10, 2025",
      offerDeadline: "August 1, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "3",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve SEO rankings for an e-commerce website.",
      deadline: "July 30, 2025",
      offerDeadline: "July 25, 2025",
      onClick: (id: string) => console.log("Clicked ID:", id),
    },
  ];

  const FormData: FormField[] = [
    {
      label: "Request Title",
      type: "text",
      placeholder: "Request Title",
      name: "requestTitle",

      required: true,
      maxLength: 100,
      minLength: 3,
    },
    {
      label: "Service Name",
      type: "select",
      placeholder: "Service Name",
      name: "serviceName",

      required: true,
      maxLength: 50,
      minLength: 0,
    },
    {
      label: "Description",
      type: "textarea",
      placeholder: "Description",
      name: "description",

      required: false,
      maxLength: 1000,
      minLength: 10,
    },
    {
      label: "Attach document",
      type: "file",
      placeholder: "Attach document",
      name: "document",

      required: false,
    },
    {
      label: "Deadline for receiving offers",
      type: "date",
      placeholder: "Deadline for receiving offers",
      name: "offerDeadline",

      required: true,
    },
    {
      label: "Deadline for the project",
      type: "date",
      placeholder: "Deadline for the project",
      name: "projectDeadline",

      required: true,
    },
    {
      label: "Est Budget",
      type: "string",
      placeholder: "Est Budget",
      name: "budget",

      required: true,
      maxLength: 20,
      minLength: 1,

      hasCurrency: true,
    },
  ];
  const [view, setView] = useState<ViewState>("LIST");
  const [searchValue, setSearchValue] = useState("");
  const [step, setStep] = useState(0);
  const [requestStep, setRequestStep] = useState(0);
  const debouncedSearchValue = useDebounceSearch(searchValue, 300);

  const filteredData = mockData.filter(
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
    setView("SELECT");
  };

  const handleCreateRequest = (data: FormFieldName) => {
    console.log("Form submitted with:", data);
    setView("LIST");
  };

  const handleSubmit = () => {};

  return (
    <main className={`${styles.wrapper} w-100`}>
      {view === "LIST" && (
        <>
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
              onSubmit={() => setView("CREATE")}
              backgroundColor="transparent"
              color="#6550b4"
              bold={true}
              hoverColor="#563db11c"
            />
          </div>
          <div className={styles.content}>
            <Cards data={filteredData} onCardClick={handleCardClick} />
          </div>
        </>
      )}

      {view === "CREATE" && (
        <RequestForm
          data={FormData}
          moveBackward={() => setView("LIST")}
          onSubmit={handleCreateRequest}
        />
      )}

      {view === "SELECT" && (
        <div className={styles.selectWrapper}>
          <Proposals />
          <div className={`${styles.buttons} d-f align-center justify-end`}>
            <LibButton
              label="Back"
              onSubmit={() => setView("LIST")}
              backgroundColor="#57417e"
              hoverColor="#49356a"
              padding="0 20px"
            />
            <LibButton
              label="Submit"
              onSubmit={handleSubmit}
              backgroundColor="#825beb"
              hoverColor="#6c46d9"
              padding="0 20px"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Requests;

import { useState } from "react";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import styles from "./ServiceForm.module.css";

interface ServiceFormProps {
  onBack: () => void;
  error: string;
  emitCreateService: (serviceData: { [key: string]: string }) => void;
}

const ServiceForm = ({
  onBack,
  emitCreateService,
  error,
}: ServiceFormProps) => {
  const [requestForm, setRequestForm] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  const handleCreateService = () => {
    emitCreateService(requestForm);
    setRequestForm({ name: "", description: "" });
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Create New Service</h1>
      </div>
      <form>
        <TextInput
          name="name"
          label="Title"
          type="string"
          placeholder="Enter title"
          required={false}
          value={requestForm["name"]}
          onChange={(value: string) =>
            setRequestForm((prev) => ({
              ...prev,
              name: value,
            }))
          }
        />
        <TextAreaInput
          name="description"
          label="Description"
          placeholder="Enter description"
          required={false}
          value={requestForm["description"]}
          onChange={(value: string) =>
            setRequestForm((prev) => ({
              ...prev,
              description: value,
            }))
          }
        />
      </form>
      {error && (
        <small className="errorMsg d-f align-center error">{error}</small>
      )}
      <div className={`${styles.buttons} d-f align-center justify-end`}>
        <LibButton
          label="Back"
          onSubmit={onBack}
          backgroundColor="#57417e"
          hoverColor="#49356a"
          padding="0 20px"
        />
        <LibButton
          label="Submit"
          onSubmit={handleCreateService}
          backgroundColor="#825beb"
          hoverColor="#6c46d9"
          padding="0 20px"
        />
      </div>
    </>
  );
};

export default ServiceForm;

import { useState } from "react";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../../../libs/common/lib-textArea/TextAreaInput";
import styles from "./ServiceForm.module.css";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const [requestForm, setRequestForm] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });
  const [formError, setFormError] = useState("");

  const handleCreateService = () => {
    if (!requestForm.name.trim() || !requestForm.description.trim()) {
      setFormError(t("This field is required."));
      return;
    }
    setFormError("");
    emitCreateService(requestForm);
    setRequestForm({ name: "", description: "" });
  };

  return (
    <>
      <div className={styles.header}>
        <h1>{t("Create New Service")}</h1>
      </div>
      <form>
        <TextInput
          name="name"
          label={t("Title")}
          type="string"
          placeholder={t("Enter title")}
          required={true}
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
          label={t("Description")}
          placeholder={t("Enter description")}
          required={true}
          value={requestForm["description"]}
          onChange={(value: string) =>
            setRequestForm((prev) => ({
              ...prev,
              description: value,
            }))
          }
        />
      </form>
      {(error || formError) && (
        <small className="errorMsg d-f align-center error">
          {error || formError}
        </small>
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

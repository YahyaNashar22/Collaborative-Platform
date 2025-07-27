import { useState } from "react";
import LibButton from "../../libs/common/lib-button/LibButton";
import FileInput from "../../libs/common/lib-file-input/FileInput";
import TextInput from "../../libs/common/lib-text-input/TextInput";
import TextAreaInput from "../../libs/common/lib-textArea/TextAreaInput";
import styles from "./CreateProposal.module.css";
import { proposalFormType } from "../../interfaces/Proposal";

interface CreateProposalType {
  requestIndentifier: string;
  createProposalError: string;
  requestBudget: number | null;
  onCreateProposal: (proposalForm: proposalFormType) => void;
  onBack: () => void;
}

const CreateProposal = ({
  onCreateProposal,
  requestIndentifier,
  createProposalError,
  requestBudget,
  onBack,
}: CreateProposalType) => {
  const [proposalForm, setProposalForm] = useState<proposalFormType>({
    estimatedDeadline: "",
    amount: 0,
    file: new File([], ""),
    description: "",
  });
  const [formErrors, setFormErrors] = useState<{
    amount?: string;
    estimatedDeadline?: string;
  }>({});

  const handleSubmitProposal = () => {
    const errors: { amount?: string; estimatedDeadline?: string } = {};

    if (proposalForm.amount < (requestBudget || 0)) {
      errors.amount = `* Amount should be greater than ${requestBudget}$`;
    }

    const deadlineDate = new Date(proposalForm.estimatedDeadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadlineDate < today) {
      errors.estimatedDeadline = "* Deadline cannot be in the past.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // No errors
    setFormErrors({});
    console.log(proposalForm);
    onCreateProposal(proposalForm);
    resetStates();
  };

  const resetStates = () => {
    setProposalForm({
      estimatedDeadline: "",
      amount: 0,
      file: new File([], ""),
      description: "",
    });
    setFormErrors({});
  };

  const handelBack = () => {
    resetStates();
    onBack();
  };

  return (
    <div className={`${styles.wrapper} d-f f-dir-col gap-1`}>
      <div className={styles.header}>
        <h1>Create New proposal</h1>
        <p className={styles.placeholder}>{requestIndentifier}</p>
      </div>
      <form>
        <div className="d-f" style={{ gap: "1rem" }}>
          <TextInput
            name="estimatedDeadline"
            label="Estimated deadline"
            type="date"
            placeholder="Ex: 3 weeks, 1 month ..."
            required={false}
            value={proposalForm["estimatedDeadline"]}
            errorMessage={formErrors.estimatedDeadline || ""}
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
            value={proposalForm["amount"].toString()}
            onChange={(value: string) => {
              setFormErrors((prev) => ({ ...prev, amount: undefined }));
              setProposalForm((prev) => ({
                ...prev,
                amount: Number(value) || 0,
              }));
            }}
            required={false}
            errorMessage={formErrors.amount || ""}
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
      {createProposalError && (
        <small className="errorMsg d-f align-center error">
          {createProposalError}
        </small>
      )}
      <div
        className={`${styles.btnsContainer} d-f align-center justify-between`}
      >
        <LibButton
          label="Back"
          onSubmit={handelBack}
          backgroundColor="#57417e"
          hoverColor="#49356a"
        />
        <LibButton label="Submit" onSubmit={handleSubmitProposal} />
      </div>
    </div>
  );
};

export default CreateProposal;

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
  onCreateProposal: (proposalForm: proposalFormType) => void;
  onBack: () => void;
}

const CreateProposal = ({
  onCreateProposal,
  requestIndentifier,
  createProposalError,

  onBack,
}: CreateProposalType) => {
  const [proposalForm, setProposalForm] = useState<proposalFormType>({
    estimatedDeadline: "",
    amount: 0,
    file: new File([], ""),
    description: "",
  });
  const [hasError, setHasError] = useState(false);

  const handleSubmitProposal = () => {
    if (proposalForm.amount <= 0) {
      setHasError(true);
      return;
    }
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
    setHasError(false);
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

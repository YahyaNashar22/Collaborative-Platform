/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import TextInput from "../../../../libs/common/lib-text-input/TextInput";
import styles from "./SimpleFormView.module.css";
import LibButton from "../../../../libs/common/lib-button/LibButton";
import useFormStore from "../../../../store/FormsStore";

import { FormField, FormStepData } from "../../../../interfaces/registerSignup";
import { useStepFormHandlers } from "../../../../hooks/useStepFormHandlers";
import { getStringValue } from "../../../../utils/CastToString";
import { verifyEmailRegister } from "../../../../services/UserServices";
import { useState } from "react";
import Terms from "../../../MainPagesComponents/TermsComponents/Terms/Terms";
import { useTranslation } from "react-i18next";

type SimpleFormViewProps = {
  data: FormStepData;
  title: string;
  error?: string;
  moveForward: () => void;
};

const SimpleFormView = ({
  data,
  title,
  moveForward,
  error,
}: SimpleFormViewProps) => {
  const { t } = useTranslation();

  const { role, type } = useFormStore();
  const { fieldValues, errors, handleChange, handleBlur, validateStep } =
    useStepFormHandlers(role, type);

  const [localError, setLocalError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const handleShowTerms = () => {
    setShowTerms(true);
  };

  const onNext = async () => {
    const hasError = validateStep(data.form);

    if (Object.keys(hasError).length > 0) return;
    if (!agreedToTerms) {
      setOtpError(t("You must agree to the subscription terms."));
      return;
    }
    try {
      const result = await verifyEmailRegister(fieldValues.email as string);
      setLocalError("");
      setOtpError("");
      moveForward();
    } catch (error) {
      if ((error as any)?.response.data.exists) {
        setLocalError(t("Email already exists"));
      }
    }
  };

  return (
    <div className={`${styles.formContainer} d-f f-dir-col`}>
      <h1 className="purple">{title}</h1>
      <form className={`${styles.form} d-f f-dir-col `}>
        {/* Group First Name and Last Name */}
        <div className={`${styles.firstRow} d-f w-100`} style={{ gap: "20px" }}>
          {data.form.slice(0, 2).map((field: FormField, index: number) => (
            <div key={index}>
              <TextInput
                label={t(field.label)}
                type={field.type}
                placeholder={t(field.placeholder)}
                name={field.name}
                value={fieldValues[field.name] || ""}
                required={field.required || false}
                minLength={Number(field.minLength)}
                onChange={(value, name) =>
                  handleChange(name, value, field.required || false)
                }
                errorMessage={errors[field.name]}
                onBlur={() =>
                  handleBlur(
                    field.name,
                    getStringValue(fieldValues[field.name]),
                    field.required || false,
                    field.type,
                  )
                }
              />
            </div>
          ))}
        </div>

        {data.form.slice(2).map((field: FormField, index: number) => (
          <div key={index}>
            <TextInput
              label={t(field.label)}
              type={field.type}
              placeholder={t(field.placeholder)}
              name={field.name}
              value={fieldValues[field.name] || ""}
              required={field.required || false}
              minLength={Number(field.minLength)}
              onChange={(value, name) =>
                handleChange(name, value, field.required || false)
              }
              errorMessage={errors[field.name]}
              onBlur={() =>
                handleBlur(
                  field.name,
                  getStringValue(fieldValues[field.name]),
                  field.required || false,
                  field.type,
                )
              }
            />
          </div>
        ))}
      </form>
      {(error || localError) && (
        <small className="errorMsg d-f align-center error">
          {error || localError}
        </small>
      )}
      <div className={`${styles.buttons} d-f align-center justify-end`}>
        <div className={` ${styles.terms} d-f align-center w-100`}>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            className="pointer"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e.target.checked);
              setOtpError("");
            }}
          />
          <label htmlFor="terms" className="pointer">
            {t("I agree to the")}{" "}
            <span onClick={handleShowTerms} className="purple pointer bold">
              {t("Takatuf Subscription Agreement")}
            </span>
          </label>
        </div>

        <LibButton
          label={t("Next")}
          onSubmit={onNext}
          backgroundColor="#825beb"
          hoverColor=" #6c46d9"
          padding="0 20px"
        />
      </div>
      {otpError && <small className="d-b error">{otpError}</small>}

      {showTerms && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setShowTerms(false)}
            >
              ×
            </button>
            <Terms />
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleFormView;

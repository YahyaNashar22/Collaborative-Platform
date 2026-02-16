/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import styles from "./PersonalData.module.css";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { PersonalDataTabProps } from "../../../interfaces/Profile";
import { Validate } from "../../../utils/Validate";
import Window from "../../../libs/common/lib-window/Window";
import TextAreaInput from "../../../libs/common/lib-textArea/TextAreaInput";
import { toast } from "react-toastify";
import { sendEmail } from "../../../services/UserServices";
import { useUserContext } from "../../../context/UserContext";
import { useTranslation } from "react-i18next";

interface InputField {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
  minLength?: number;
  errorMsg: string;
}

const PersonalDataTab: React.FC<PersonalDataTabProps> = ({
  userData,
  onCancel,
  onSave,
  isViewer = false,
}) => {
  const { t } = useTranslation();

  const fields: InputField[] = [
    {
      name: "firstName",
      label: t("First Name"),

      placeholder: t("First Name"),
      type: "text",
      required: true,
      errorMsg: t("* This Field is Required"),
    },
    {
      name: "lastName",
      label: t("Last Name"),
      placeholder: t("Last Name"),
      type: "text",
      required: true,
      errorMsg: t("* This Field is Required"),
    },
    {
      name: "email",
      label: t("Email"),

      placeholder: t("Email"),
      type: "email",
      required: true,
      errorMsg: t("* This Field is Required"),
    },
    {
      name: "recoveryEmail",
      label: t("Recovery email"),
      placeholder: t("Recovery email"),
      type: "email",
      required: false,
      errorMsg: t("* This Field is Required"),
    },
    {
      name: "phone",
      label: t("Phone number"),
      placeholder: t("Phone number"),
      type: "text",
      required: true,
      errorMsg: t("* This Field is Required"),
    },
    {
      name: "job",
      label: t("Job title"),

      placeholder: t("Job title"),
      type: "text",
      required: false,
      errorMsg: t("* This Field is Required"),
    },
  ];

  const [updatedData, setUpdatedData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState({});
  const [sendEmailWindow, setSendEmailWindow] = useState<boolean>(false);
  const [emailData, setEmailData] = useState<{
    receiverEmail: string;
    title: string;
    description: string;
  }>({ receiverEmail: "", title: "", description: "" });
  const [error, setError] = useState<string | null>(null);
  const [sendEmailLoading, setSendEmailLoading] = useState<boolean>(false);
  const { setCurrentUserId } = useUserContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (Object.keys(errors).length === 0) onSave(updatedData);
  };

  const handleChange = (
    name: string,
    value: string,
    required: boolean,
    type: string,
  ) => {
    // If value hasn’t changed compared to original userData → remove from updates/errors
    if (value === (userData as any)[name]) {
      setUpdatedData((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
      return;
    }

    setUpdatedData((prev) => ({ ...prev, [name]: value }));

    let error = t(Validate(name, value, required, type));
    const email =
      name === "email" ? value : (updatedData?.email ?? userData.email);
    const recoveryEmail =
      name === "recoveryEmail"
        ? value
        : (updatedData?.recoveryEmail ?? userData.recoveryEmail);

    if (email && recoveryEmail && email === recoveryEmail) {
      error = t("Email and recovery email cannot be the same.");
    } else {
      // this condition specific when i set email === recovery than i go to recovery email and update it to be not equal email
      // i keep see error because the setErrors update based on the name for the currrent field
      // and in this case the error is by email not recovery
      // so always if the recovery and email not the same clear errors for both
      setErrors((prev) => {
        const newErrors: { [key: string]: string } = { ...prev };
        delete newErrors.email;
        delete newErrors.recoveryEmail;
        return newErrors;
      });
    }

    // Update errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) (newErrors as any)[name] = error;
      else delete (newErrors as any)[name];
      return newErrors;
    });
  };

  const handleSendEmail = async () => {
    setSendEmailLoading(true);
    if (emailData.title.trim() === "" || emailData.description.trim() === "") {
      setError(t("This field is required."));
      return;
    }

    try {
      const response = await sendEmail({
        receiverEmail: userData.email,
        title: emailData.title,
        description: emailData.description,
      });
      if (response.success) {
        toast.success(t("Email sent successfully!"));
        setError("");
        setSendEmailWindow(false);
      }
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || t("Error Occurred!"),
      );
    } finally {
      setSendEmailLoading(false);
    }
  };

  return (
    <>
      <div className={styles.personalData}>
        {/* Profile Picture Upload */}
        <div
          className={`${styles.background} ${isViewer ? styles.isViewer : ""}`}
          style={{
            backgroundImage:
              updatedData.profilePicture || userData.profilePicture
                ? `url(${
                    updatedData.profilePicture || userData.profilePicture
                  })`
                : "none",
          }}
        >
          <label
            className={`${styles.penHolder} d-f align-center justify-center`}
          >
            <input
              type="file"
              name="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleFileChange}
              disabled={isViewer}
            />
            {!isViewer && (
              <FontAwesomeIcon
                icon={faPen}
                size="2xs"
                className={styles.pen}
                style={{ color: "#ffffff" }}
              />
            )}
          </label>

          {(!updatedData.profilePicture ||
            updatedData.profilePicture === "default") &&
            (!userData.profilePicture ||
              userData.profilePicture === "default") &&
            userData.firstName &&
            userData.lastName && (
              <div className={styles.initials}>
                {`${userData.firstName[0].toUpperCase()}${userData.lastName[0].toUpperCase()}`}
              </div>
            )}
        </div>

        {/* Form Inputs */}
        <form className={`${styles.form} d-f f-dir-col`}>
          {Array.from(
            { length: Math.ceil(fields.length / 2) },
            (_, rowIndex) => {
              const rowFields = fields.slice(rowIndex * 2, rowIndex * 2 + 2);
              return (
                <div
                  key={rowIndex}
                  className="d-f w-100"
                  style={{ gap: "20px", marginBottom: "20px" }}
                >
                  {rowFields.map((field) => (
                    <div key={field.name} style={{ flex: 1 }}>
                      <TextInput
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={
                          updatedData[field.name] ??
                          (userData as any)[field.name] ??
                          ""
                        }
                        required={field.required}
                        minLength={field.minLength}
                        onChange={(value, name) =>
                          handleChange(
                            name,
                            value,
                            field.required || false,
                            field.type,
                          )
                        }
                        errorMessage={(errors as any)[field.name]}
                        disabled={isViewer}
                      />
                    </div>
                  ))}
                </div>
              );
            },
          )}
        </form>

        {!isViewer ? (
          <div
            className={`${styles.resetPasswordHolder} d-f align-center justify-between`}
          >
            <LibButton
              label="Cancel"
              onSubmit={onCancel}
              outlined
              color="var(--deep-purple)"
              hoverColor="#8563c326"
              padding="0"
            />
            <LibButton label="Save" onSubmit={handleSave} padding="0" />
          </div>
        ) : (
          <div className="d-f align-center justify-between">
            <LibButton
              label="Back"
              onSubmit={() => setCurrentUserId(null)}
              outlined
              color="var(--deep-purple)"
              hoverColor="#8563c326"
              padding="0"
            />
            <LibButton
              label="Send Email"
              onSubmit={() => {
                setEmailData({
                  receiverEmail: userData.email,
                  title: "",
                  description: "",
                });
                setSendEmailWindow(true);
              }}
              padding="0 10px"
            />
          </div>
        )}
      </div>

      <Window
        title={t("Send Email")}
        visible={sendEmailWindow && isViewer}
        onClose={() => setSendEmailWindow(false)}
      >
        <div className="d-f f-dir-col gap-1">
          <TextInput
            name="title"
            label={t("Title")}
            type="text"
            placeholder={t("Enter a title for the email")}
            value={emailData.title}
            required={true}
            onChange={(value: string) =>
              setEmailData((prev) => ({ ...prev, title: value }))
            }
            errorMessage={error as string}
          />
          <TextAreaInput
            name="description"
            label={t("Description")}
            placeholder={t("Enter description")}
            value={emailData.description}
            required={true}
            onChange={(value: string) =>
              setEmailData((prev) => ({ ...prev, description: value }))
            }
          />

          <div className="d-f align-center justify-between mt-1">
            <LibButton
              label="Cancel"
              onSubmit={() => {
                setError("");
                setSendEmailWindow(false);
              }}
              bold={true}
              padding="0"
              outlined
              color="var(--deep-purple)"
              hoverColor="#8563c326"
            />
            <LibButton
              label="Send"
              onSubmit={handleSendEmail}
              bold={true}
              disabled={sendEmailLoading}
            />
          </div>
        </div>
      </Window>
    </>
  );
};

export default PersonalDataTab;

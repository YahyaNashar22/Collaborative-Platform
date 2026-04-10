import { useState } from "react";
import styles from "./ResetPasswordBy.module.css";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { useTranslation } from "react-i18next";

interface ResetPasswordByProps {
  moveBackward: () => void;
  moveForward: (email: string) => void;
  userEmail: string;
  recoveryEmail: string;
}

const ResetPasswordBy = ({
  moveBackward,
  moveForward,
  userEmail,
  recoveryEmail: userRecoveryEmail,
}: ResetPasswordByProps) => {
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<"email" | "recovery">(
    userEmail ? "email" : "recovery",
  );

  const maskEmail = (email: string) => {
    if (!email || typeof email !== "string") return "";

    const [localPart, domain] = email.split("@");
    if (!localPart || !domain) return email;

    if (localPart.length <= 2) {
      return `${localPart}****@${domain}`;
    }

    const visibleChars = Math.min(2, Math.floor(localPart.length / 3));
    const maskedPart = "*".repeat(
      Math.max(4, localPart.length - visibleChars - 1),
    );

    return `${localPart.substring(
      0,
      visibleChars,
    )}${maskedPart}${localPart.slice(-1)}@${domain}`;
  };

  const handleNext = () => {
    const email =
      selectedOption === "email" ? userEmail : userRecoveryEmail || "";

    moveForward(email);
  };

  return (
    <>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="m7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className={styles.cardTitle}>{t("Reset Password")}</h2>
        <p className={styles.cardSubtitle}>
          {t("Choose how you'd like to reset your password")}
        </p>
      </div>

      <div className={styles.resetForm}>
        <div className={styles.optionsContainer}>
          <div className={styles.radioGroup}>
            <div
              className={`${styles.radioOption} ${
                selectedOption === "email" ? styles.selected : ""
              } ${!userEmail ? styles.disabled : ""}`}
              onClick={() => userEmail && setSelectedOption("email")}
            >
              <input
                type="radio"
                id="email"
                name="resetOption"
                value="email"
                checked={selectedOption === "email"}
                onChange={() => userEmail && setSelectedOption("email")}
                className={styles.radioInput}
                disabled={!userEmail}
              />
              <div className={styles.radioLabel}>
                <div
                  className={`${styles.radioIcon} ${
                    selectedOption === "email" ? styles.radioIconSelected : ""
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className={styles.radioContent}>
                  <span className={styles.radioTitle}>
                    {t("Primary Email")}
                  </span>
                  <span className={styles.radioDesc}>
                    {userEmail
                      ? maskEmail(userEmail)
                      : t("No primary email available")}
                  </span>
                </div>
              </div>
              {!userEmail && (
                <div className={styles.unavailableBadge}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
              )}
            </div>

            <div
              className={`${styles.radioOption} ${
                selectedOption === "recovery" ? styles.selected : ""
              } ${!userRecoveryEmail ? styles.disabled : ""}`}
              onClick={() => userRecoveryEmail && setSelectedOption("recovery")}
            >
              <input
                type="radio"
                id="recovery"
                name="resetOption"
                value="recovery"
                checked={selectedOption === "recovery"}
                onChange={() =>
                  userRecoveryEmail && setSelectedOption("recovery")
                }
                className={styles.radioInput}
                disabled={!userRecoveryEmail}
              />
              <div className={styles.radioLabel}>
                <div
                  className={`${styles.radioIcon} ${
                    selectedOption === "recovery"
                      ? styles.radioIconSelected
                      : ""
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                    <circle cx="18" cy="8" r="3" />
                  </svg>
                </div>
                <div className={styles.radioContent}>
                  <span className={styles.radioTitle}>
                    {t("Recovery Email")}
                  </span>
                  <span className={styles.radioDesc}>
                    {userRecoveryEmail
                      ? maskEmail(userRecoveryEmail)
                      : t("No recovery email available")}
                  </span>
                </div>
              </div>
              {!userRecoveryEmail && (
                <div className={styles.unavailableBadge}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`${styles.buttons} d-f align-center justify-between`}>
          <LibButton
            label="Back"
            onSubmit={moveBackward}
            backgroundColor="#57417e"
            hoverColor="#49356a"
            padding="0 5px"
          />

          <LibButton
            label="Next"
            onSubmit={handleNext}
            backgroundColor="#825beb"
            hoverColor="#6c46d9"
            padding="0 5px"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPasswordBy;

// @ts-nocheck

import { useTranslation } from "react-i18next";
import { RequestData } from "../../../interfaces/FullRequests";
import { downloadFile } from "../../../services/FileUpload";
import Avatar from "../../../shared/Avatar/Avatar";
import styles from "./RequestsDetailsWindow.module.css";

type Props = {
  request: RequestData;
  isAdmin: boolean;
};

const RequestDetailsWindow = ({ request, isAdmin }: Props) => {
  const { t } = useTranslation();
  const service = request.serviceDetails?.[0];

  let client;
  if (isAdmin) client = request?.client[0];

  return (
    <div className={styles.scrollable}>
      {isAdmin && client && (
        <section className={styles.section}>
          <h3>{t("Client Information")}</h3>
          <div className={styles.clientInfo}>
            {client.profilePicture === "default" ? (
              <Avatar
                currentUser={{
                  firstName: client.firstName,
                  lastName: client.firstName,
                }}
              />
            ) : (
              <img
                src={`/images/profiles/${client.profilePicture}.png`}
                alt={`${client.firstName} ${client.lastName}`}
                className={styles.profilePic}
              />
            )}

            <div>
              <p>
                <strong>{t("Full Name:")}</strong> {client.firstName}{" "}
                {client.lastName}
              </p>
              <p>
                <strong>{t("Job:")}</strong> {client.job}
              </p>
              <p>
                <strong>{t("Phone:")}</strong> {client.phone}
              </p>
              <p>
                <strong>{t("Email:")}</strong> {client.email}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h3>{t("Request Info")}</h3>
        <p>
          <strong>{t("Title:")}</strong> {request.title}
        </p>
        <p>
          <strong>{t("Description:")}</strong> {request.description}
        </p>
        <p>
          <strong>{t("Project Deadline:")}</strong>{" "}
          {new Date(request.projectDeadline).toLocaleDateString()}
        </p>
        <p>
          <strong>{t("Offer Deadline:")}</strong>{" "}
          {new Date(request.offerDeadline).toLocaleDateString()}
        </p>
        <p>
          <strong>{t("Budget:")}</strong> ${request.budget}
        </p>
        <div>
          <p>
            <strong>{t("Request Files:")}</strong>
          </p>
          <ul>
            {request?.requestFiles?.length > 0 &&
              request.requestFiles.map((file, i) => (
                <li key={i} className={styles.uploadedItem}>
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>
                      {file.split(/[\\/]/).pop()}
                    </span>
                  </div>
                  <div
                    className={`${styles.downloadLink} pointer`}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFile(file);
                    }}
                  >
                    ⬇ {t("Download")}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h3>{t("Service Details")}</h3>

        <div key={service?._id ?? "missing-service"} className={styles.serviceItem}>
          <p>
            <strong>{t("Name:")}</strong> {service?.name || t("Service no longer available")}
          </p>
          <p>
            <strong>{t("Description:")}</strong>{" "}
            {service?.description || t("Service details are no longer available")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default RequestDetailsWindow;

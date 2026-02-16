// @ts-nocheck

import { useTranslation } from "react-i18next";
import { statusActions } from "../../../data/StatusMessage";
import { RequestData } from "../../../interfaces/FullRequests";
import { User } from "../../../interfaces/User";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Card from "../Card/Card";
import styles from "./Cards.module.css";

type CardsProps = {
  data: RequestData[];

  userData: User | null;
  onShowDetails: (id: string) => void;
  onShowProposals: (id: string) => void;
  onAssignRequest: (id: string) => void;
  onSubmitProposal: (id: string) => void;
  onCancelRequestByClient: (id: string) => void;
};

const Cards = ({
  data,
  userData,
  onShowDetails,
  onSubmitProposal,
  onShowProposals,
  onAssignRequest,
  onCancelRequestByClient,
}: CardsProps) => {

  const { t } = useTranslation();

  const getAction = (id: string, action: string) => {
    switch (action) {
      case "assignByAdmin":
        onAssignRequest(id);
        break;
      case "submitProposal":
        onSubmitProposal(id);
        break;
      case "showRequest":
        onShowDetails(id);
        break;
      case "seeOfferByAdmin":
        onShowProposals(id);
        break;
      case "seeOfferByClient":
        onShowProposals(id);
        break;
      case "cancelRequestByClient":
        onCancelRequestByClient(id);
        break;
    }
  };

  return (
    <div className={styles.cardsContainer}>
      {data.length === 0 ? (
        <div className={styles.emptyState}></div>
      ) : (
        data.map(
          ({
            _id: id,
            title,
            description,
            projectDeadline,
            stage,
            status: requestStatus,
            providerIds,
            approvedQuotations,
            offerDeadline,
            projectStartDate,
          }) => {
            const status = statusActions[stage]?.[userData?.role ?? ""] || {};
            const message = t(status.msg);
            const buttonLabel = t(status.button);
            const action = status.action;
            const secondButton = t(status.secondButton);
            const secondAction = status.secondAction;

            return (
              <Card
                key={id}
                name={title}
                description={description}
                projectDeadline={projectDeadline}
                stage={stage}
                requestStatus={requestStatus}
                offerDeadline={offerDeadline}
                projectStartDate={projectStartDate}
                role={userData?.role}
              >
                {stage === 4 && requestStatus === "canceled" ? (
                  <p className={styles.statusMessage}>
                    ❌ {t("This request has been")}{" "}
                    <strong style={{ color: "var(--error) " }}>{t("canceled")}</strong>
                  </p>
                ) : (
                  <p className={styles.statusMessage}>{message}</p>
                )}

                <div
                  className={`d-f ${
                    secondButton ? "justify-between" : "justify-end"
                  }`}
                >
                  {secondButton && (
                    <LibButton
                      styleClass={
                        secondAction === "cancelRequestByClient"
                          ? "outlinedErrorBtn"
                          : ""
                      }
                      label={secondButton}
                      onSubmit={() => getAction(id, secondAction)}
                      bold
                      color="#825beb"
                      hoverColor="#f3f0ff"
                      outlined
                      padding="0"
                    />
                  )}
                  {buttonLabel && (
                    <LibButton
                      label={buttonLabel}
                      onSubmit={() => getAction(id, action)}
                      bold
                      disabled={
                        (action === "submitProposal" &&
                          providerIds?.includes(userData?._id)) ||
                        (action === "seeOfferByAdmin" &&
                          approvedQuotations.length > 0)
                      }
                    />
                  )}
                </div>
              </Card>
            );
          },
        )
      )}
    </div>
  );
};

export default Cards;

import { statusActions } from "../../../data/StatusMessage";
import { RequestData } from "../../../interfaces/FullRequests";
import { User } from "../../../interfaces/User";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Card from "../Card/Card";
import styles from "./cards.module.css";

type CardsProps = {
  data: RequestData[];

  userData: User | null;
  onShowDetails: (id: string) => void;
  onShowProposals: (id: string) => void;
  onAssignRequest: (id: string) => void;
  onSubmitProposal: (id: string) => void;
};

const Cards = ({
  data,
  userData,
  onShowDetails,
  onSubmitProposal,
  onShowProposals,
  onAssignRequest,
}: CardsProps) => {
  const getAction = (id: string, action: string) => {
    console.log(id, action);
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
    }
  };

  return (
    <div className={styles.cardsContainer}>
      {data.map(
        ({
          _id: id,
          title,
          description,
          projectDeadline,
          stage,
          providerIds,
          approvedQuotations,
          offerDeadline,
        }) => {
          const status = statusActions[stage]?.[userData?.role ?? ""] || {};
          const message = status.msg;
          const buttonLabel = status.button;
          const action = status.action;
          const secondButton = status.secondButton;
          const secondAction = status.secondAction;

          return (
            <Card
              key={id}
              name={title}
              description={description}
              projectDeadline={projectDeadline}
              stage={stage}
              offerDeadline={offerDeadline}
              role={userData?.role}
            >
              <p className={styles.statusMessage}>{message}</p>
              <div
                className={`d-f ${
                  secondButton ? "justify-between" : "justify-end"
                }`}
              >
                {secondButton && (
                  <LibButton
                    label={secondButton}
                    onSubmit={() => getAction(id, secondAction)}
                    bold
                    color="#825beb"
                    hoverColor="#f3f0ff"
                    outlined
                  />
                )}
                {/* the first condition for the provider to check if he assign any offer before so the button will be disabled */}
                {/* the second conidition for the admin so when select proposal the button disabled */}
                {buttonLabel && (
                  <LibButton
                    label={buttonLabel}
                    onSubmit={() => getAction(id, action)}
                    bold
                    disabled={
                      (action === "submitProposal" &&
                        providerIds.includes(userData?._id)) ||
                      (action === "seeOfferByAdmin" &&
                        approvedQuotations.length > 0)
                    }
                  />
                )}
              </div>
            </Card>
          );
        }
      )}
    </div>
  );
};

export default Cards;

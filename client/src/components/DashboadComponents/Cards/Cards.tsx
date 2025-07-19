import { RequestData } from "../../../interfaces/FullRequests";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Card from "../Card/Card";
import styles from "./cards.module.css";

type CardsProps = {
  data: RequestData[];
  role: string | undefined;
  onCardClick: (id: string) => void;
  onShowDetails: (id: string) => void;
  onShowProposals: (id: string) => void;
  onAssignRequest: (id: string) => void;
};

const Cards = ({
  data,
  onCardClick,
  role,
  onShowDetails,
  onShowProposals,
  onAssignRequest,
}: CardsProps) => {
  return (
    <>
      <div className={styles.cardsContainer}>
        {data.map(
          ({
            _id,
            title,
            description,
            projectDeadline,
            stage,
            offerDeadline,
          }) => {
            let footerContent = null;

            if (role === "client") {
              footerContent = (
                <div className="d-f justify-between">
                  <LibButton
                    label="Request Details"
                    onSubmit={() => onShowDetails(_id)}
                    bold={true}
                    outlined
                    color="var(--deep-purple)"
                    hoverColor="#563db117"
                    styleClass="requestBtn"
                  />
                  <LibButton
                    label="Show Proposals"
                    onSubmit={() => onShowProposals(_id)}
                    bold={true}
                    disabled={stage !== 3}
                  />
                </div>
              );
            } else if (role === "admin") {
              footerContent = (
                <div className="d-f justify-between">
                  <LibButton
                    label="Request Details"
                    onSubmit={() => onShowDetails(_id)}
                    bold={true}
                    outlined
                    color="var(--deep-purple)"
                    hoverColor="#563db117"
                    styleClass="requestBtn"
                  />
                  <LibButton
                    label="Assign To"
                    onSubmit={() => onAssignRequest(_id)}
                    bold={true}
                  />
                </div>
              );
            }

            return (
              <div key={_id}>
                <Card
                  name={title}
                  description={description}
                  projectDeadline={projectDeadline}
                  stage={stage}
                  offerDeadline={offerDeadline}
                  onClick={() => onCardClick(_id)}
                >
                  {footerContent}
                </Card>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default Cards;

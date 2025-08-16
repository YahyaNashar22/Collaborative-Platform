import { Project } from "../../../interfaces/FullRequests";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Card from "../Card/Card";
import styles from "./ProjectCards.module.css";

type ProjectCardsProps = {
  data: Project[];
  userRole: string;
  onCardClick: (index: number) => void;
  onAddFeedback: (index: number) => void;
};

const ProjectCards = ({
  data,
  userRole,
  onCardClick,
  onAddFeedback,
}: ProjectCardsProps) => {
  data;
  return (
    <div className={styles.cardsContainer}>
      {data.length === 0 ? (
        <div className={styles.emptyState}></div>
      ) : (
        data.map(
          (
            {
              _id: id,
              title,
              description,
              projectDeadline,
              //   stages,
              status,
              isFeedbackSubmit,
              projectEstimatedDeadline,
            },
            index: number
          ) => {
            return (
              <Card
                key={id}
                name={title}
                description={description}
                projectDeadline={projectDeadline}
                projectStatus={status}
                // stage={stages[index]}
                projectEstimatedDeadline={projectEstimatedDeadline}
                // role={userData?.role}
              >
                <div
                  className={`d-f ${
                    userRole === "client" && status === "completed"
                      ? "justify-between"
                      : "justify-end"
                  }`}
                >
                  <LibButton
                    label="Configure"
                    onSubmit={() => onCardClick(index)}
                    bold
                  />

                  {userRole === "client" && status === "completed" && (
                    <LibButton
                      label="Add Feedback"
                      onSubmit={() => onAddFeedback(index)}
                      disabled={isFeedbackSubmit}
                      bold
                    />
                  )}
                </div>
              </Card>
            );
          }
        )
      )}
    </div>
  );
};

export default ProjectCards;

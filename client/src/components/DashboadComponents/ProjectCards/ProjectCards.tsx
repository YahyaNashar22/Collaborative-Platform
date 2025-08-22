import { useState } from "react";
import { Project } from "../../../interfaces/FullRequests";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Card from "../Card/Card";
import styles from "./ProjectCards.module.css";
import Window from "../../../libs/common/lib-window/Window";
import SatisfactionSurvey from "../Projects/SatisfactionSurvey/SatisfactionSurvey";
import { toast } from "react-toastify";
import { getSingleFeedback } from "../../../services/Feedback";
import { Feedback } from "../../../interfaces/Project";

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
  const [feedbackWindow, setFeedbackWindow] = useState<string | null>(null);
  const [feedbackData, setFeedbackData] = useState<Feedback | null>(null);

  const handlegetFeedback = async (id: string) => {
    setFeedbackWindow(id);

    try {
      const response = await getSingleFeedback(id);
      if (response) {
        setFeedbackData(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch feedback data");
    }
  };

  return (
    <>
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
                    className={`d-f  ${
                      (userRole === "client" && status === "completed") ||
                      (userRole === "admin" && isFeedbackSubmit)
                        ? "justify-between"
                        : "justify-end"
                    }`}
                  >
                    {userRole === "admin" && isFeedbackSubmit && (
                      <LibButton
                        label="See Feedback"
                        onSubmit={() => handlegetFeedback(id)}
                        bold={true}
                        padding="0 10px"
                        outlined
                        color="var(--deep-purple)"
                        hoverColor="#8563c326"
                      />
                    )}

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
      {feedbackWindow && feedbackData && (
        <Window
          size="large"
          title=" "
          visible={feedbackWindow !== null}
          onClose={() => setFeedbackWindow(null)}
        >
          <SatisfactionSurvey viewOnly={true} initialData={feedbackData} />
        </Window>
      )}
    </>
  );
};

export default ProjectCards;

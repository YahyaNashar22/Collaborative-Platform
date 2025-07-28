import { Project } from "../../../interfaces/FullRequests";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Card from "../Card/Card";
import styles from "./ProjectCards.module.css";

type ProjectCardsProps = {
  data: Project[];
  onCardClick: (index: number) => void;
};

const ProjectCards = ({ data, onCardClick }: ProjectCardsProps) => {
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
                <div className="d-f justify-end">
                  <LibButton
                    label={"Configure"}
                    onSubmit={() => onCardClick(index)}
                    bold
                  />
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

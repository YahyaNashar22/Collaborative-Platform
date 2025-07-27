import { ProjectData } from "../../../interfaces/FullRequests";
import LibButton from "../../../libs/common/lib-button/LibButton";
import Card from "../Card/Card";
import styles from "./ProjectCards.module.css";

type ProjectCardsProps = {
  data: ProjectData[];
  //   userData: User | null;
  onCardClick: (id: string) => void;
};

const ProjectCards = ({ data, onCardClick }: ProjectCardsProps) => {
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
            status,
            projectEstimatedDeadline,
          }) => {
            return (
              <Card
                key={id}
                name={title}
                description={description}
                projectDeadline={projectDeadline}
                projectStatus={status}
                stage={stage}
                projectEstimatedDeadline={projectEstimatedDeadline}
                // role={userData?.role}
              >
                <div className="d-f justify-end">
                  <LibButton
                    label={"Configure"}
                    onSubmit={() => onCardClick(id)}
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

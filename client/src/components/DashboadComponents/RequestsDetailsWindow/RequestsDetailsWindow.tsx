import { RequestData } from "../../../interfaces/FullRequests";
import Avatar from "../../../shared/Avatar/Avatar";
import styles from "./RequestsDetailsWindow.module.css";

type Props = {
  request: RequestData;
  isAdmin: boolean;
};

const RequestDetailsWindow = ({ request, isAdmin }: Props) => {
  let client;
  if (isAdmin) client = request?.client[0];

  return (
    <div className={styles.scrollable}>
      {isAdmin && client && (
        <section className={styles.section}>
          <h3>Client Information</h3>
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
                <strong>Full Name:</strong> {client.firstName} {client.lastName}
              </p>
              <p>
                <strong>Job:</strong> {client.job}
              </p>
              <p>
                <strong>Phone:</strong> {client.phone}
              </p>
              <p>
                <strong>Email:</strong> {client.email}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h3>Request Info</h3>
        <p>
          <strong>Title:</strong> {request.title}
        </p>
        <p>
          <strong>Description:</strong> {request.description}
        </p>
        <p>
          <strong>Project Deadline:</strong>{" "}
          {new Date(request.projectDeadline).toLocaleDateString()}
        </p>
        <p>
          <strong>Offer Deadline:</strong>{" "}
          {new Date(request.offerDeadline).toLocaleDateString()}
        </p>
        <p>
          <strong>Budget:</strong> ${request.budget}
        </p>
      </section>

      <section className={styles.section}>
        <h3>Service Details</h3>

        <div key={request.serviceDetails[0]._id} className={styles.serviceItem}>
          <p>
            <strong>Name:</strong> {request.serviceDetails[0].name}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {request.serviceDetails[0].description}
          </p>
        </div>
      </section>
    </div>
  );
};

export default RequestDetailsWindow;

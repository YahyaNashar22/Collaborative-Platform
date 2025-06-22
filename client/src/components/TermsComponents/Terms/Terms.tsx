import Menu from "../../../shared/Menu/Menu";
import styles from "./Terms.module.css";

const Terms = () => {
  const termsData: { label: string }[] = [
    { label: "Scope of Application" },
    { label: "Definitions" },
    { label: "Tax Obligations" },
    { label: "Account Creation and Platform Use" },
    { label: "Registration and Access" },
    { label: "Information Accuracy" },
    { label: "Notifications and Communication" },
    { label: "Client–Provider Interaction" },
  ];
  return (
    <div className={`${styles.wrapper} d-f `}>
      <div className={`${styles.left} d-f f-dir-col align-start`}>
        <h1 className="title">Terms and Conditions</h1>
        <p className="bold align-text">
          Takatuf Platform is a digital system specialized in offering digital
          brokerage services across various consultancy fields (such as finance,
          accounting, IT, design, marketing, and more). The platform is designed
          to facilitate the connection between clients and service providers
          through an integrated process that includes service requests,
          receiving quotes, and final approval between both parties. It also
          monitors service execution and ensures financial collection upon
          payment, acting as a mediator linking various parties (companies,
          offices, individuals both inside and outside the Kingdom) to meet the
          needs of clients from the private sector, public sector, or
          individuals.
        </p>
      </div>
      <div className="w-100">
        <Menu data={termsData} />
      </div>
    </div>
  );
};

export default Terms;

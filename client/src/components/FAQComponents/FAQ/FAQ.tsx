import Menu from "../../../shared/Menu/Menu";
import styles from "./FAQ.module.css";

const FAQ = () => {
  const termsData: { label: string }[] = [
    { label: "What industries do you specialize in?" },
    { label: "How do I find a consultant on your platform?" },
    { label: "Do you cater to international businesses?" },
    { label: "Are your consultancy services affordable?" },
    { label: "What often will results be reported?" },
    { label: "What types of consulting services do you offer?" },
  ];
  return (
    <div className={`${styles.wrapper} d-f `}>
      <div className={`${styles.left} d-f f-dir-col align-start`}>
        <h1 className="title">Frequently Asked Questions</h1>
        <a href="_blank" className="bold align-text purple pointer intense">
          View All FAQ
        </a>
      </div>
      <div className="w-100">
        <Menu data={termsData} />
      </div>
    </div>
  );
};

export default FAQ;

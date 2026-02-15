import { useTranslation } from "react-i18next";
import Menu from "../../../../shared/Menu/Menu";
import styles from "./FAQ.module.css";

const FAQ = () => {
  const { t } = useTranslation();

  const faqData: { label: string; content: string }[] = [
    {
      label: t("faq-1-q"),
      content: t("faq-1-a"),
    },
    {
      label: t("faq-2-q"),
      content: t("faq-2-a"),
    },
    {
      label: t("faq-3-q"),
      content: t("faq-3-a"),
    },
    {
      label: t("faq-4-q"),
      content: t("faq-4-a"),
    },
    {
      label: t("faq-5-q"),
      content: t("faq-5-a"),
    },
    {
      label: t("faq-6-q"),
      content: t("faq-6-a"),
    },
  ];
  return (
    <div className={`${styles.wrapper} d-f `}>
      <div className={`${styles.left} d-f f-dir-col align-start`}>
        <h1 className="title">{t("Frequently Asked Questions")}</h1>
      </div>
      <div className="w-100">
        <Menu data={faqData} />
      </div>
    </div>
  );
};

export default FAQ;

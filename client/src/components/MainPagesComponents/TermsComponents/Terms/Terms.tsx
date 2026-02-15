import { useTranslation } from "react-i18next";
import Menu from "../../../../shared/Menu/Menu";
import styles from "./Terms.module.css";

const Terms = () => {
  const { t } = useTranslation();

  const data: { label: string; content: string }[] = [
    {
      label: t("t-1-q"),
      content: t("t-1-a"),
    },
    {
      label: t("t-2-q"),
      content: t("t-2-a"),
    },
    {
      label: t("t-3-q"),
      content: t("t-3-a"),
    },
    {
      label: t("t-4-q"),
      content: t("t-4-a"),
    },
    {
      label: t("t-5-q"),
      content: t("t-5-a"),
    },
    {
      label: t("t-6-q"),
      content: t("t-6-a"),
    },
    {
      label: t("t-7-q"),
      content: t("t-7-a"),
    },
    {
      label: t("t-8-q"),
      content: t("t-8-a"),
    },
  ];
  return (
    <div className={`${styles.wrapper} d-f `}>
      <div className={`${styles.left} d-f f-dir-col align-start`}>
        <h1 className="title">{t("Terms and Conditions")}</h1>
        <p className="bold align-text">{t("terms-text")}</p>
      </div>
      <div className="w-100">
        <Menu data={data} />
      </div>
    </div>
  );
};

export default Terms;

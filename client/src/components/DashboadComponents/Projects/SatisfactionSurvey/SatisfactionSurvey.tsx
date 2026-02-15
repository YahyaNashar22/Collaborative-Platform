// @ts-nocheck

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import styles from "./SatisfactionSurvey.module.css";
import { Feedback } from "../../../../interfaces/Project";

type SatisfactionSurveyProps = {
  projectId?: string;
  userId?: string;
  onSubmit?: (formData: Feedback) => void;
  viewOnly?: boolean;
  initialData?: Partial<Feedback>;
};

const SatisfactionSurvey: React.FC<SatisfactionSurveyProps> = ({
  projectId,
  userId,
  onSubmit,
  viewOnly = false,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    projectId: projectId || "",
    userId: userId || "",
    satisfactionAsPartnerCCC: 1,
    professionalismOfTheCompany: 1,
    technicalSupport: 1,
    responsivenessToNeeds: 1,
    serviceQuality: 1,
    deliveryTime: 1,
    performanceOfProvider: 1,
    satisfactionWithProviderExpertise: 1,
    expertiseKnowledge: 1,
    addressedMyConcerns: 1,
    clearCommunication: 1,
    responsiveTimely: 1,
    insightsRecommendation: 1,
    HowStronglyRecommend: 1,
    comparedToCompetitors: 1,
    continueOurServices: 1,
    customMessage: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const satisfactionCriteria = [
    {
      key: "professionalismOfTheCompany",
      label: t("Professionalism of the company"),
    },
    { key: "technicalSupport", label: t("Technical support") },
    {
      key: "responsivenessToNeeds",
      label: t("Responsiveness to the questions and needs"),
    },
    { key: "serviceQuality", label: t("Service quality") },
    { key: "deliveryTime", label: t("Delivery time") },
    {
      key: "performanceOfProvider",
      label: t("Performance of the service provider"),
    },
  ];

  const providerCriteria = [
    {
      key: "expertiseKnowledge",
      label: t("Demonstrated a high level of expertise and knowledge"),
    },
    {
      key: "addressedMyConcerns",
      label: t("Effectively addressed my questions and concerns"),
    },
    {
      key: "clearCommunication",
      label: t("Communicated clearly and professionally"),
    },
    {
      key: "responsiveTimely",
      label: t("Was responsive and timely in their communication"),
    },
    {
      key: "insightsRecommendation",
      label: t(
        "Added value to our business through their insights and recommendations",
      ),
    },
  ];

  const additionalQuestions = [
    {
      key: "HowStronglyRecommend",
      label: t("I would recommend it to my friends or colleagues"),
    },
    {
      key: "comparedToCompetitors",
      label: t("Compared to the competitors, our services is"),
    },
    {
      key: "continueOurServices",
      label: t("How likely are you to continue to use our services"),
    },
  ];

  const satisfactionLevels = [
    { value: 1, label: t("Not Satisfied") },
    { value: 2, label: t("Somewhat Satisfied") },
    { value: 3, label: t("Satisfied") },
    { value: 4, label: t("Very Satisfied") },
    { value: 5, label: t("Not Applicable") },
  ];

  const handleRatingChange = (field, rating) => {
    if (viewOnly) return;
    setFormData((prev) => ({
      ...prev,
      [field]: rating,
    }));
  };

  const handleTableResponseChange = (criterion, value) => {
    if (viewOnly) return;
    setFormData((prev) => ({
      ...prev,
      [criterion]: value,
    }));
  };

  const handleTextChange = (e) => {
    if (viewOnly) return;
    setFormData((prev) => ({
      ...prev,
      customMessage: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (viewOnly) return;

    const requiredFields = [
      "satisfactionAsPartnerCCC",
      "professionalismOfTheCompany",
      "technicalSupport",
      "responsivenessToNeeds",
      "serviceQuality",
      "deliveryTime",
      "performanceOfProvider",
      "satisfactionWithProviderExpertise",
      "expertiseKnowledge",
      "addressedMyConcerns",
      "clearCommunication",
      "responsiveTimely",
      "insightsRecommendation",
      "HowStronglyRecommend",
      "comparedToCompetitors",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(t("Please complete all required fields before submitting."));
      return;
    }

    // Call onSubmit prop or default behavior
    if (onSubmit) {
      onSubmit(formData);
      alert(t("Feedback submitted successfully!"));
    }
  };

  const StarRating = ({ rating, setRating, question }) => (
    <div className={styles.starRatingSection}>
      <h3 className={styles.starRatingTitle}>{question}</h3>
      <div className={styles.starRatingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !viewOnly && setRating(star)} // Disable onClick in view-only mode
            className={`${styles.starButton} ${
              viewOnly ? styles.disabled : ""
            }`}
            type="button"
            disabled={viewOnly} // Disable button in view-only mode
            style={{ cursor: viewOnly ? "default" : "pointer" }}
          >
            <Star
              size={32}
              className={`${styles.starIcon} ${
                star <= rating ? styles.starFilled : styles.starEmpty
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  const SatisfactionTable = ({ criteria, title }) => (
    <div className={styles.tableSection}>
      <h3 className={styles.tableTitle}>{title}</h3>

      <div className={styles.tableContainer}>
        <table className={styles.satisfactionTable}>
          <thead>
            <tr>
              <th
                className={`${styles.tableHeader} ${styles.criteriaHeader} ${styles.firstCell}`}
              ></th>
              <th
                className={`${styles.tableHeader} ${styles.levelHeader} ${styles.notSatisfied}`}
              >
                {t("Not")}
                <br />
                {t("Satisfied")}
              </th>
              <th
                className={`${styles.tableHeader} ${styles.levelHeader} ${styles.somewhatSatisfied}`}
              >
                {t("Somewhat")}
                <br />
                {t("Satisfied")}
              </th>
              <th
                className={`${styles.tableHeader} ${styles.levelHeader} ${styles.satisfied}`}
              >
                {t("Satisfied")}
              </th>
              <th
                className={`${styles.tableHeader} ${styles.levelHeader} ${styles.verySatisfied}`}
              >
                {t("Very")}
                <br />
                {t("Satisfied")}
              </th>
              <th
                className={`${styles.tableHeader} ${styles.levelHeader} ${styles.notApplicable}`}
              >
                {t("Not")}
                <br />
                {t("Applicable")}
              </th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((criterion, index) => (
              <tr
                key={criterion.key}
                className={`${styles.tableRow} ${
                  index % 2 === 0 ? styles.rowEven : styles.rowOdd
                }`}
              >
                <td className={styles.criteriaCell}>{criterion.label}</td>
                {satisfactionLevels.map((level, levelIndex) => (
                  <td
                    key={`${criterion.key}-${levelIndex}`}
                    className={styles.responseCell}
                  >
                    <div className={styles.radioContainer}>
                      <input
                        type="radio"
                        name={criterion.key}
                        value={level.value}
                        checked={formData[criterion.key] === level.value}
                        onChange={() =>
                          !viewOnly &&
                          handleTableResponseChange(criterion.key, level.value)
                        }
                        className={styles.radioInput}
                        disabled={viewOnly} // Disable input in view-only mode
                        style={{ cursor: viewOnly ? "default" : "pointer" }}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div
      className={`${styles.satisfactionSurvey} ${
        viewOnly ? styles.viewOnly : ""
      }`}
    >
      <div className={styles.surveyContent}>
        {viewOnly && (
          <div className={styles.viewOnlyHeader}>
            <h2>{t("Survey Response - View Only")}</h2>
          </div>
        )}

        <StarRating
          rating={formData.satisfactionAsPartnerCCC}
          setRating={(rating) =>
            handleRatingChange("satisfactionAsPartnerCCC", rating)
          }
          question={t("Overall, How satisfied are you with Takatuf Platform as a consulting partner?")}
        />

        <SatisfactionTable
          criteria={satisfactionCriteria}
          title={t("Please rate how strongly you satisfied with each of the statements.")}
        />

        <StarRating
          rating={formData.satisfactionWithProviderExpertise}
          setRating={(rating) =>
            handleRatingChange("satisfactionWithProviderExpertise", rating)
          }
          question={t("Overall, How satisfied are you with the expertise and professionalism of the service provider assigned to your project?")}
        />

        <SatisfactionTable
          criteria={providerCriteria}
          title={t("Please rate the service provider on the following aspects:")}
        />

        <SatisfactionTable
          criteria={additionalQuestions}
          title={t("Additional feedback:")}
        />

        <div className={styles.textSection}>
          <h3 className={styles.textTitle}>
            {t("Do you want to add or suggest something?")}
          </h3>
          <textarea
            value={formData.customMessage}
            onChange={handleTextChange}
            placeholder={
              viewOnly
                ? ""
                : t("Please share any additional comments or suggestions...")
            }
            className={styles.textArea}
            rows={4}
            disabled={viewOnly}
            readOnly={viewOnly}
            style={{ cursor: viewOnly ? "default" : "text" }}
          />
        </div>

        {!viewOnly && (
          <div className={styles.submitSection}>
            <button
              onClick={handleSubmit}
              className={styles.submitButton}
              type="button"
            >
              {t("Submit Feedback")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SatisfactionSurvey;

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
      label: "Professionalism of the company",
    },
    { key: "technicalSupport", label: "Technical support" },
    {
      key: "responsivenessToNeeds",
      label: "Responsiveness to the questions and needs",
    },
    { key: "serviceQuality", label: "Service quality" },
    { key: "deliveryTime", label: "Delivery time" },
    {
      key: "performanceOfProvider",
      label: "Performance of the service provider",
    },
  ];

  const providerCriteria = [
    {
      key: "expertiseKnowledge",
      label: "Demonstrated a high level of expertise and knowledge",
    },
    {
      key: "addressedMyConcerns",
      label: "Effectively addressed my questions and concerns",
    },
    {
      key: "clearCommunication",
      label: "Communicated clearly and professionally",
    },
    {
      key: "responsiveTimely",
      label: "Was responsive and timely in their communication",
    },
    {
      key: "insightsRecommendation",
      label:
        "Added value to our business through their insights and recommendations",
    },
  ];

  const additionalQuestions = [
    {
      key: "HowStronglyRecommend",
      label: "I would recommend it to my friends or colleagues",
    },
    {
      key: "comparedToCompetitors",
      label: "Compared to the competitors, our services is",
    },
    {
      key: "continueOurServices",
      label: "How likely are you to continue to use our services",
    },
  ];

  const satisfactionLevels = [
    { value: 1, label: "Not Satisfied" },
    { value: 2, label: "Somewhat Satisfied" },
    { value: 3, label: "Satisfied" },
    { value: 4, label: "Very Satisfied" },
    { value: 5, label: "Not Applicable" },
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
      alert("Please complete all required fields before submitting.");
      return;
    }

    // Call onSubmit prop or default behavior
    if (onSubmit) {
      onSubmit(formData);
      alert("Feedback submitted successfully!");
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
                Not
                <br />
                Satisfied
              </th>
              <th
                className={`${styles.tableHeader} ${styles.levelHeader} ${styles.somewhatSatisfied}`}
              >
                Somewhat
                <br />
                Satisfied
              </th>
              <th
                className={`${styles.tableHeader} ${styles.levelHeader} ${styles.satisfied}`}
              >
                Satisfied
              </th>
              <th
                className={`${styles.tableHeader} ${styles.levelHeader} ${styles.verySatisfied}`}
              >
                Very
                <br />
                Satisfied
              </th>
              <th
                className={`${styles.tableHeader} ${styles.levelHeader} ${styles.notApplicable}`}
              >
                Not
                <br />
                Applicable
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
            <h2>Survey Response - View Only</h2>
          </div>
        )}

        <StarRating
          rating={formData.satisfactionAsPartnerCCC}
          setRating={(rating) =>
            handleRatingChange("satisfactionAsPartnerCCC", rating)
          }
          question="Overall, How satisfied are you with CCC as a consulting partner?"
        />

        <SatisfactionTable
          criteria={satisfactionCriteria}
          title="Please rate how strongly you satisfied with each of the statements."
        />

        <StarRating
          rating={formData.satisfactionWithProviderExpertise}
          setRating={(rating) =>
            handleRatingChange("satisfactionWithProviderExpertise", rating)
          }
          question="Overall, How satisfied are you with the expertise and professionalism of the service provider assigned to your project?"
        />

        <SatisfactionTable
          criteria={providerCriteria}
          title="Please rate the service provider on the following aspects:"
        />

        <SatisfactionTable
          criteria={additionalQuestions}
          title="Additional feedback:"
        />

        <div className={styles.textSection}>
          <h3 className={styles.textTitle}>
            Do you want to add or suggest something?
          </h3>
          <textarea
            value={formData.customMessage}
            onChange={handleTextChange}
            placeholder={
              viewOnly
                ? ""
                : "Please share any additional comments or suggestions..."
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
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SatisfactionSurvey;

import { useMemo, useState } from "react";
import styles from "./Profile.module.css";

import { useNavigate } from "react-router-dom";
import TagSelector from "../../shared/TagSelector/TagSelector";
import { Validate } from "../../utils/Validate";
import { updateProfileData } from "../../services/UserServices";
import SecurityData from "./SecurityData/SecurityData";
import PersonalDataTab from "./PersonalData/PersonalData";

interface PersonalInputs {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  role?: string;
}

const Profile = ({ userData }: { userData: { [key: string]: string } }) => {
  const tabs = useMemo(() => {
    const baseTabs = ["Personal Data", "Security Data"];
    if (userData.role === "provider") baseTabs.push("Services");
    return baseTabs;
  }, [userData.role]);

  const servicesOptions = useMemo(
    () => [
      { label: "Design", value: "Design" },
      { label: "Development", value: "Development" },
      { label: "Marketing", value: "Marketing" },
      { label: "SEO", value: "SEO" },
      { label: "Consulting", value: "Consulting" },
    ],
    []
  );

  const personalInputs: PersonalInputs[] = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "Phone Number",
      type: "text",
      required: true,
    },
  ];

  const [selectedTab, setSelectedTab] = useState("Personal Data");
  const [updateData, setUpdateData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userServices, setUserServices] = useState([
    { label: "Design", value: "Design" },
    { label: "Development", value: "Development" },
  ]);

  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleAddService = (value: string) => {
    const existing = userServices.find((s) => s.value === value);
    if (!existing) {
      const option = servicesOptions.find((opt) => opt.value === value);
      if (option) setUserServices((prev) => [...prev, option]);
    }
  };

  const handleRemoveService = (item: { label: string; value: string }) => {
    setUserServices((prev) => prev.filter((s) => s.value !== item.value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdateData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getChangedFields = (
    original: { [key: string]: string },
    updated: { [key: string]: string }
  ): { [key: string]: string } => {
    const changed: { [key: string]: string } = {};
    for (const key in updated) {
      if (updated[key] !== original[key]) changed[key] = updated[key];
    }
    return changed;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(updateData).forEach(([key, value]) => {
      const inputConfig = personalInputs.find((input) => input.name === key);
      if (!inputConfig) return;
      const error = Validate(
        key,
        value,
        inputConfig.required,
        inputConfig.type
      );
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (
    name: string,
    value: string,
    required: boolean,
    type: string
  ) => {
    if (value === userData[name]) {
      setUpdateData((prev) => {
        const newData = { ...prev };
        delete newData[name];
        return newData;
      });
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      return;
    }

    setUpdateData((prev) => ({ ...prev, [name]: value }));

    const error = Validate(name, value, required, type);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors[name] = error;
      else delete newErrors[name];
      return newErrors;
    });
  };

  const handleUpdateData = async () => {
    const payload = getChangedFields(userData, updateData);
    if (Object.keys(payload).length === 0) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await updateProfileData(userData._id, payload);
      navigate("/dashboard");
      setErrors({});
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navBar}>
        {tabs.map((tab, index: number) => (
          <div
            key={index}
            className={`${styles.tabWrapper} ${
              selectedTab === tab ? styles.activeTab : ""
            }`}
          >
            <div className={styles.tab} onClick={() => handleTabClick(tab)}>
              {tab}
            </div>
          </div>
        ))}
      </div>

      {selectedTab === "Personal Data" && (
        <PersonalDataTab
          userData={userData}
          updateData={updateData}
          errors={errors}
          personalInputs={personalInputs}
          onFileChange={handleFileChange}
          onChange={handleChange}
          onCancel={() => navigate("/dashboard")}
          onSave={handleUpdateData}
        />
      )}

      {selectedTab === "Security Data" && (
        <div className={styles.securityData}>
          <SecurityData email={userData.email} />
        </div>
      )}

      {selectedTab === "Services" && (
        <TagSelector
          label="Add Service"
          name="services"
          placeholder="Select service"
          options={servicesOptions}
          selectedItems={userServices}
          onAddItem={handleAddService}
          onRemoveItem={handleRemoveService}
          required
        />
      )}
    </div>
  );
};

export default Profile;

import { useState } from "react";
import TextInput from "../../libs/common/lib-text-input/TextInput";
import styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import LibButton from "../../libs/common/lib-button/LibButton";
import OTPForm from "../MainAuthPagesComponents/SignUp/StepThreeForm/OTPForm";
import SelectInput from "../../libs/common/lib-select-input/SelectInput";
import { useNavigate } from "react-router-dom";

const tabs = ["Personal Data", "Security Data", "Services"];
const servicesOptions = [
  { label: "Design", value: "Design" },
  { label: "Development", value: "Development" },
  { label: "Marketing", value: "Marketing" },
  { label: "SEO", value: "SEO" },
  { label: "Consulting", value: "Consulting" },
];
const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("Personal Data");
  const [image, setImage] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isOldShowPassword, setIsOldShowPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userServices, setUserServices] = useState<string[]>([
    "Design",
    "Development",
  ]);

  const navigate = useNavigate();

  const handleAddService = (value: string) => {
    if (!userServices.includes(value)) {
      setUserServices((prev) => [...prev, value]);
    }
  };

  const handleRemoveService = (service: string) => {
    setUserServices((prev) => prev.filter((s) => s !== service));
  };

  const togglePasswordVisibility = () => setIsShowPassword((prev) => !prev);
  const toggleOldPasswordVisibility = () =>
    setIsOldShowPassword((prev) => !prev);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPassword = () => {};
  const handleUpdateData = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.navBar}>
        {tabs.map((tab) => (
          <div
            className={`${styles.tabWrapper} ${
              selectedTab === tab ? styles.activeTab : ""
            }`}
          >
            <div
              key={tab}
              className={`${styles.tab} `}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </div>
          </div>
        ))}
      </div>

      {selectedTab === "Personal Data" && (
        <div className={styles.personalData}>
          <div
            className={styles.background}
            style={{ backgroundImage: image ? `url(${image})` : "none" }}
          >
            <label
              className={`${styles.penHolder} d-f align-center justify-center`}
            >
              <input
                type="file"
                name="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
              <FontAwesomeIcon
                className={styles.pen}
                icon={faPen}
                size="2xs"
                style={{ color: "#ffffff" }}
              />
            </label>

            {!image && <div>A.G</div>}
          </div>
          <form className="d-f f-dir-col gap-1">
            <div className={`${styles.firstRow} d-f gap-1`}>
              <TextInput
                name="firstName"
                label="First Name"
                placeholder="First Name"
                type="text"
                required={true}
                value={"Abdel rahman"}
                onChange={console.log}
              />
              <TextInput
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                type="text"
                required={true}
                value={"Ghannoum"}
                onChange={console.log}
              />
            </div>
            <div className={`${styles.secondRow} d-f gap-1`}>
              <TextInput
                name="email"
                label="Email "
                placeholder="Email"
                type="email"
                required={true}
                value={"A_Ghannoum@gmail.com"}
                onChange={console.log}
              />
              <TextInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="Phone Number"
                type="text"
                required={true}
                value={"+961 76316965"}
                onChange={console.log}
              />
            </div>
          </form>
          <div
            className={`${styles.resetPasswordHolder} d-f align-center justify-between`}
          >
            <LibButton
              label="Cancel"
              onSubmit={() => navigate("/dashboard")}
              outlined={true}
              color="var(--deep-purple)"
              hoverColor="#8563c326"
              padding="0"
            />
            <LibButton label="Save" onSubmit={handleUpdateData} padding="0" />
          </div>
        </div>
      )}

      {selectedTab === "Security Data" && (
        <div className={styles.securityData}>
          {/* toggle otp reset password */}
          {!showOtpForm ? (
            <>
              {" "}
              <form className="d-f f-dir-col">
                <TextInput
                  name="oldPassword"
                  label="Old Password"
                  placeholder="Old Password"
                  type="password"
                  required={true}
                  value={"123456789"}
                  onChange={console.log}
                  isShowPassword={isOldShowPassword}
                  toggleShowPassword={toggleOldPasswordVisibility}
                />
                <TextInput
                  name="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  required={true}
                  value={""}
                  onChange={console.log}
                  isShowPassword={isShowPassword}
                  toggleShowPassword={togglePasswordVisibility}
                />
                <TextInput
                  name="password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  required={true}
                  value={""}
                  onChange={console.log}
                  isShowPassword={isShowPassword}
                  toggleShowPassword={togglePasswordVisibility}
                />
              </form>
              <div
                className={`${styles.resetPasswordHolder} d-f align-center justify-between`}
              >
                <p
                  className={styles.switchMethod}
                  onClick={() => setShowOtpForm(true)}
                >
                  Forgot password? Reset via email
                </p>
                <LibButton
                  label="Save"
                  onSubmit={handleResetPassword}
                  padding="0"
                />
              </div>
            </>
          ) : (
            <div>
              <OTPForm
                moveBackward={() => setShowOtpForm(false)}
                onSubmit={console.log}
              />
            </div>
          )}
        </div>
      )}

      {selectedTab === "Services" && (
        <div className={styles.servicesData}>
          <SelectInput
            label="Add Service"
            name="services"
            type="select"
            value=""
            required={true}
            placeholder="Select service"
            options={servicesOptions || []}
            onChange={(value) => handleAddService(value)}
          />

          <div className={styles.selectedServices}>
            {userServices.map((service) => (
              <div className={styles.serviceTag} key={service}>
                {service}
                <button
                  type="button"
                  onClick={() => handleRemoveService(service)}
                  aria-label={`Remove ${service}`}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

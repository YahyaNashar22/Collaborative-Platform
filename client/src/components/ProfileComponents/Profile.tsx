import { useEffect, useState } from "react";
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

interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  recoveryEmail: string;
  phone: string;
  job: string;
  profilePicture: string;
  accountType: string;
  role: string;
  availability: boolean;
  banned: boolean;
  services: {
    name: {
      type: string;
    };
    description: {
      type: string;
    };
    image: {
      type: string;
    };
  };
}

const Profile = ({ userData }: { userData: UserProfileData }) => {
  const [selectedTab, setSelectedTab] = useState("Personal Data");
  const [image, setImage] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isOldShowPassword, setIsOldShowPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userServices, setUserServices] = useState<string[]>([
    "Design",
    "Development",
  ]);

  const [formUserData, setFormUserData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    recoveryEmail: userData?.recoveryEmail || "",
    phone: userData?.phone || "",
    job: userData?.job || "",
    profilePicture: userData?.profilePicture || "",
    accountType: userData?.accountType || "individual",
    role: userData?.role || "client",
    availability: userData?.availability ?? true,
    banned: userData?.banned ?? false,
    services: userData?.services || {},
  });

  const navigate = useNavigate();

  const handleAddService = (value: string) => {
    if (!userServices.includes(value)) {
      setUserServices((prev) => [...prev, value]);
    }
  };

  const handleRemoveService = (service: string) => {
    setUserServices((prev) => prev.filter((s) => s !== service));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateData = () => {
    console.log(shallowEqual(userData, formUserData));
    console.log(formUserData);
  };
  const handleResetPassword = () => {};

  const handleChange = (name: string, value: string) => {
    setFormUserData((prev) => ({ ...prev, [name]: value }));
  };

  const shallowEqual = (
    obj1: { [key: string]: any },
    obj2: { [key: string]: any }
  ): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (
          val1.length !== val2.length ||
          !val1.every((v, i) => v === val2[i])
        ) {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (userData) {
      setFormUserData({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        recoveryEmail: userData?.recoveryEmail || "",
        phone: userData?.phone || "",
        job: userData?.job || "",
        profilePicture: userData?.profilePicture || "",
        accountType: userData?.accountType || "individual",
        role: userData?.role || "client",
        availability: userData?.availability ?? true,
        banned: userData?.banned ?? false,
        services: userData?.services || {},
      });
    }
    console.log(userData);
  }, [userData]);

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
            <div
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
                value={formUserData.firstName}
                onChange={(value, name) => handleChange(name, value)}
              />
              <TextInput
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                type="text"
                required={true}
                value={formUserData.lastName}
                onChange={(value, name) => handleChange(name, value)}
              />
            </div>
            <div className={`${styles.secondRow} d-f gap-1`}>
              <TextInput
                name="email"
                label="Email "
                placeholder="Email"
                type="email"
                required={true}
                value={formUserData.email}
                onChange={(value, name) => handleChange(name, value)}
              />
              <TextInput
                name="phone"
                label="Phone Number"
                placeholder="Phone Number"
                type="text"
                required={true}
                value={formUserData.phone}
                onChange={(value, name) => handleChange(name, value)}
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
                  value={""}
                  onChange={console.log}
                  isShowPassword={isOldShowPassword}
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
            {userServices.map((service, index: number) => (
              <div className={styles.serviceTag} key={index}>
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

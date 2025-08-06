import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { Validate } from "../../utils/Validate";
import { updateProfileData } from "../../services/UserServices";
import SecurityData from "./SecurityData/SecurityData";
import PersonalDataTab from "./PersonalData/PersonalData";
import CompanyDataTab from "./CompanyData/CompanyData";
import AddressData from "./AddressData/AddressData";
import BankData from "./BankData/BankData";
import OrganizationData from "./OrganizationData/OrganizationData";
import RequiredDocuments from "./RequiredDocuments/RequiredDocuments";
import { toast } from "react-toastify";
const Profile = ({ userData, isViewer = false, }) => {
    const tabs = useMemo(() => {
        const baseTabs = ["Personal Data"];
        if (!isViewer) {
            baseTabs.push("Security Data");
        }
        if (userData.role === "provider") {
            baseTabs.push("Company Data", "Address Data", "Bank Data", "Required Documents");
        }
        else if (userData.role === "company") {
            baseTabs.push("Organization Data");
        }
        return baseTabs;
    }, [userData.role, isViewer]);
    const [selectedTab, setSelectedTab] = useState("Personal Data");
    const [updateData] = useState({});
    const [, setErrors] = useState({});
    const navigate = useNavigate();
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    const getChangedFields = (original, updated) => {
        const changed = {};
        for (const key in updated) {
            if (updated[key] !== original[key])
                changed[key] = updated[key];
        }
        return changed;
    };
    const validateForm = () => {
        const newErrors = {};
        Object.entries(updateData).forEach(([key, value]) => {
            const error = Validate(key, value, inputConfig.required, inputConfig.type);
            if (error)
                newErrors[key] = error;
        });
        setErrors(newErrors);
        return newErrors;
    };
    const handleUpdateData = async (updatedData) => {
        const payload = getChangedFields(userData, updatedData);
        if (Object.keys(payload).length === 0)
            return;
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0)
            return;
        console.log(payload, "**************");
        try {
            await updateProfileData(userData._id, payload);
            toast.success("User updated successfuly");
            navigate("/dashboard");
            setErrors({});
        }
        catch (error) {
            console.log(error);
            if (error?.response?.statusText === "Payload Too Large") {
                toast.error("Picture is too Large! Please upload a smaller image.");
            }
            else
                toast.error(error?.response?.data?.message || "Error Occured!");
        }
    };
    console.log(isViewer);
    return (_jsxs("div", { className: styles.wrapper, children: [_jsx("div", { className: styles.navBar, children: tabs.map((tab, index) => (_jsx("div", { className: `${styles.tabWrapper} ${selectedTab === tab ? styles.activeTab : ""}`, children: _jsx("div", { className: styles.tab, onClick: () => handleTabClick(tab), children: tab }) }, index))) }), selectedTab === "Personal Data" && userData.personalInformation && (_jsx(PersonalDataTab, { userData: userData.personalInformation, onCancel: () => navigate("/dashboard"), onSave: (updatedData) => handleUpdateData(updatedData), isViewer: isViewer })), selectedTab === "Company Data" &&
                userData.companyInformation &&
                userData.role === "provider" && (_jsx(CompanyDataTab, { userData: userData.companyInformation, onCancel: () => navigate("/dashboard"), onSave: (updatedData) => handleUpdateData(updatedData), isViewer: isViewer })), selectedTab === "Organization Data" &&
                userData.companyInformation &&
                userData.role === "company" && (_jsx(OrganizationData, { userData: userData.companyInformation, onCancel: () => navigate("/dashboard"), onSave: (updatedData) => handleUpdateData(updatedData), isViewer: isViewer })), selectedTab === "Address Data" &&
                userData.companyInformation &&
                userData.role === "provider" && (_jsx(AddressData, { userData: userData.addressInformation, onCancel: () => navigate("/dashboard"), onSave: (updatedData) => handleUpdateData(updatedData), isViewer: isViewer })), selectedTab === "Bank Data" &&
                userData.companyInformation &&
                userData.role === "provider" && (_jsx(BankData, { userData: userData.bankInformation, onCancel: () => navigate("/dashboard"), onSave: (updatedData) => handleUpdateData(updatedData), isViewer: isViewer })), selectedTab === "Security Data" && !isViewer && (_jsx("div", { className: styles.securityData, children: _jsx(SecurityData, { email: userData.email, isViewer: isViewer }) })), selectedTab === "Required Documents" && (_jsx("div", { className: styles.requiredDocuments, children: _jsx(RequiredDocuments, { userData: userData.requiredDocuments, onCancel: () => navigate("/dashboard"), onSave: (updatedData) => handleUpdateData(updatedData), isViewer: isViewer }) }))] }));
};
export default Profile;

import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Profile from "../../components/ProfileComponents/Profile";
import styles from "./ProfilePage.module.css";
import { getUserData } from "../../services/UserServices";
import { toast } from "react-toastify";
const ProfilePage = ({ userId, isViewer = false }) => {
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const getCurrentUser = async () => {
        setIsLoading(true);
        try {
            if (userId) {
                const response = await getUserData(userId);
                if (response)
                    configureUserData(response);
            }
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setIsLoading(false);
        }
    };
    const configureUserData = (userData) => {
        if (userData.role === "provider") {
            setUserData({
                role: userData.role,
                _id: userData._id,
                personalInformation: {
                    _id: userData._id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phone: userData.phone,
                    profilePicture: userData.profilePicture === "default"
                        ? null
                        : userData.profilePicture,
                    recoveryEmail: userData.recoveryEmail,
                    job: userData.job,
                },
                companyInformation: {
                    companyName: userData.companyName,
                    companyDescription: userData.companyDescription,
                    companyWebsite: userData.companyWebsite,
                    crNumber: userData.crNumber,
                    yearsExperience: userData.yearsExperience,
                    expertise: userData.expertise,
                    industry: userData.industry,
                    services: userData.services,
                },
                addressInformation: {
                    country: userData.country,
                    city: userData.city,
                    street: userData.street,
                    POBox: userData.POBox,
                },
                bankInformation: {
                    bankName: userData.bankName,
                    bankCountry: userData.bankCountry,
                    bankAccountName: userData.bankAccountName,
                    bankAccountNumber: userData.bankAccountNumber,
                    IBNNumber: userData.IBNNumber,
                    swiftBank: userData.swiftBank,
                },
                requiredDocuments: {
                    companyProfile: userData.companyProfile,
                    crDocument: userData.crDocument,
                    establishmentContract: userData.establishmentContract,
                    certificate: userData.certificate,
                    otherDocuments: userData.otherDocuments,
                },
            });
        }
        else if (userData.role === "client" &&
            userData.accountType === "company") {
            setUserData({
                role: "company",
                _id: userData._id,
                personalInformation: {
                    _id: userData._id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phone: userData.phone,
                    profilePicture: userData.profilePicture,
                    recoveryEmail: userData.recoveryEmail,
                    job: userData.job,
                },
                companyInformation: {
                    _id: userData._id,
                    companyName: userData.companyName,
                    companyDescription: userData.companyDescription,
                    companyWebsite: userData.companyWebsite,
                    country: userData.country,
                    industry: userData.industry,
                    liscence: userData.liscence,
                },
            });
        }
        else {
            setUserData({
                role: "individual",
                _id: userData._id,
                personalInformation: {
                    _id: userData._id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phone: userData.phone,
                    profilePicture: userData.profilePicture,
                    recoveryEmail: userData.recoveryEmail,
                    job: userData.job,
                },
            });
        }
    };
    useEffect(() => {
        getCurrentUser();
    }, [userId]);
    return (_jsx("div", { className: `${styles.wrapper} w-100`, children: isLoading ? (_jsx("span", { className: "loader" })) : (userData && _jsx(Profile, { userData: userData, isViewer: isViewer })) }));
};
export default ProfilePage;

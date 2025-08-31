import { useEffect, useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./MarketPlace.module.css";
import BoxCard from "../../../shared/BoxCard/BoxCard";
import box_1 from "../../../assets/images/box_1.png";
import Window from "../../../libs/common/lib-window/Window";
import LibButton from "../../../libs/common/lib-button/LibButton";
import { toast } from "react-toastify";
import { getAllRequests, interestBy } from "../../../services/RequestServices";
import { RequestData } from "../../../interfaces/FullRequests";
import { User } from "../../../interfaces/User";
import CreateProposal from "../../../shared/ProposalWindow/CreateProposal";
import { proposalFormType } from "../../../interfaces/Proposal";
import { createProposal } from "../../../services/ProposalServices";

interface MarketPlaceProps {
  user: User | null;
}

const MarketPlace = ({ user }: MarketPlaceProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [openWindow, setOpenWindow] = useState<RequestData | null>(null);
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState(0);
  const [createProposalError, setCreateProposalError] = useState("");

  // New: track selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBoxClick = (id: string) => {
    const selectedItem = requests.find((request) => request._id === id);
    if (selectedItem) {
      setOpenWindow(selectedItem);
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const result = await getAllRequests();
      const withCheckState = result.map((r: RequestData) => ({
        ...r,
        isChecked: true,
      }));
      setRequests(withCheckState);
    } catch (error) {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Create unique category list from serviceDetails[0].name
  const categories = Array.from(
    new Set(
      requests.map((r) => r.serviceDetails?.[0]?.name).filter(Boolean) // remove undefined/null
    )
  );

  // Filter requests by search + category
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.title?.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
      r.description?.toLowerCase().includes(searchValue.trim().toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(r.serviceDetails?.[0]?.name);

    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: Date | string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleInterestBy = async (requestId: string) => {
    try {
      const response = await interestBy(requestId, user?._id ?? "");
      setOpenWindow(null);
    } catch (error) {
      toast.error("Error Occured!");
    }
  };

  const handleCreateProposal = async (proposalForm: proposalFormType) => {
    // to show the skeleton loading so it cast like i refatch the data

    setLoading(true);
    try {
      const payload: { [key: string]: string | File | boolean } = {
        providerId: user?._id as string,
        requestId: requestData?._id ?? "",
        estimatedDeadline: proposalForm.estimatedDeadline,
        amount: proposalForm.amount.toString(),
        file: proposalForm.file,
        description: proposalForm.description,
        isFromMarketPlace: true,
      };
      const result = await createProposal(payload);
      if (result) {
        setRequestData((prev) => {
          if (!prev || !user) return prev;
          return {
            ...prev,
            providerId: [...prev.providerId, user._id],
            _id: prev._id,
            title: prev.title,
            description: prev.description,
            budget: prev.budget,
            clientId: prev.clientId,
            serviceId: prev.serviceId,
            status: prev.status,
            createdAt: prev.createdAt,
            updatedAt: prev.updatedAt,
            interestedBy: prev.interestedBy,
            offerDeadline: prev.offerDeadline,
            projectDeadline: prev.projectDeadline,
            serviceDetails: prev.serviceDetails,
            selectedQuotation: prev.selectedQuotation,
          };
        });
        // setStep(0);
      }
    } catch (error) {
      setCreateProposalError(
        error?.response?.data.message || "create Proposal failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles.wrapper} container d-f`}>
        {step === 0 && (
          <>
            {loading ? (
              <span className="loader"></span>
            ) : (
              <>
                {/* Left Side Panel */}
                <div className={`${styles.leftSidePanel} d-f f-dir-col`}>
                  <h2>Category</h2>
                  <div className={styles.category}>
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`${styles.serviceItem} d-f align-center bold pointer`}
                        onClick={() => handleCategoryToggle(category)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          className="pointer"
                          readOnly
                        />
                        <label className="pointer ml-1">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content */}
                <div className={styles.content}>
                  <div className={styles.header}>
                    <TextInput
                      placeholder="Search"
                      type="text"
                      value={searchValue}
                      name="search_projects"
                      required={false}
                      hasIcon={true}
                      onChange={(value) => handleSearch(value)}
                    />
                  </div>

                  <div className={styles.servicesContainer}>
                    {filteredRequests.length === 0 && searchValue ? (
                      <div className={styles.emptyState}>
                        <p className={styles.noData}>
                          No results found for "{searchValue}"
                        </p>
                      </div>
                    ) : (
                      filteredRequests.map((request) => (
                        <div
                          key={request._id}
                          className={`${styles.requestItem} pointer`}
                          onClick={() => {
                            handleBoxClick(request._id);
                            setRequestData(request);
                          }}
                        >
                          <BoxCard
                            size="small"
                            image={box_1}
                            status={request.status}
                            alt={request.title}
                            title={request.title}
                            duration={`${request.budget} $`}
                            description={request.description}
                            createdAt={request.createdAt}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
        {step === 1 && (
          <div className="w-100">
            <CreateProposal
              requestBudget={requestData?.budget as number}
              onCreateProposal={handleCreateProposal}
              onBack={() => setStep(0)}
              requestIndentifier={requestData?.title as string}
              createProposalError={createProposalError}
            />
          </div>
        )}
      </div>

      <Window
        title={openWindow?.title || "Request Details"}
        visible={!!openWindow}
        onClose={() => setOpenWindow(null)}
      >
        {openWindow && (
          <div className={`${styles.boxDetails} d-f f-dir-col`}>
            <div>
              <h3>Created Date:</h3>
              <p>{formatDate(openWindow.createdAt) || "N/A"}</p>
            </div>
            <div>
              <h3>Project Deadline:</h3>
              <p>{formatDate(openWindow.projectDeadline) || "N/A"}</p>
            </div>
            <div>
              <h3>Offer Deadline:</h3>
              <p>{formatDate(openWindow.offerDeadline) || "N/A"}</p>
            </div>
            <div>
              <h3>Title:</h3>
              <p>{openWindow.title}</p>
            </div>
            <div>
              <h3>Description:</h3>
              <p>{openWindow.description}</p>
            </div>

            <div>
              <h3>Budget:</h3>
              <p>{openWindow.budget}$</p>
            </div>
            <div>
              <h3>Services Name:</h3>
              <p>{openWindow.serviceDetails[0].name}</p>
            </div>
            <div>
              <h3>Services Description:</h3>
              <p>{openWindow.serviceDetails[0].description}</p>
            </div>
            {openWindow.status !== "accepted" && (
              <div className="d-f justify-end align-center mt-3">
                {user && user.role === "provider" && (
                  <div className="d-f align-center justify-between w-100">
                    <LibButton
                      label="Interested"
                      onSubmit={() => handleInterestBy(openWindow._id)}
                      disabled={openWindow.interestedBy.includes(
                        user?._id ?? ""
                      )}
                    />
                    <LibButton
                      label="Add quotation"
                      onSubmit={() => {
                        setCreateProposalError("");
                        setStep(1);
                        setOpenWindow(null);
                      }}
                      bold
                      color="#825beb"
                      hoverColor="#f3f0ff"
                      outlined
                      disabled={requestData?.providerId.includes(user._id)}
                      padding="0 10px"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Window>
    </>
  );
};

export default MarketPlace;

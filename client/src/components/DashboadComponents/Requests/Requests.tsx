import { useEffect, useMemo, useRef, useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Requests.module.css";
import Cards from "../Cards/Cards";
import LibButton from "../../../libs/common/lib-button/LibButton";
import RequestForm from "./RequestForm/RequestForm";
import Proposals from "../Proposals/Proposals";
import { RequestDataType } from "../../../interfaces/request";
import {
  approveProposalByClient,
  approveRequest,
  assignToProvider,
  cancelRequestByClient,
  createRequest,
  getAllRequestsBy,
  getAllUnassignedProvider,
} from "../../../services/RequestServices";
import authStore from "../../../store/AuthStore";
import { FormData } from "../../../data/createRequestData";
import ServiceCardSkeletonGrid from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";
import { RequestData } from "../../../interfaces/FullRequests";
import Window from "../../../libs/common/lib-window/Window";
import RequestDetailsWindow from "../RequestsDetailsWindow/RequestsDetailsWindow";
import CreateProposal from "../../../shared/ProposalWindow/CreateProposal";
import { proposalFormType } from "../../../interfaces/Proposal";
import {
  createProposal,
  getProposals,
} from "../../../services/ProposalServices";
import { toast } from "react-toastify";
import TagSelector from "../../../shared/TagSelector/TagSelector";

type ViewState = "LIST" | "CREATE" | "SELECT";

const Requests = () => {
  const [view, setView] = useState<ViewState>("LIST");
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(false);
  const [assignedRequest, setAssignedRequest] = useState<string | null>(null);
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [createProposalError, setCreateProposalError] = useState<string>("");
  const [providers, setProviders] = useState<{
    assigned: { [key: string]: string }[];
    unassigned: { [key: string]: string }[];
  }>();
  const [isCreateProposalStep, setIsCreateProposalStep] =
    useState<boolean>(false);
  const [isShowAllProposals, setIsShowAllProposals] = useState<boolean>(false);
  const [isCancelRequestWindow, setIsCancelRequestWindow] =
    useState<boolean>(false);
  const [canceldRequestId, setCanceledRequestId] = useState<string>("");
  const [proposalsData, setProposalsData] = useState();

  const [detailsWindow, setDetailsWindow] = useState<RequestData | null>(null);

  const assignedProvidersRef = useRef<() => { [key: string]: string }[]>(
    () => []
  );
  const [filteredRequests, setFilteredRequests] = useState<RequestData[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const debounceRef = useRef(null);

  const { user } = authStore();

  const requestsMap = useMemo(() => {
    return requests.reduce((map, req) => {
      map[req._id] = req;
      return map;
    }, {} as { [key: string]: RequestData });
  }, [requests]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  // fetching requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const result = await getAllRequestsBy(
        user?.role as string,
        user?._id as string
      );
      setRequests(result);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDetailsWindow(null);
    setAssignedRequest(null);
    setIsCreateProposalStep(false);
    setIsShowAllProposals(false);

    fetchRequests();
  }, []);

  useEffect(() => {
    setIsFiltering(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      let filtered = requests;
      if (searchValue) {
        const search = searchValue.toLowerCase();
        filtered = filtered.filter((req) =>
          req.title?.toLowerCase().includes(search)
        );
      }
      if (statusFilter) {
        filtered = filtered.filter((req) => {
          // Map request.status to Card.tsx statuses
          const status = req.status?.toLowerCase();
          if (statusFilter === "accepted") return status === "accepted";
          if (statusFilter === "canceled") return status === "canceled";
          if (statusFilter === "completed") return status === "completed";
          if (statusFilter === "in_progress") return status === "in_progress";
          // For deadline-based statuses, you may need to calculate as in Card.tsx
          if (
            ["onTrack", "dueSoon", "upcoming", "urgent", "overdue"].includes(
              statusFilter
            )
          ) {
            // Use the same logic as getProjectStatus in Card.tsx
            const now = new Date();
            const deadline = new Date(req.projectDeadline);
            const diffInDays = Math.ceil(
              (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (statusFilter === "overdue") return diffInDays < 0;
            if (statusFilter === "urgent")
              return diffInDays <= 3 && diffInDays >= 0;
            if (statusFilter === "upcoming")
              return diffInDays <= 7 && diffInDays > 3;
            if (statusFilter === "dueSoon")
              return diffInDays <= 14 && diffInDays > 7;
            if (statusFilter === "onTrack") return diffInDays > 14;
          }
          return true;
        });
      }
      setFilteredRequests(filtered);
      setIsFiltering(false);
    }, 300);
  }, [searchValue, requests, statusFilter]);

  //*********** Admin section Function ************//

  // fetch providers when open assign window
  const fetchProviders = async (requestId: string) => {
    setLoadingProviders(true);
    try {
      const result = await getAllUnassignedProvider(
        requestId,
        requestsMap[requestId].serviceId
      );

      setProviders(result);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setLoadingProviders(false);
    }
  };

  const assignProvidersToRequest = async () => {
    setIsWindowOpen(false);
    setLoading(true);

    try {
      const assigned = assignedProvidersRef.current();
      if (!assigned || assigned.length === 0) return;

      const providerIds = assigned.map((p) => p.value);
      const payload = {
        providerIds,
        requestId: assignedRequest as string,
      };

      const result = await assignToProvider(payload);
      if (result && assignedRequest) {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === assignedRequest ? { ...req, stage: 2 } : req
          )
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRequest = (id: string) => {
    setAssignedRequest(id);
    setIsWindowOpen(true);
    fetchProviders(id);
  };

  const handleAcceptProposalByAdmin = async (
    ids: string[],
    requestId: string
  ) => {
    setIsShowAllProposals(false);
    setLoading(true);
    try {
      const result = await approveRequest(requestId, ids);
      // add the quotations to the selected quotations manualy on the front end
      const selectedRequest = proposalsData[0].requestId;
      for (let i = 0; i <= result.length; i++) {
        requestsMap[selectedRequest ?? ""].approvedQuotations.push(result[i]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setLoading(false);
    }
  };

  const handleShowProposals = async (requestId: string) => {
    try {
      const result = await getProposals(requestId);
      setProposalsData(result);
      setIsShowAllProposals(true);
    } catch (error) {
      if (error?.response?.data?.message) {
        setIsShowAllProposals(false);
      }
      toast.error(error?.response?.data?.message || "Error Occured!");
    }
  };

  //*********** provider section Function ************//
  const handleSubmitProposal = (requestId: string) => {
    setIsCreateProposalStep(true);
    setAssignedRequest(requestId);
  };

  const handleCreateProposal = async (proposalForm: proposalFormType) => {
    // to show the skeleton loading so it cast like i refatch the data
    setIsCreateProposalStep(false);
    setLoading(true);
    try {
      const payload: { [key: string]: string | File } = {
        providerId: user?._id as string,
        requestId: assignedRequest ?? "",
        estimatedDeadline: proposalForm.estimatedDeadline,
        amount: proposalForm.amount.toString(),
        file: proposalForm.file,
        description: proposalForm.description,
      };
      const result = await createProposal(payload);
      if (result) {
        // update manualy the providerIds to disabel the buttton
        setIsCreateProposalStep(false);
        requestsMap[assignedRequest ?? ""].providerIds.push(user?._id);
      }
    } catch (error) {
      setCreateProposalError(
        error?.response?.data.message || "create Proposal failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  //*********** client section Function ************//

  // create request (client)
  const handleCreateRequest = async (data: RequestDataType) => {
    setView("LIST");
    setLoading(true);
    try {
      const result = await createRequest(data);

      // adding the request manualy in the front end without causing re fetch to get the current request details
      // this configuration to suit the data shape in the reuestDetails window
      const configureResult = {
        ...result,
        serviceDetails: [
          {
            _id: result.serviceId,
            name: result.serviceName,
            description: result.serviceDescription,
          },
        ],
      };

      setRequests((prev) => [...prev, configureResult]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (id: string) => {
    setDetailsWindow(requestsMap[id]);
  };

  const handleAcceptProposalByClient = async (
    quotationId: string,
    requestId: string
  ) => {
    setIsShowAllProposals(false);
    setLoading(true);
    try {
      await approveProposalByClient(requestId, quotationId);
      // update manually
      requestsMap[requestId].stage = 4;
      requestsMap[requestId].selectedQuotation = quotationId;
      requestsMap[requestId].status = "accepted";
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setLoading(false);
    }
  };

  const handleClickCancelRequestButton = (requestId: string) => {
    setIsCancelRequestWindow(true);
    setCanceledRequestId(requestId);
  };

  const handleCancelRequestByClient = async () => {
    try {
      const result = await cancelRequestByClient(canceldRequestId);
      requestsMap[canceldRequestId].stage = 4;
      requestsMap[canceldRequestId].status = "canceled";
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured!");
    } finally {
      setIsCancelRequestWindow(false);
    }
  };

  if (isCreateProposalStep) {
    return (
      <CreateProposal
        requestBudget={assignedRequest && requestsMap[assignedRequest].budget}
        onCreateProposal={handleCreateProposal}
        onBack={() => setIsCreateProposalStep(false)}
        requestIndentifier={requestsMap[assignedRequest as string].title}
        createProposalError={createProposalError}
      />
    );
  }

  if (isShowAllProposals) {
    return (
      <Proposals
        data={proposalsData ?? []}
        onBack={() => setIsShowAllProposals(false)}
        onAcceptProposalByAdmin={handleAcceptProposalByAdmin}
        onAcceptProposalByClient={handleAcceptProposalByClient}
        isAdmin={user?.role === "admin"}
      />
    );
  }

  // Status options based on Card.tsx
  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "accepted", label: "Accepted" },
    { value: "canceled", label: "Canceled" },
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "onTrack", label: "On Track" },
    { value: "dueSoon", label: "Due Soon" },
    { value: "upcoming", label: "Upcoming" },
    { value: "urgent", label: "Urgent" },
    { value: "overdue", label: "Overdue" },
  ];

  return (
    <>
      <main className={`${styles.wrapper} w-100`}>
        {view === "LIST" && (
          <>
            <div className={`${styles.header} d-f justify-between`}>
              <TextInput
                placeholder="Search"
                type="text"
                value={searchValue}
                name="search_projects"
                required={false}
                hasIcon={true}
                onChange={handleSearch}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  marginLeft: "1rem",
                  minWidth: "140px",
                  height: "36px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {user?.role === "client" && (
                <LibButton
                  label="+ Add New"
                  onSubmit={() => setView("CREATE")}
                  backgroundColor="transparent"
                  color="#6550b4"
                  bold={true}
                  hoverColor="#563db11c"
                />
              )}
            </div>
            {loading || isFiltering ? (
              <ServiceCardSkeletonGrid />
            ) : (
              <div className={styles.content}>
                {filteredRequests.length > 0 ? (
                  <Cards
                    data={filteredRequests}
                    userData={user ?? user}
                    onShowDetails={handleShowDetails}
                    onShowProposals={handleShowProposals}
                    onAssignRequest={handleAssignRequest}
                    onSubmitProposal={handleSubmitProposal}
                    onCancelRequestByClient={handleClickCancelRequestButton}
                  />
                ) : (
                  <div className="empty-data">No Data!</div>
                )}
              </div>
            )}
          </>
        )}

        {view === "CREATE" && (
          <RequestForm
            data={FormData}
            moveBackward={() => setView("LIST")}
            onSubmit={handleCreateRequest}
          />
        )}
      </main>

      {detailsWindow && (
        <Window
          title={"Request Details"}
          visible={detailsWindow !== null}
          onClose={() => setDetailsWindow(null)}
          size="large"
        >
          <RequestDetailsWindow
            request={detailsWindow}
            isAdmin={user?.role === "admin"}
          />
        </Window>
      )}

      {assignedRequest && (
        <Window
          title={requestsMap[assignedRequest].title}
          visible={isWindowOpen}
          onClose={assignProvidersToRequest}
        >
          {loadingProviders ? (
            <span className="loader"></span>
          ) : (
            <TagSelector
              label="Assign to"
              name="assignTo"
              placeholder="Select Provider"
              options={providers}
              onReady={(getterFn) => {
                assignedProvidersRef.current = getterFn;
              }}
              interestedProviders={requestsMap[assignedRequest].interestedBy}
              required
            />
          )}
        </Window>
      )}

      {isCancelRequestWindow && (
        <Window
          title="Cancel Request"
          visible={isCancelRequestWindow}
          onClose={() => setIsCancelRequestWindow(false)}
          isErrorWindow="true"
        >
          <small>
            are you sure do you want to delete {""}
            {requestsMap[canceldRequestId].title} ?
          </small>
          <div className={`${styles.btns} d-f align-center justify-between`}>
            <LibButton
              label="Cancel"
              onSubmit={() => setIsCancelRequestWindow(false)}
              bold={true}
              padding="0"
              outlined
              color="var(--deep-purple)"
              hoverColor="#8563c326"
            />
            <LibButton
              label="Confirm"
              onSubmit={handleCancelRequestByClient}
              bold={true}
              padding="0"
            />
          </div>
        </Window>
      )}
    </>
  );
};

export default Requests;

import { useEffect, useMemo, useState } from "react";
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
import { multiSelectType } from "../../../interfaces/registerSignup";
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
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [assignedRequest, setAssignedRequest] = useState<string | null>(null);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [createProposalError, setCreateProposalError] = useState("");
  const [providers, setProviders] = useState<{
    assigned: multiSelectType[];
    unassigned: multiSelectType[];
  }>({});
  const [isCreateProposalStep, setIsCreateProposalStep] = useState(false);
  const [isShowAllProposals, setIsShowAllProposals] = useState(false);
  const [proposalsData, setProposalsData] = useState();

  const [detailsWindow, setDetailsWindow] = useState<RequestData | null>(null);

  let getAssignedProviders: () => multiSelectType[];
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

  const handleSubmit = () => {};

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
      console.error(error);
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

  //*********** Admin section Function ************//

  // fetch providers when open assign window
  const fetchProviders = async (requestId: string) => {
    setLoadingProviders(true);
    try {
      const result = await getAllUnassignedProvider(requestId);
      console.log(result, "unassigned provider");

      setProviders(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProviders(false);
    }
  };

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  const assignProvidersToRequest = async () => {
    setIsWindowOpen(false);

    try {
      const assigned = getAssignedProviders();
      const providerIds = assigned.map((p) => p.value);
      const payload = {
        providerIds: providerIds,
        requestId: assignedRequest as string,
      };
      const result = await assignToProvider(payload);
      console.log(result);
      // update manualy on the front end
      if (result && assignedRequest) {
        console.log(result, assignedRequest, "------");
        setRequests((prev) =>
          prev.map((req) =>
            req._id === assignedRequest ? { ...req, stage: 2 } : req
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignRequest = (id: string) => {
    console.log(id, "from request");
    setAssignedRequest(id);
    setIsWindowOpen(true);
    fetchProviders(id);
  };

  const handleAcceptProposalByAdmin = async (
    ids: string[],
    requestId: string
  ) => {
    console.log(ids, requestId);
    setIsShowAllProposals(false);
    setLoading(true);
    try {
      const result = await approveRequest(requestId, ids);
      // add the quotations to the selected quotations manualy on the front end
      const selectedRequest = proposalsData[0].requestId;
      for (let i = 0; i <= result.length; i++) {
        requestsMap[selectedRequest ?? ""].approvedQuotations.push(result[i]);
      }
      console.log(proposalsData);
    } catch (error) {
      console.error(error);
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
        toast.info(error?.response?.data?.message);
        setIsShowAllProposals(false);
      }
      console.error(error);
    }
  };

  //*********** provider section Function ************//
  const handleSubmitProposal = (requestId: string) => {
    setIsCreateProposalStep(true);
    setAssignedRequest(requestId);
  };

  const handleCreateProposal = async (proposalForm: proposalFormType) => {
    // to show the skeleton loading so it cast like i refatch the data
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
      if (result.status === 200) {
        // update manualy the providerIds to disabel the buttton
        requestsMap[assignedRequest ?? ""].providerIds.push(user?._id);
        setIsCreateProposalStep(false);
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
      console.error(error);
    }
  };

  const handleShowDetails = (id: string) => {
    setDetailsWindow(requestsMap[id]);
  };

  const handleAcceptProposalByClient = async (
    quotationId: string,
    requestId: string
  ) => {
    console.log(requestId);
    setIsShowAllProposals(false);
    setLoading(true);
    try {
      const result = await approveProposalByClient(requestId, quotationId);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isCreateProposalStep) {
    return (
      <CreateProposal
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
            {loading && <ServiceCardSkeletonGrid />}
            <div className={styles.content}>
              <Cards
                data={Object.values(requestsMap)}
                userData={user ?? user}
                onShowDetails={handleShowDetails}
                onShowProposals={handleShowProposals}
                onAssignRequest={handleAssignRequest}
                onSubmitProposal={handleSubmitProposal}
              />
            </div>
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
                getAssignedProviders = getterFn;
              }}
              required
            />
          )}
        </Window>
      )}
    </>
  );
};

export default Requests;

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Requests.module.css";
import Cards from "../Cards/Cards";
import LibButton from "../../../libs/common/lib-button/LibButton";
import RequestForm from "./RequestForm/RequestForm";
import Proposals from "../Proposals/Proposals";
import { approveProposalByClient, approveRequest, assignToProvider, cancelRequestByClient, createRequest, getAllRequestsBy, getAllUnassignedProvider, } from "../../../services/RequestServices";
import authStore from "../../../store/AuthStore";
import { FormData } from "../../../data/createRequestData";
import ServiceCardSkeletonGrid from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";
import Window from "../../../libs/common/lib-window/Window";
import RequestDetailsWindow from "../RequestsDetailsWindow/RequestsDetailsWindow";
import CreateProposal from "../../../shared/ProposalWindow/CreateProposal";
import { createProposal, getProposals, } from "../../../services/ProposalServices";
import { toast } from "react-toastify";
import TagSelector from "../../../shared/TagSelector/TagSelector";
const Requests = () => {
    const [view, setView] = useState("LIST");
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingProviders, setLoadingProviders] = useState(false);
    const [assignedRequest, setAssignedRequest] = useState(null);
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [createProposalError, setCreateProposalError] = useState("");
    const [providers, setProviders] = useState();
    const [isCreateProposalStep, setIsCreateProposalStep] = useState(false);
    const [isShowAllProposals, setIsShowAllProposals] = useState(false);
    const [isCancelRequestWindow, setIsCancelRequestWindow] = useState(false);
    const [canceldRequestId, setCanceledRequestId] = useState("");
    const [proposalsData, setProposalsData] = useState();
    const [detailsWindow, setDetailsWindow] = useState(null);
    const assignedProvidersRef = useRef(() => []);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const debounceRef = useRef(null);
    const { user } = authStore();
    const requestsMap = useMemo(() => {
        return requests.reduce((map, req) => {
            map[req._id] = req;
            return map;
        }, {});
    }, [requests]);
    const handleSearch = (value) => {
        setSearchValue(value);
    };
    // fetching requests
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const result = await getAllRequestsBy(user?.role, user?._id);
            setRequests(result);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
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
        if (!searchValue) {
            setFilteredRequests(requests);
            return;
        }
        setIsFiltering(true);
        if (debounceRef.current)
            clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const search = searchValue.toLowerCase();
            const filtered = requests.filter((req) => req.title?.toLowerCase().includes(search));
            setFilteredRequests(filtered);
            setIsFiltering(false);
        }, 300);
    }, [searchValue, requests]);
    //*********** Admin section Function ************//
    // fetch providers when open assign window
    const fetchProviders = async (requestId) => {
        setLoadingProviders(true);
        try {
            const result = await getAllUnassignedProvider(requestId, requestsMap[requestId].serviceId);
            setProviders(result);
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setLoadingProviders(false);
        }
    };
    const assignProvidersToRequest = async () => {
        setIsWindowOpen(false);
        setLoading(true);
        try {
            const assigned = assignedProvidersRef.current();
            if (!assigned || assigned.length === 0)
                return;
            const providerIds = assigned.map((p) => p.value);
            const payload = {
                providerIds,
                requestId: assignedRequest,
            };
            const result = await assignToProvider(payload);
            if (result && assignedRequest) {
                setRequests((prev) => prev.map((req) => req._id === assignedRequest ? { ...req, stage: 2 } : req));
            }
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setLoading(false);
        }
    };
    const handleAssignRequest = (id) => {
        setAssignedRequest(id);
        setIsWindowOpen(true);
        fetchProviders(id);
    };
    const handleAcceptProposalByAdmin = async (ids, requestId) => {
        setIsShowAllProposals(false);
        setLoading(true);
        try {
            const result = await approveRequest(requestId, ids);
            // add the quotations to the selected quotations manualy on the front end
            const selectedRequest = proposalsData[0].requestId;
            for (let i = 0; i <= result.length; i++) {
                requestsMap[selectedRequest ?? ""].approvedQuotations.push(result[i]);
            }
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setLoading(false);
        }
    };
    const handleShowProposals = async (requestId) => {
        try {
            const result = await getProposals(requestId);
            setProposalsData(result);
            setIsShowAllProposals(true);
        }
        catch (error) {
            if (error?.response?.data?.message) {
                toast.info(error?.response?.data?.message);
                setIsShowAllProposals(false);
            }
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
    };
    //*********** provider section Function ************//
    const handleSubmitProposal = (requestId) => {
        setIsCreateProposalStep(true);
        setAssignedRequest(requestId);
    };
    const handleCreateProposal = async (proposalForm) => {
        // to show the skeleton loading so it cast like i refatch the data
        setIsCreateProposalStep(false);
        setLoading(true);
        try {
            const payload = {
                providerId: user?._id,
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
        }
        catch (error) {
            setCreateProposalError(error?.response?.data.message || "create Proposal failed!");
        }
        finally {
            setLoading(false);
        }
    };
    //*********** client section Function ************//
    // create request (client)
    const handleCreateRequest = async (data) => {
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
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setLoading(false);
        }
    };
    const handleShowDetails = (id) => {
        setDetailsWindow(requestsMap[id]);
    };
    const handleAcceptProposalByClient = async (quotationId, requestId) => {
        setIsShowAllProposals(false);
        setLoading(true);
        try {
            await approveProposalByClient(requestId, quotationId);
            // update manually
            requestsMap[requestId].stage = 4;
            requestsMap[requestId].selectedQuotation = quotationId;
            requestsMap[requestId].status = "accepted";
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setLoading(false);
        }
    };
    const handleClickCancelRequestButton = (requestId) => {
        setIsCancelRequestWindow(true);
        setCanceledRequestId(requestId);
    };
    const handleCancelRequestByClient = async () => {
        try {
            const result = await cancelRequestByClient(canceldRequestId);
            requestsMap[canceldRequestId].stage = 4;
            requestsMap[canceldRequestId].status = "canceled";
        }
        catch (error) {
            toast.error(error?.response?.data?.message || "Error Occured!");
        }
        finally {
            setIsCancelRequestWindow(false);
        }
    };
    if (isCreateProposalStep) {
        return (_jsx(CreateProposal, { requestBudget: assignedRequest && requestsMap[assignedRequest].budget, onCreateProposal: handleCreateProposal, onBack: () => setIsCreateProposalStep(false), requestIndentifier: requestsMap[assignedRequest].title, createProposalError: createProposalError }));
    }
    if (isShowAllProposals) {
        return (_jsx(Proposals, { data: proposalsData ?? [], onBack: () => setIsShowAllProposals(false), onAcceptProposalByAdmin: handleAcceptProposalByAdmin, onAcceptProposalByClient: handleAcceptProposalByClient, isAdmin: user?.role === "admin" }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs("main", { className: `${styles.wrapper} w-100`, children: [view === "LIST" && (_jsxs(_Fragment, { children: [_jsxs("div", { className: `${styles.header} d-f justify-between`, children: [_jsx(TextInput, { placeholder: "Search", type: "text", value: searchValue, name: "search_projects", required: false, hasIcon: true, onChange: handleSearch }), user?.role === "client" && (_jsx(LibButton, { label: "+ Add New", onSubmit: () => setView("CREATE"), backgroundColor: "transparent", color: "#6550b4", bold: true, hoverColor: "#563db11c" }))] }), loading || isFiltering ? (_jsx(ServiceCardSkeletonGrid, {})) : (_jsx("div", { className: styles.content, children: filteredRequests.length > 0 ? (_jsx(Cards, { data: filteredRequests, userData: user ?? user, onShowDetails: handleShowDetails, onShowProposals: handleShowProposals, onAssignRequest: handleAssignRequest, onSubmitProposal: handleSubmitProposal, onCancelRequestByClient: handleClickCancelRequestButton })) : (_jsx("div", { className: "empty-data", children: "No Data!" })) }))] })), view === "CREATE" && (_jsx(RequestForm, { data: FormData, moveBackward: () => setView("LIST"), onSubmit: handleCreateRequest }))] }), detailsWindow && (_jsx(Window, { title: "Request Details", visible: detailsWindow !== null, onClose: () => setDetailsWindow(null), size: "large", children: _jsx(RequestDetailsWindow, { request: detailsWindow, isAdmin: user?.role === "admin" }) })), assignedRequest && (_jsx(Window, { title: requestsMap[assignedRequest].title, visible: isWindowOpen, onClose: assignProvidersToRequest, children: loadingProviders ? (_jsx("span", { className: "loader" })) : (_jsx(TagSelector, { label: "Assign to", name: "assignTo", placeholder: "Select Provider", options: providers, onReady: (getterFn) => {
                        assignedProvidersRef.current = getterFn;
                    }, required: true })) })), isCancelRequestWindow && (_jsxs(Window, { title: "Cancel Request", visible: isCancelRequestWindow, onClose: () => setIsCancelRequestWindow(false), isErrorWindow: "true", children: [_jsxs("small", { children: ["are you sure do you want to delete ", "", requestsMap[canceldRequestId].title, " ?"] }), _jsxs("div", { className: `${styles.btns} d-f align-center justify-between`, children: [_jsx(LibButton, { label: "Cancel", onSubmit: () => setIsCancelRequestWindow(false), bold: true, padding: "0", outlined: true, color: "var(--deep-purple)", hoverColor: "#8563c326" }), _jsx(LibButton, { label: "Confirm", onSubmit: handleCancelRequestByClient, bold: true, padding: "0" })] })] }))] }));
};
export default Requests;

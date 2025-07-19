import { useEffect, useMemo, useState } from "react";
import TextInput from "../../../libs/common/lib-text-input/TextInput";
import styles from "./Requests.module.css";
import Cards from "../Cards/Cards";
import LibButton from "../../../libs/common/lib-button/LibButton";
import RequestForm from "./RequestForm/RequestForm";
import Proposals from "../Proposals/Proposals";
import { RequestDataType } from "../../../interfaces/request";
import {
  createRequest,
  getAllRequests,
} from "../../../services/RequestServices";
import authStore from "../../../store/AuthStore";
import { FormData } from "../../../data/createRequestData";
import ServiceCardSkeletonGrid from "../../../shared/CardSkeletonLoading/CardSkeletonLoading";
import { RequestData } from "../../../interfaces/FullRequests";
import Window from "../../../libs/common/lib-window/Window";
import RequestDetailsWindow from "../RequestsDetailsWindow/RequestsDetailsWindow";
import SelectInput from "../../../libs/common/lib-select-input/SelectInput";

type ViewState = "LIST" | "CREATE" | "SELECT";

// type Project = {
//   id: string;
//   title: string;
//   description: string;
//   deadline: string;
//   offerDeadline: string;
//   onClick: (id: string) => void;
// };

const Requests = () => {
  const [view, setView] = useState<ViewState>("LIST");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [assignRequestWindow, setAssignRequestWindow] = useState<string | null>(
    null
  );
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [detailsWindow, setDetailsWindow] = useState<RequestData | null>(null);

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

  const handleCardClick = (id: string) => {
    console.log("Card clicked with id:", id);
    setView("SELECT");
  };

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
      console.log(result);
      setRequests((prev) => [...prev, configureResult]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowDetails = (id: string) => {
    setDetailsWindow(requestsMap[id]);
    console.log(requestsMap[id]);
  };

  const handleShowProposals = (id: string) => {
    console.log(id);
  };

  const handleAssignRequest = (id: string) => {
    setAssignRequestWindow(id);
  };

  const handleSubmit = () => {};

  // fetching requests
  const fetchRequests = async () => {
    setDetailsWindow(null);
    setLoading(true);
    try {
      const result = await getAllRequests(user?._id);
      setRequests(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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
                data={requests}
                onCardClick={handleCardClick}
                role={user?.role}
                onShowDetails={handleShowDetails}
                onShowProposals={handleShowProposals}
                onAssignRequest={handleAssignRequest}
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

        {view === "SELECT" && (
          <div className={styles.selectWrapper}>
            <Proposals />
            <div className={`${styles.buttons} d-f align-center justify-end`}>
              <LibButton
                label="Back"
                onSubmit={() => setView("LIST")}
                backgroundColor="#57417e"
                hoverColor="#49356a"
                padding="0 20px"
              />
              <LibButton
                label="Submit"
                onSubmit={handleSubmit}
                backgroundColor="#825beb"
                hoverColor="#6c46d9"
                padding="0 20px"
              />
            </div>
          </div>
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

      {assignRequestWindow && (
        <Window
          title={"Assign Request"}
          visible={assignRequestWindow !== null}
          onClose={() => setAssignRequestWindow(null)}
        >
          <div className={styles.servicesData}>
            {/* <SelectInput
            label="Assign to"
            name="asignTo"
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
          </div> */}
          </div>
          <p>helllooo</p>
        </Window>
      )}
    </>
  );
};

export default Requests;

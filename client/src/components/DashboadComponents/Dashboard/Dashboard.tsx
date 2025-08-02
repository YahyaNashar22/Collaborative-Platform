import Chart from "react-apexcharts";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { getRequestsForDashboard } from "../../../services/RequestServices";
import {
  buildStageDonutChart,
  buildStackedFilesChart,
  buildStatusPieChart,
  buildBoxChart,
  buildProjectsCreatedPerDayChart,
  buildProviderPieChart,
  buildProviderLineChart,
  buildProviderStatsBox,
} from "./configurationDashboard";
import { DashboardState } from "../../../interfaces/Dashboard";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardState>({
    boxChart: [],
    stackedFilesChart: null,
    stageDonutChart: null,
    pieChart: null,
    lineChart: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await getRequestsForDashboard();

      let boxChart = [];
      let stackedFilesChart = null;
      let stageDonutChart = null;
      let pieChart = null;
      let lineChart = null;

      if (user?.role === "provider") {
        pieChart = buildProviderPieChart({
          wonQuotations: result.wonQuotations,
          pendingQuotations: result.pendingQuotations,
        });

        lineChart = buildProviderLineChart(result.quotationsByDay);

        boxChart = buildProviderStatsBox({
          quotationNb: result.quotationNb,
          wonQuotations: result.wonQuotations,
          pendingQuotations: result.pendingQuotations,
        });
      } else {
        boxChart = buildBoxChart(result);
        stackedFilesChart = buildStackedFilesChart(result.fileUploadedByMonth);
        stageDonutChart = buildStageDonutChart(result.totalRequestStages);
        pieChart = buildStatusPieChart(result.totalProjectStatus);
        lineChart = buildProjectsCreatedPerDayChart(
          result.projectsCreatedByDay
        );
      }

      setData({
        boxChart,
        stackedFilesChart,
        stageDonutChart,
        pieChart,
        lineChart,
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error with fetching!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <span className="loader"></span>
      ) : (
        <main className={`${styles.wrapper} w-100`}>
          <div className={styles.header}>
            <h2>Project Dashboard</h2>
          </div>

          <div className={styles.grid}>
            {user?.role === "provider" ? (
              <>
                <div className={styles.card}>
                  <h4>Quotation Acceptance Rate</h4>
                  {data.pieChart ? (
                    <Chart
                      options={data.pieChart.options}
                      series={data.pieChart.series}
                      type="pie"
                      height={250}
                    />
                  ) : (
                    <p>No data available</p>
                  )}
                </div>

                <div className={styles.card}>
                  <h4>Quotations Submitted Over Time</h4>
                  {data.lineChart ? (
                    <Chart
                      options={data.lineChart.options}
                      series={data.lineChart.series}
                      type="line"
                      height={300}
                    />
                  ) : (
                    <p>No data available</p>
                  )}
                </div>

                <div className={styles.statsGrid}>
                  {data.boxChart.map((stat, idx) => (
                    <div className={styles.statCard} key={idx}>
                      <div
                        className={styles.statCircle}
                        style={{ backgroundColor: stat.color }}
                      ></div>
                      <div>
                        <h5>{stat.label}</h5>
                        <p>{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className={styles.card}>
                  <h4>Projects Created Over Time</h4>
                  {data.lineChart ? (
                    <Chart
                      options={data.lineChart.options}
                      series={data.lineChart.series}
                      type="line"
                      height={300}
                    />
                  ) : (
                    <p>No projects created data available</p>
                  )}
                </div>

                <div className={styles.card}>
                  <h4>Project Status</h4>
                  {data.pieChart ? (
                    <Chart
                      options={data.pieChart.options}
                      series={data.pieChart.series}
                      type="pie"
                      height={250}
                    />
                  ) : (
                    <p>No project status data available</p>
                  )}
                </div>

                <div className={styles.card}>
                  <h4>Request Stages</h4>
                  {data.stageDonutChart ? (
                    <Chart
                      options={data.stageDonutChart.options}
                      series={data.stageDonutChart.series}
                      type="donut"
                      height={250}
                    />
                  ) : (
                    <p>No stage data</p>
                  )}
                </div>

                <div className={styles.card}>
                  <h4>Files Uploaded per Month</h4>
                  {data.stackedFilesChart ? (
                    <Chart
                      options={data.stackedFilesChart.options}
                      series={data.stackedFilesChart.series}
                      type="bar"
                      height={300}
                    />
                  ) : (
                    <p>No file data available</p>
                  )}
                </div>

                <div className={styles.statsGrid}>
                  {data.boxChart.map((stat, idx) => (
                    <div className={styles.statCard} key={idx}>
                      <div
                        className={styles.statCircle}
                        style={{ backgroundColor: stat.color }}
                      ></div>
                      <div>
                        <h5>{stat.label}</h5>
                        <p>{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Dashboard;

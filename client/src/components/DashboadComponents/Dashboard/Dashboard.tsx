import styles from "./Dashboard.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

import { Bar, Line, Doughnut, Radar, PolarArea, Pie } from "react-chartjs-2";

const Dashboard = () => {
  const stats = [
    { title: "Total Requests", value: 128, color: "var(--deep-purple)" },
    { title: "Completed Projects", value: 42, color: "#36a2eb" },
    { title: "Accepted Projects", value: 74, color: "#4bc0c0" },
    { title: "Pending Files", value: 9, color: "#ffcd56" },
    { title: "Meeting Requests", value: 12, color: "#ff6384" },
    { title: "Total Quotation Value", value: "$48,000", color: "#9966ff" },
  ];
  const barData = {
    labels: ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"],
    datasets: [
      {
        label: "Progress %",
        data: [90, 60, 75, 30, 0],
        backgroundColor: "#825beb",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Project Timeline",
        data: [10, 30, 50, 80, 100],
        borderColor: "#36a2eb",
        tension: 0.3,
      },
    ],
  };

  const doughnutData = {
    labels: ["PDF", "Images", "Docs", "Others"],
    datasets: [
      {
        label: "File Type Distribution",
        data: [12, 19, 5, 4],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      },
    ],
  };

  const radarData = {
    labels: ["Design", "Development", "Testing", "Docs", "Delivery"],
    datasets: [
      {
        label: "Team A",
        data: [80, 70, 90, 60, 75],
        backgroundColor: "rgba(130, 91, 235, 0.2)",
        borderColor: "#825beb",
        pointBackgroundColor: "#825beb",
      },
    ],
  };

  const polarData = {
    labels: ["UI/UX", "Backend", "QA", "Consultation", "Training"],
    datasets: [
      {
        label: "Service Requests",
        data: [11, 16, 7, 3, 5],
        backgroundColor: [
          "#36a2eb",
          "#ff6384",
          "#ffcd56",
          "#4bc0c0",
          "#9966ff",
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "In Progress", "Pending", "Blocked"],
    datasets: [
      {
        label: "Project Status",
        data: [18, 10, 4, 2],
        backgroundColor: ["#4bc0c0", "#36a2eb", "#ffcd56", "#ff6384"],
      },
    ],
  };

  const stackedBarData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "PDFs",
        data: [5, 9, 6, 3, 7],
        backgroundColor: "#825beb",
        stack: "files",
      },
      {
        label: "Images",
        data: [2, 4, 3, 5, 2],
        backgroundColor: "#36a2eb",
        stack: "files",
      },
      {
        label: "Docs",
        data: [3, 6, 2, 4, 3],
        backgroundColor: "#ffcd56",
        stack: "files",
      },
    ],
  };

  return (
    <main className={`${styles.wrapper} w-100`}>
      <div className={styles.header}>
        <h2>Project Dashboard</h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h4>Phase Completion</h4>
          <Bar data={barData} />
        </div>

        <div className={styles.card}>
          <h4>Timeline Progress</h4>
          <Line data={lineData} />
        </div>
        <div className={`${styles.smallChartContainer} d-f f-wrap`}>
          <div className={`${styles.card} ${styles.smallChart}`}>
            <h4>File Upload Types</h4>
            <Doughnut data={doughnutData} />
          </div>

          <div className={`${styles.card} ${styles.smallChart}`}>
            <h4>Team Skills Overview</h4>
            <Radar data={radarData} />
          </div>

          <div className={`${styles.card} ${styles.smallChart}`}>
            <h4>Requested Services</h4>
            <PolarArea data={polarData} />
          </div>

          <div className={`${styles.card} ${styles.smallChart}`}>
            <h4>Project Status</h4>
            <Pie data={pieData} />
          </div>
        </div>
        <div className={styles.card}>
          <h4>Files Uploaded per Month</h4>
          <Bar
            data={stackedBarData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
              scales: { x: { stacked: true }, y: { stacked: true } },
            }}
          />
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div className={styles.statCard} key={idx}>
              <div
                className={styles.statCircle}
                style={{ backgroundColor: stat.color }}
              ></div>
              <div>
                <h5>{stat.title}</h5>
                <p>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

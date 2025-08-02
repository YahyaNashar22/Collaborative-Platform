import { ApexOptions } from "apexcharts";
import {
  ProjectsCreatedByDay,
  StatusCount,
} from "../../../interfaces/Dashboard";

export interface RequestStages {
  [key: string]: number;
}

// --- REQUEST STAGES DONUT ---
export const buildStageDonutChart = (stages: RequestStages) => {
  const values = Object.values(stages);
  const hasData = values.some((count) => count > 0);

  if (!hasData) return null;

  const labels = Object.keys(stages).map((key) =>
    key.replace("stage", "Stage ")
  );
  const series = values;

  const options: ApexOptions = {
    chart: { type: "donut" },
    labels,
    legend: { position: "bottom" },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
  };

  return { series, options };
};

// --- FILES UPLOADED STACKED BAR ---
export const buildStackedFilesChart = (
  fileUploadedByMonth: { type: string; count: number }[] = []
) => {
  const filtered = fileUploadedByMonth.filter((f) => f.type && f.count > 0);

  if (filtered.length === 0) return null;

  return {
    series: [
      {
        name: "Uploaded Files",
        data: filtered.map((f) => f.count),
      },
    ],
    options: {
      chart: { type: "bar", stacked: true },
      xaxis: {
        categories: filtered.map((f) => f.type.toUpperCase()),
      },
      legend: { position: "bottom" },
      colors: ["#825beb"],
    },
  };
};

// --- PROJECT STATUS PIE ---
export const buildStatusPieChart = (data: StatusCount[]) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const labels = data.map((item) => item._id);
  const series = data.map((item) => item.count);

  if (series.every((count) => count === 0)) return null;

  const options: ApexOptions = {
    chart: { type: "pie" },
    labels,
    legend: { position: "bottom" },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#546E7A"],
  };

  return { series, options };
};

// --- STATS BOX CHART (CLIENT) ---
export const buildBoxChart = (result) => {
  const newData = [
    {
      label: "Total Request",
      value: result.requestNb,
      color: "var(--deep-purple)",
    },
    {
      label: "Accepted Projects",
      value: result.completedRequest,
      color: "#4bc0c0",
    },
    {
      label: "Pending Requests",
      value: result.pendingRequest,
      color: "#ffcd56",
    },
    {
      label: "Canceled Requests",
      value: result.canceledRequest,
      color: "#ff6384",
    },
  ];

  return newData;
};

// --- PROJECTS CREATED LINE CHART ---
export const buildProjectsCreatedPerDayChart = (
  data: ProjectsCreatedByDay[]
) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  data.sort((a, b) => a.day - b.day);

  const labels = data.map((item) => `${item.day}`);
  const seriesData = data.map((item) => item.count);

  if (seriesData.every((v) => v === 0)) return null;

  const options: ApexOptions = {
    chart: { type: "line" },
    xaxis: {
      categories: labels,
      title: { text: "Day of Month" },
      tickPlacement: "on",
    },
    yaxis: {
      title: { text: "Projects Created" },
      min: 0,
      forceNiceScale: true,
    },
    stroke: { curve: "smooth" },
    markers: { size: 5 },
    tooltip: { enabled: true },
  };

  return {
    series: [{ name: "Projects Created", data: seriesData }],
    options,
  };
};

/** ------------------ PROVIDER CHARTS ------------------ */

// --- PROVIDER QUOTATION PIE ---
export const buildProviderPieChart = (data: {
  wonQuotations: number;
  pendingQuotations: number;
}) => {
  const series = [data.wonQuotations, data.pendingQuotations];

  if (series.every((v) => v === 0)) return null;

  const labels = ["Accepted Quotations", "Pending / Not Accepted"];

  const options: ApexOptions = {
    chart: { type: "pie" },
    labels,
    legend: { position: "bottom" },
    colors: ["#00E396", "#FF4560"],
  };

  return { series, options };
};

// --- PROVIDER QUOTATIONS LINE ---
export const buildProviderLineChart = (
  data: { year: number; month: number; day: number; count: number }[]
) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const seriesData = data.map((item) => item.count);
  if (seriesData.every((v) => v === 0)) return null;

  data.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  });

  const labels = data.map(
    (item) =>
      `${item.year}-${String(item.month).padStart(2, "0")}-${String(
        item.day
      ).padStart(2, "0")}`
  );

  const options: ApexOptions = {
    chart: { type: "line" },
    xaxis: {
      categories: labels,
      title: { text: "Date" },
      tickPlacement: "on",
      labels: { rotate: -45 },
    },
    yaxis: {
      title: { text: "Quotations Submitted" },
      min: 0,
      forceNiceScale: true,
    },
    stroke: { curve: "smooth" },
    markers: { size: 5 },
    tooltip: { enabled: true },
  };

  return {
    series: [{ name: "Quotations Submitted", data: seriesData }],
    options,
  };
};

// --- PROVIDER STATS BOXES ---
export const buildProviderStatsBox = (data: {
  quotationNb: number;
  wonQuotations: number;
  pendingQuotations: number;
}) => {
  const newData = [
    {
      label: "Total Quotations",
      value: data.quotationNb,
      color: "#825beb",
    },
    {
      label: "Accepted Quotations",
      value: data.wonQuotations,
      color: "#00E396",
    },
    {
      label: "Pending Quotations",
      value: data.pendingQuotations,
      color: "#FF4560",
    },
  ];

  return newData;
};

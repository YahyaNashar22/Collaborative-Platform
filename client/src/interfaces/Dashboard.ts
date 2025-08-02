import { ApexOptions } from "apexcharts";

export interface ChartBox {
  label: string;
  value: number;
  color: string;
}

export interface FileUploadData {
  type: string;
  count: number;
}

export interface StackedFilesChart {
  series: { name: string; data: number[] }[];
  options: ApexOptions;
}

export interface DashboardData {
  boxChart: ChartBox[];
  stackedFilesChart: StackedFilesChart | null;
}

export interface RequestStages {
  stage1: number;
  stage2: number;
  stage3: number;
  stage4: number;
}

export interface StatusCount {
  _id: string;
  count: number;
}

// Add lineChart for projects created over time
export interface DashboardState {
  boxChart: Array<{ label: string; value: number; color: string }>;
  stackedFilesChart: { series: any[]; options: ApexOptions } | null;
  stageDonutChart: { series: number[]; options: ApexOptions } | null;
  pieChart: { series: number[]; options: ApexOptions } | null;
  lineChart: { series: any[]; options: ApexOptions } | null;
}

export interface ProjectsCreatedByDay {
  year: number;
  month: number;
  day: number;
  count: number;
}

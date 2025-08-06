import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Chart from "react-apexcharts";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { getRequestsForDashboard } from "../../../services/RequestServices";
import { buildStageDonutChart, buildStackedFilesChart, buildStatusPieChart, buildBoxChart, buildProjectsCreatedPerDayChart, buildProviderPieChart, buildProviderLineChart, buildProviderStatsBox, } from "./configurationDashboard";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
const Dashboard = () => {
    const { user } = useAuth();
    const [data, setData] = useState({
        boxChart: [],
        stackedFilesChart: null,
        stageDonutChart: null,
        pieChart: null,
        lineChart: null,
    });
    const [isLoading, setIsLoading] = useState(false);
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
            }
            else {
                boxChart = buildBoxChart(result);
                stackedFilesChart = buildStackedFilesChart(result.fileUploadedByMonth);
                stageDonutChart = buildStageDonutChart(result.totalRequestStages);
                pieChart = buildStatusPieChart(result.totalProjectStatus);
                lineChart = buildProjectsCreatedPerDayChart(result.projectsCreatedByDay);
            }
            setData({
                boxChart,
                stackedFilesChart,
                stageDonutChart,
                pieChart,
                lineChart,
            });
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Error with fetching!");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx(_Fragment, { children: isLoading ? (_jsx("span", { className: "loader" })) : (_jsxs("main", { className: `${styles.wrapper} w-100`, children: [_jsx("div", { className: styles.header, children: _jsx("h2", { children: "Project Dashboard" }) }), _jsx("div", { className: styles.grid, children: user?.role === "provider" ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.card, children: [_jsx("h4", { children: "Quotation Acceptance Rate" }), data.pieChart ? (_jsx(Chart, { options: data.pieChart.options, series: data.pieChart.series, type: "pie", height: 250 })) : (_jsx("p", { children: "No data available" }))] }), _jsxs("div", { className: styles.card, children: [_jsx("h4", { children: "Quotations Submitted Over Time" }), data.lineChart ? (_jsx(Chart, { options: data.lineChart.options, series: data.lineChart.series, type: "line", height: 300 })) : (_jsx("p", { children: "No data available" }))] }), _jsx("div", { className: styles.statsGrid, children: data.boxChart.map((stat, idx) => (_jsxs("div", { className: styles.statCard, children: [_jsx("div", { className: styles.statCircle, style: { backgroundColor: stat.color } }), _jsxs("div", { children: [_jsx("h5", { children: stat.label }), _jsx("p", { children: stat.value })] })] }, idx))) })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.card, children: [_jsx("h4", { children: "Projects Created Over Time" }), data.lineChart ? (_jsx(Chart, { options: data.lineChart.options, series: data.lineChart.series, type: "line", height: 300 })) : (_jsx("p", { children: "No projects created data available" }))] }), _jsxs("div", { className: styles.card, children: [_jsx("h4", { children: "Project Status" }), data.pieChart ? (_jsx(Chart, { options: data.pieChart.options, series: data.pieChart.series, type: "pie", height: 250 })) : (_jsx("p", { children: "No project status data available" }))] }), _jsxs("div", { className: styles.card, children: [_jsx("h4", { children: "Request Stages" }), data.stageDonutChart ? (_jsx(Chart, { options: data.stageDonutChart.options, series: data.stageDonutChart.series, type: "donut", height: 250 })) : (_jsx("p", { children: "No stage data" }))] }), _jsxs("div", { className: styles.card, children: [_jsx("h4", { children: "Files Uploaded per Month" }), data.stackedFilesChart ? (_jsx(Chart, { options: data.stackedFilesChart.options, series: data.stackedFilesChart.series, type: "bar", height: 300 })) : (_jsx("p", { children: "No file data available" }))] }), _jsx("div", { className: styles.statsGrid, children: data.boxChart.map((stat, idx) => (_jsxs("div", { className: styles.statCard, children: [_jsx("div", { className: styles.statCircle, style: { backgroundColor: stat.color } }), _jsxs("div", { children: [_jsx("h5", { children: stat.label }), _jsx("p", { children: stat.value })] })] }, idx))) })] })) })] })) }));
};
export default Dashboard;

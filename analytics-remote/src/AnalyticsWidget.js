import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./index.css";

const REVENUE_BY_MONTH = [
  { month: "Jan", revenue: 12400, users: 1200 },
  { month: "Feb", revenue: 15800, users: 1450 },
  { month: "Mar", revenue: 13200, users: 1380 },
  { month: "Apr", revenue: 18900, users: 1620 },
  { month: "May", revenue: 22100, users: 1890 },
  { month: "Jun", revenue: 24320, users: 2134 },
];

const CONVERSION_DATA = [
  { week: "W1", rate: 3.2 },
  { week: "W2", rate: 3.8 },
  { week: "W3", rate: 4.0 },
  { week: "W4", rate: 4.2 },
  { week: "W5", rate: 3.9 },
  { week: "W6", rate: 4.2 },
];

const TRAFFIC_SOURCE = [
  { name: "Direct", value: 42, color: "#42a5f5" },
  { name: "Organic", value: 28, color: "#81c784" },
  { name: "Referral", value: 18, color: "#ba68c8" },
  { name: "Social", value: 12, color: "#ffb74d" },
];

const TIME_RANGES = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
];

const chartTheme = {
  text: "#e4e4e4",
  grid: "#333",
  primary: "#42a5f5",
  secondary: "#81c784",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="analytics-tooltip">
      <div className="analytics-tooltip__label">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" && p.dataKey === "revenue" ? `$${p.value.toLocaleString()}` : p.value}
          {p.dataKey === "rate" ? "%" : ""}
        </div>
      ))}
    </div>
  );
};

const AnalyticsWidget = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [lastRefresh, setLastRefresh] = useState(() => Date.now());

  const revenueData = useMemo(() => {
    const n = timeRange === "7d" ? 2 : timeRange === "30d" ? 4 : 6;
    return REVENUE_BY_MONTH.slice(-n);
  }, [timeRange]);

  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalUsers = revenueData[revenueData.length - 1]?.users ?? 0;
  const avgRate = (CONVERSION_DATA.reduce((s, d) => s + d.rate, 0) / CONVERSION_DATA.length).toFixed(1);

  const handleRefresh = () => setLastRefresh(Date.now());

  return (
    <div className="analytics-widget">
      <h2 className="analytics-widget__title">
        <span className="analytics-widget__title-icon" aria-hidden>📊</span>
        Analytics Overview
      </h2>

      <div className="analytics-widget__toolbar">
        <div className="analytics-widget__range">
          {TIME_RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`analytics-range__btn ${timeRange === r.id ? "analytics-range__btn--active" : ""}`}
              onClick={() => setTimeRange(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <button type="button" className="analytics-refresh" onClick={handleRefresh} title="Refresh data">
          ↻ Refresh
        </button>
      </div>

      <div className="analytics-widget__metrics">
        <div className="analytics-metric">
          <span className="analytics-metric__label">Total Revenue</span>
          <span className="analytics-metric__value analytics-metric__value--revenue">
            ${totalRevenue.toLocaleString()}
          </span>
        </div>
        <div className="analytics-metric">
          <span className="analytics-metric__label">Active Users</span>
          <span className="analytics-metric__value analytics-metric__value--users">
            {totalUsers.toLocaleString()}
          </span>
        </div>
        <div className="analytics-metric">
          <span className="analytics-metric__label">Conversion Rate</span>
          <span className="analytics-metric__value analytics-metric__value--rate">{avgRate}%</span>
        </div>
      </div>

      <div className="analytics-widget__charts">
        <div className="analytics-chart">
          <h3 className="analytics-chart__title">Revenue & Users by Month</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }} key={lastRefresh}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="month" stroke={chartTheme.text} tick={{ fontSize: 12 }} />
              <YAxis stroke={chartTheme.text} tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} contentStyle={{ background: "#1e1e1e", border: "1px solid #333", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="revenue" name="Revenue ($)" fill={chartTheme.primary} radius={[4, 4, 0, 0]} />
              <Bar dataKey="users" name="Users" fill={chartTheme.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="analytics-chart">
          <h3 className="analytics-chart__title">Conversion Rate (Last 6 Weeks)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={CONVERSION_DATA} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
              <XAxis dataKey="week" stroke={chartTheme.text} tick={{ fontSize: 12 }} />
              <YAxis stroke={chartTheme.text} tick={{ fontSize: 11 }} domain={[2, 5]} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} contentStyle={{ background: "#1e1e1e", border: "1px solid #333", borderRadius: 8 }} />
              <Line type="monotone" dataKey="rate" name="Rate (%)" stroke="#ba68c8" strokeWidth={2} dot={{ fill: "#ba68c8" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="analytics-chart analytics-chart--full">
          <h3 className="analytics-chart__title">Traffic by Source</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={TRAFFIC_SOURCE}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name} ${value}%`}
                labelLine={{ stroke: "#555" }}
              >
                {TRAFFIC_SOURCE.map((entry, i) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "#1e1e1e", border: "1px solid #333", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;

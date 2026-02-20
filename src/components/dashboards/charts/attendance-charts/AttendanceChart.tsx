"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./attendanceChart.module.scss";

type Props = {
  data: { name: string; present: number; absent: number }[];
};

const AttendanceChart = ({ data }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={28}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-primary)"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "var(--hover-overlay)" }}
              contentStyle={{
                background: "var(--surface-secondary)",
                border: "1px solid var(--border-primary)",
                borderRadius: "12px",
                color: "var(--text-primary)",
              }}
            />

            <Bar
              dataKey="present"
              name="Presentes"
              fill="var(--chart-present)"
              radius={[10, 10, 0, 0]}
              animationDuration={1000}
            />

            <Bar
              dataKey="absent"
              name="Ausentes"
              fill="var(--chart-absent)"
              radius={[10, 10, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.present}`} />
          <span>Presentes</span>
        </div>

        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.absent}`} />
          <span>Ausentes</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;

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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={24}>
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
            fill="var(--ethos-yellow)"
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
            animationEasing="ease-out"
          />

          <Bar
            dataKey="absent"
            name="Ausentes"
            fill="var(--ethos-sky)"
            radius={[8, 8, 0, 0]}
            animationDuration={1400}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
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


// "use client";
// import Image from "next/image";
// import {
//   BarChart,
//   Bar,
//   Rectangle,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const AttendanceChart = ({
//   data,
// }: {
//   data: { name: string; present: number; absent: number }[];
// }) => {
//   return (
//     <ResponsiveContainer width="100%" height="90%">
//       <BarChart width={500} height={300} data={data} barSize={20}>
//         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
//         <XAxis
//           dataKey="name"
//           axisLine={false}
//           tick={{ fill: "#d1d5db" }}
//           tickLine={false}
//         />
//         <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
//         <Tooltip
//           contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
//         />
//         <Legend
//           align="left"
//           verticalAlign="top"
//           wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
//         />
//         <Bar
//           dataKey="present"
//           fill="#FAE27C"
//           legendType="circle"
//           radius={[10, 10, 0, 0]}
//         />
//         <Bar
//           dataKey="absent"
//           fill="#C3EBFA"
//           legendType="circle"
//           radius={[10, 10, 0, 0]}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default AttendanceChart;

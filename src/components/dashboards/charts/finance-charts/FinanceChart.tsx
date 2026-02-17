"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./financeChart.module.scss";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
  { name: "Jul", income: 3490, expense: 4300 },
  { name: "Aug", income: 3490, expense: 4300 },
  { name: "Sep", income: 3490, expense: 4300 },
  { name: "Oct", income: 3490, expense: 4300 },
  { name: "Nov", income: 3490, expense: 4300 },
  { name: "Dec", income: 3490, expense: 4300 },
];

const FinanceChart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Finanças</h1>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
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
              contentStyle={{
                background: "var(--surface-secondary)",
                border: "1px solid var(--border-primary)",
                borderRadius: "12px",
                color: "var(--text-primary)",
              }}
              cursor={{ stroke: "var(--hover-overlay)", strokeWidth: 2 }}
            />

            <Line
              type="monotone"
              dataKey="income"
              name="Receita"
              stroke="var(--ethos-sky)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={1500}
            />

            <Line
              type="monotone"
              dataKey="expense"
              name="Despesa"
              stroke="var(--accent-primary)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={1700}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.income}`} />
          Receita
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.expense}`} />
          Despesa
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;

// "use client";

// import Image from "next/image";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   {
//     name: "Jan",
//     income: 4000,
//     expense: 2400,
//   },
//   {
//     name: "Feb",
//     income: 3000,
//     expense: 1398,
//   },
//   {
//     name: "Mar",
//     income: 2000,
//     expense: 9800,
//   },
//   {
//     name: "Apr",
//     income: 2780,
//     expense: 3908,
//   },
//   {
//     name: "May",
//     income: 1890,
//     expense: 4800,
//   },
//   {
//     name: "Jun",
//     income: 2390,
//     expense: 3800,
//   },
//   {
//     name: "Jul",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Aug",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Sep",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Oct",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Nov",
//     income: 3490,
//     expense: 4300,
//   },
//   {
//     name: "Dec",
//     income: 3490,
//     expense: 4300,
//   },
// ];

// const FinanceChart = () => {
//   return (
//     <div className="bg-white rounded-xl w-full h-full p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-lg font-semibold">Finança</h1>
//         <Image src="/moreDark.png" alt="" width={20} height={20} />
//       </div>
//       <ResponsiveContainer width="100%" height="90%">
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
//           <XAxis
//             dataKey="name"
//             axisLine={false}
//             tick={{ fill: "#d1d5db" }}
//             tickLine={false}
//             tickMargin={10}
//           />
//           <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false}  tickMargin={20}/>
//           <Tooltip />
//           <Legend
//             align="center"
//             verticalAlign="top"
//             wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
//           />
//           <Line
//             type="monotone"
//             dataKey="income"
//             stroke="#C3EBFA"
//             strokeWidth={5}
//           />
//           <Line type="monotone" dataKey="expense" stroke="#CFCEFF" strokeWidth={5}/>
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default FinanceChart;

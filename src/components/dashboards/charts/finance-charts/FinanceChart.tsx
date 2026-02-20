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
  { name: "Fev", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Abr", income: 2780, expense: 3908 },
  { name: "Mai", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
  { name: "Jul", income: 3490, expense: 4300 },
  { name: "Ago", income: 3490, expense: 4300 },
  { name: "Set", income: 3490, expense: 4300 },
  { name: "Out", income: 3490, expense: 4300 },
  { name: "Nov", income: 3490, expense: 4300 },
  { name: "Dez", income: 3490, expense: 4300 },
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

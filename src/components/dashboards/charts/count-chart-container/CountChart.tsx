"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import { Mars, Venus } from "lucide-react";
import styles from "./countchart.module.scss";

const CountChart = ({
  boys,
  girls,
}: {
  boys: number;
  girls: number;
}) => {
  const total = boys + girls;

  const data = [
    {
      name: "Girls",
      count: girls,
      fill: "var(--ethos-yellow)",
    },
    {
      name: "Boys",
      count: boys,
      fill: "var(--ethos-sky)",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="45%"
          outerRadius="100%"
          barSize={30}
          data={data}
        >
          <RadialBar
            dataKey="count"
            background
            cornerRadius={16}
            isAnimationActive={true}
            animationDuration={900}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* CENTER ICONS */}
      <div className={styles.center}>
        <Venus className={styles.girl} size={22} />
        <Mars className={styles.boy} size={22} />
      </div>
    </div>
  );
};

export default CountChart;


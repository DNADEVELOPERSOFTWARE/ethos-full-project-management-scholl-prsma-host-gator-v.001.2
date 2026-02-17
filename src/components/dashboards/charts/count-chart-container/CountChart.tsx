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


// "use client";

// import {
//   RadialBarChart,
//   RadialBar,
//   ResponsiveContainer,
// } from "recharts";
// import { User, UserRound } from "lucide-react";
// import styles from "./countchart.module.scss";

// const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
//   const total = boys + girls;

//   const data = [
//     {
//       name: "Girls",
//       count: girls,
//       fill: "var(--female-color)",
//     },
//     {
//       name: "Boys",
//       count: boys,
//       fill: "var(--male-color)",
//     },
//   ];

//   return (
//     <div className={styles.chartWrapper}>
//       <ResponsiveContainer>
//         <RadialBarChart
//           cx="50%"
//           cy="50%"
//           innerRadius="55%"
//           outerRadius="100%"
//           barSize={22}
//           data={data}
//         >
//           <RadialBar
//             background
//             dataKey="count"
//             cornerRadius={12}
//             animationDuration={1200}
//           />
//         </RadialBarChart>
//       </ResponsiveContainer>

//       {/* Centro */}
//       <div className={styles.centerContent}>
//         <div className={styles.icons}>
//           <UserRound className={styles.femaleIcon} />
//           <User className={styles.maleIcon} />
//         </div>
//         <span className={styles.total}>{total}</span>
//       </div>
//     </div>
//   );
// };

// export default CountChart;


// "use client";
// import Image from "next/image";
// import {
//   RadialBarChart,
//   RadialBar,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";


// const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
//   const data = [
//     {
//       name: "Total",
//       count: boys+girls,
//       fill: "white",
//     },
//     {
//       name: "Girls",
//       count: girls,
//       fill: "#FAE27C",
//     },
//     {
//       name: "Boys",
//       count: boys,
//       fill: "#C3EBFA",
//     },
//   ];
//   return (
//     <div className="relative w-full h-[75%]">
//       <ResponsiveContainer>
//         <RadialBarChart
//           cx="50%"
//           cy="50%"
//           innerRadius="40%"
//           outerRadius="100%"
//           barSize={32}
//           data={data}
//         >
//           <RadialBar background dataKey="count" />
//         </RadialBarChart>
//       </ResponsiveContainer>
//       <Image
//         src="/maleFemale.png"
//         alt=""
//         width={50}
//         height={50}
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//       />
//     </div>
//   );
// };

// export default CountChart;

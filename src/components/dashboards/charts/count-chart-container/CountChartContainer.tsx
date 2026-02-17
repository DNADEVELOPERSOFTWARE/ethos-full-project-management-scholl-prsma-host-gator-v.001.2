import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";
import styles from "./countChartContainers.module.scss"

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  const total = boys + girls || 1;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1 className={styles.title}>Estudantes</h1>
        <Image src="/moreDark.png" alt="more" width={18} height={18} />
      </div>

      {/* CHART */}
      <CountChart boys={boys} girls={girls} />

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <div className={styles.statBlock}>
          <div className={`${styles.dot} ${styles.boys}`} />
          <h1 className={styles.value}>{boys}</h1>
          <h2 className={styles.label}>
            Masculinos ({Math.round((boys / total) * 100)}%)
          </h2>
        </div>

        <div className={styles.statBlock}>
          <div className={`${styles.dot} ${styles.girls}`} />
          <h1 className={styles.value}>{girls}</h1>
          <h2 className={styles.label}>
            Femininos ({Math.round((girls / total) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;



// import Image from "next/image";
// import CountChart from "../CountChart";
// import prisma from "@/lib/prisma";

// const CountChartContainer = async () => {
//   const data = await prisma.student.groupBy({
//     by: ["sex"],
//     _count: true,
//   });

//   const boys = data.find((d) => d.sex === "MALE")?._count || 0;
//   const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

//   return (
//     <div className="bg-white rounded-xl w-full h-full p-4">
//       {/* TITLE */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-lg font-semibold">Estudantes</h1>
//         <Image src="/moreDark.png" alt="" width={20} height={20} />
//       </div>
//       {/* CHART */}
//       <CountChart boys={boys} girls={girls} />
//       {/* BOTTOM */}
//       <div className="flex justify-center gap-16">
//         <div className="flex flex-col gap-1">
//           <div className="w-5 h-5 bg-ethosSky rounded-full" />
//           <h1 className="font-bold">{boys}</h1>
//           <h2 className="text-xs text-gray-300">
//             Masculinos ({Math.round((boys / (boys + girls)) * 100)}%)
//           </h2>
//         </div>
//         <div className="flex flex-col gap-1">
//           <div className="w-5 h-5 bg-ethosYellow rounded-full" />
//           <h1 className="font-bold">{girls}</h1>
//           <h2 className="text-xs text-gray-300">
//             Femininos ({Math.round((girls / (boys + girls)) * 100)}%)
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CountChartContainer;

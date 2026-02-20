import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";
import styles from "./countChartContainers.module.scss";

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
      <div className={styles.chart}>
        <CountChart boys={boys} girls={girls} />
      </div>

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

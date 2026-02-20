import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";
import styles from "./attendanceChartContainer.module.scss";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      status: true,
    },
  });

  const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  const attendanceMap: {
    [key: string]: { present: number; absent: number };
  } = {
    Seg: { present: 0, absent: 0 },
    Ter: { present: 0, absent: 0 },
    Qua: { present: 0, absent: 0 },
    Qui: { present: 0, absent: 0 },
    Sex: { present: 0, absent: 0 },
  };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayIndex = itemDate.getDay();

    if (dayIndex >= 1 && dayIndex <= 5) {
      const dayName = daysOfWeek[dayIndex - 1];

      if (item.status === "PRESENT") {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Presença</h1>
        <Image src="/moreDark.png" alt="more" width={18} height={18} />
      </div>

      <div className={styles.chart}>
        <AttendanceChart data={data} />
      </div>
    </div>
  );
};

export default AttendanceChartContainer;

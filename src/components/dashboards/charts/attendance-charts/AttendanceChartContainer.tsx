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

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const attendanceMap: {
    [key: string]: { present: number; absent: number };
  } = {
    Mon: { present: 0, absent: 0 },
    Tue: { present: 0, absent: 0 },
    Wed: { present: 0, absent: 0 },
    Thu: { present: 0, absent: 0 },
    Fri: { present: 0, absent: 0 },
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

// import Image from "next/image";
// import AttendanceChart from "./AttendanceChart";
// import prisma from "@/lib/prisma";

// const AttendanceChartContainer = async () => {
//   const today = new Date();
//   const dayOfWeek = today.getDay();
//   const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

//   const lastMonday = new Date(today);
//   lastMonday.setDate(today.getDate() - daysSinceMonday);

//   const resData = await prisma.attendance.findMany({
//     where: {
//       date: {
//         gte: lastMonday,
//       },
//     },
//     select: {
//       date: true,
//       status: true,
//     },
//   });

//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

//   const attendanceMap: {
//     [key: string]: { present: number; absent: number };
//   } = {
//     Mon: { present: 0, absent: 0 },
//     Tue: { present: 0, absent: 0 },
//     Wed: { present: 0, absent: 0 },
//     Thu: { present: 0, absent: 0 },
//     Fri: { present: 0, absent: 0 },
//   };

//   resData.forEach((item) => {
//     const itemDate = new Date(item.date);
//     const dayIndex = itemDate.getDay(); // 1 = Mon ... 5 = Fri

//     if (dayIndex >= 1 && dayIndex <= 5) {
//       const dayName = daysOfWeek[dayIndex - 1];

//       if (item.status === "PRESENT") {
//         attendanceMap[dayName].present += 1;
//       } else {
//         attendanceMap[dayName].absent += 1;
//       }
//     }
//   });

//   const data = daysOfWeek.map((day) => ({
//     name: day,
//     present: attendanceMap[day].present,
//     absent: attendanceMap[day].absent,
//   }));

//   return (
//     <div className="bg-white rounded-lg p-4 h-full">
//       <div className="flex justify-between items-center">
//         <h1 className="text-lg font-semibold">Presença</h1>
//         <Image src="/moreDark.png" alt="" width={20} height={20} />
//       </div>

//       <AttendanceChart data={data} />
//     </div>
//   );
// };

// export default AttendanceChartContainer;

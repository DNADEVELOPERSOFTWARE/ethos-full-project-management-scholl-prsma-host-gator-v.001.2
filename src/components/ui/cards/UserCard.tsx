import prisma from "@/lib/prisma";
import Image from "next/image";
import styles from "./usercards.module.scss";

const typeLabels = {
  admin: "Administradores",
  teacher: "Professores",
  student: "Alunos",
  parent: "Responsáveis",
};

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  let data = 0;

  if (type === "admin") {
    data = await prisma.user.count({
      where: { role: "admin" },
    });
  }

  if (type === "teacher") {
    data = await prisma.teacher.count();
  }

  if (type === "student") {
    data = await prisma.student.count();
  }

  if (type === "parent") {
    data = await prisma.parent.count();
  }

  const year = new Date().getFullYear();
  const schoolYear = `${year}/${(year + 1).toString().slice(-2)}`;

  return (
    <div className={`${styles.card} ${styles[type]}`}>
    <div className={styles.cardHeader}>
      <span className={styles.badge}>{schoolYear}</span>
      <Image src="/more.png" alt="more" width={18} height={18} />
    </div>

    <h1 className={styles.value}>{data}</h1>
    <h2 className={styles.label}>{typeLabels[type]}</h2>
  </div>
  );
};

export default UserCard;


// import prisma from "@/lib/prisma";
// import Image from "next/image";
// import { clerkClient } from "@clerk/nextjs/server";

// const typeLabels = { 
//   admin: "Administradores",
//   teacher: "Professores",
//   student: "Alunos",
//   parent: "Responsáveis",
// };

// const UserCard = async ({ type }: {
//   type: "admin" | "teacher" | "student" | "parent";
// }) => {

//   let data = 0;

//   // // ADMIN VIA CLERK
//   // if (type === "admin") {
//   //   const users = await clerkClient.users.getUserList();
//   //   data = users.data.filter(
//   //     (u) => u.publicMetadata.role === "admin"
//   //   ).length;
//   // }
// if (type === "admin") {
//   data = await prisma.user.count({
//     where: { role: "admin" },
//   });
// }

//   // PRISMA: TEACHER
//   if (type === "teacher") {
//     data = await prisma.teacher.count();
//   }

//   // PRISMA: STUDENT
//   if (type === "student") {
//     data = await prisma.student.count();
//   }

//   // PRISMA: PARENT
//   if (type === "parent") {
//     data = await prisma.parent.count();
//   }

//   return (
//     <div className="rounded-2xl odd:bg-ethosPurple even:bg-ethosYellow p-4 flex-1 min-w-[130px]">
//       <div className="flex justify-between items-center">
//         <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
//           {new Date().getFullYear()}/{(new Date().getFullYear() + 1).toString().slice(-2)}
//         </span>
//         <Image src="/more.png" alt="" width={20} height={20} />
//       </div>
//       <h1 className="text-2xl font-semibold my-4">{data}</h1>
//       <h2 className="capitalize text-sm font-medium text-gray-500">{typeLabels[type]}</h2>
//     </div>
//   );
// };

// export default UserCard;

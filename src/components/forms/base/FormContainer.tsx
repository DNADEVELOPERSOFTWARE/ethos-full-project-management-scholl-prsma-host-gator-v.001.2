import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { getAuthUser, getAuthRole } from "@/lib/auth";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "videoLesson"
    | "exam"
    | "assignment"
    | "result"
    | "event"
    | "grade"
    | "attendance"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({
  table,
  type,
  data,
  id,
}: FormContainerProps) => {
  const rawRole = await getAuthRole();
  const role = rawRole ?? undefined;

  const user = await getAuthUser();
  const currentUserId = user?.id?.toString(); // 🔐 Sempre string

  // DELETE não precisa de relatedData
  if (type === "delete") {
    return <FormModal table={table} type={type} data={data} id={id} />;
  }

  const relatedData = await getRelatedData(
    table,
    role,
    currentUserId
  );

  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
};

export default FormContainer;

/* =====================================================
   🔍 RELATED DATA LOADER
===================================================== */

async function getRelatedData(
  table: FormContainerProps["table"],
  role: string | undefined,
  currentUserId: string | undefined,
) {
  switch (table) {
    case "subject":
      return {
        teachers: await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        }),
      };

    case "class":
      return {
        grades: await prisma.grade.findMany({
          select: { id: true, level: true, description: true },
        }),
        teachers: await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        }),
      };

    case "teacher":
      return {
        subjects: await prisma.subject.findMany({
          select: { id: true, name: true },
        }),
      };

    case "student":
      return {
        grades: await prisma.grade.findMany({
          select: { id: true, level: true, description: true },
        }),
        classes: await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        }),
        parents: await prisma.parent.findMany({
          select: { id: true, name: true, surname: true },
        }),
      };

    case "exam":
      return {
        lessons: await prisma.lesson.findMany({
          where:
            role === "teacher" && currentUserId
              ? { teacherId: currentUserId }
              : undefined,
          select: { id: true, name: true },
        }),
      };

    case "lesson":
      return {
        subjects: await prisma.subject.findMany({
          select: { id: true, name: true },
        }),
        teachers: await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        }),
        grades: await prisma.grade.findMany({
          select: { id: true, description: true },
        }),
        classes: await prisma.class.findMany({
          select: { id: true, name: true },
        }),
      };

    case "videoLesson":
      if (!currentUserId || role !== "teacher") {
        throw new Error("Acesso negado");
      }

      return {
        classes: await prisma.class.findMany({
          where: {
            lessons: {
              some: { teacherId: currentUserId },
            },
          },
          select: { id: true, name: true },
        }),
        subjects: await prisma.subject.findMany({
          select: { id: true, name: true },
        }),
        teacherId: currentUserId,
      };

    case "parent":
      return {
        students: await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        }),
      };

    case "assignment":
      return {
        lessons: await prisma.lesson.findMany({
          select: { id: true, name: true },
        }),
      };

    case "result":
      return {
        students: await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        }),
        lessons: await prisma.lesson.findMany({
          select: { id: true, name: true },
        }),
        exams: await prisma.exam.findMany({
          select: { id: true, title: true, lessonId: true },
        }),
        assignments: await prisma.assignment.findMany({
          select: { id: true, title: true, lessonId: true },
        }),
      };

    case "attendance":
      return {
        students: await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        }),
        lessons: await prisma.lesson.findMany({
          select: { id: true, name: true },
        }),
      };

    case "event":
      return {
        classes: await prisma.class.findMany({
          select: { id: true, name: true },
        }),
      };

    default:
      return {};
  }
}

// import prisma from "@/lib/prisma";
// import FormModal from "./FormModal";
// import { getAuthUser, getAuthRole } from "@/lib/auth";

// /**
//  * ================================
//  * 🔁 CLERK (DESATIVADO)
//  * Para reativar no futuro:
//  *
//  * import { auth } from "@clerk/nextjs/server";
//  *
//  * const { userId, sessionClaims } = auth();
//  * const role = (sessionClaims?.metadata as { role?: string })?.role;
//  * const currentUserId = userId;
//  * ================================
//  */

// export type FormContainerProps = {
//   table:
//     | "teacher"
//     | "student"
//     | "parent"
//     | "subject"
//     | "class"
//     | "lesson"
//     | "videoLesson"
//     | "exam"
//     | "assignment"
//     | "result"
//     | "event"
//     | "grade"
//     | "attendance"
//     | "announcement";
//   type: "create" | "update" | "delete";
//   data?: any;
//   id?: number | string;
// };

// const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
//   let relatedData: Record<string, any> = {};

//   /**
//    * ================================
//    * 🔐 AUTH CENTRALIZADO (LOCAL)
//    * ================================
//    */
//   const role = await getAuthRole();
//   const user = await getAuthUser();
//   const currentUserId = user?.id;

//   /**
//    * ================================
//    * 🔍 DADOS RELACIONADOS
//    * ================================
//    */
//   if (type !== "delete") {
//     switch (table) {
//       case "subject":
//         relatedData = {
//           teachers: await prisma.teacher.findMany({
//             select: { id: true, name: true, surname: true },
//           }),
//         };
//         break;

//       case "class":
//         relatedData = {
//           grades: await prisma.grade.findMany({
//             select: { id: true, level: true, description: true },
//           }),
//           teachers: await prisma.teacher.findMany({
//             select: { id: true, name: true, surname: true },
//           }),
//         };
//         break;

//       case "teacher":
//         relatedData = {
//           subjects: await prisma.subject.findMany({
//             select: { id: true, name: true },
//           }),
//         };
//         break;

//       case "student":
//         relatedData = {
//           grades: await prisma.grade.findMany({
//             select: { id: true, level: true, description: true },
//           }),
//           classes: await prisma.class.findMany({
//             include: { _count: { select: { students: true } } },
//           }),
//           parents: await prisma.parent.findMany({
//             select: { id: true, name: true, surname: true },
//           }),
//         };
//         break;

//       case "exam":
//         relatedData = {
//           lessons: await prisma.lesson.findMany({
//             where:
//               role === "teacher" && currentUserId
//                 ? { teacherId: currentUserId }
//                 : {},
//             select: { id: true, name: true },
//           }),
//         };
//         break;

//       case "lesson":
//         relatedData = {
//           subjects: await prisma.subject.findMany({
//             select: { id: true, name: true },
//           }),
//           teachers: await prisma.teacher.findMany({
//             select: { id: true, name: true, surname: true },
//           }),
//           grades: await prisma.grade.findMany({
//             select: { id: true, description: true },
//           }),
//           classes: await prisma.class.findMany({
//             select: { id: true, name: true },
//           }),
//         };
//         break;
//       case "videoLesson":
//         if (!currentUserId || role !== "teacher") {
//           throw new Error("Acesso negado");
//         }

//         relatedData = {
//           classes: await prisma.class.findMany({
//             where: {
//               lessons: {
//                 some: { teacherId: currentUserId },
//               },
//             },
//             select: { id: true, name: true },
//           }),

//           subjects: await prisma.subject.findMany({
//             select: { id: true, name: true },
//           }),

//           teacherId: currentUserId, // 👈 IMPORTANTE
//         };
//         break;

//       case "parent":
//         relatedData = {
//           students: await prisma.student.findMany({
//             select: { id: true, name: true, surname: true },
//           }),
//         };
//         break;

//       case "assignment":
//         relatedData = {
//           lessons: await prisma.lesson.findMany({
//             select: { id: true, name: true },
//           }),
//         };
//         break;

//       case "result":
//         relatedData = {
//           students: await prisma.student.findMany({
//             select: { id: true, name: true, surname: true },
//           }),
//           lessons: await prisma.lesson.findMany({
//             select: { id: true, name: true },
//           }),
//           exams: await prisma.exam.findMany({
//             select: { id: true, title: true, lessonId: true },
//           }),
//           assignments: await prisma.assignment.findMany({
//             select: { id: true, title: true, lessonId: true },
//           }),
//         };
//         break;

//       case "attendance":
//         relatedData = {
//           students: await prisma.student.findMany({
//             select: { id: true, name: true, surname: true },
//           }),
//           lessons: await prisma.lesson.findMany({
//             select: { id: true, name: true },
//           }),
//         };
//         break;

//       case "event":
//         relatedData = {
//           classes: await prisma.class.findMany({
//             select: { id: true, name: true },
//           }),
//         };
//         break;
//     }
//   }

//   return (
//     <div>
//       <FormModal
//         table={table}
//         type={type}
//         data={data}
//         id={id}
//         relatedData={relatedData}
//       />
//     </div>
//   );
// };

// export default FormContainer;

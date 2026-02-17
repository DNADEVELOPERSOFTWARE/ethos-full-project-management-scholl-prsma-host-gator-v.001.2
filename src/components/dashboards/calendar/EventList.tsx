// EventList.tsx
import prisma from "@/lib/prisma";
import {
  startOfToday,
  endOfMonth,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import EventItem from "./EventItem";
import { Prisma } from "@prisma/client";

const EventList = async ({
  dateParam,
  mode,
  search,
}: {
  dateParam?: string;
  mode: "day" | "week" | "future" | "all";
  search?: string;
}) => {
  // ----------------------------------
  // 1) Definir data base
  // ----------------------------------
  const baseDate = dateParam ? new Date(dateParam) : startOfToday();

  // ----------------------------------
  // 2) Montar filtro tipado
  // ----------------------------------
  const where: Prisma.EventWhereInput = {};

  // ----------------------------------
  // 3) Lógica por modo
  // ----------------------------------

  if (mode === "future") {
    where.startTime = {
      gte: startOfToday(),
      lte: endOfMonth(startOfToday()),
    };
  }

  if (mode === "day") {
    where.startTime = {
      gte: startOfDay(baseDate),
      lte: endOfDay(baseDate),
    };
  }

  if (mode === "week") {
    where.startTime = {
      gte: startOfWeek(baseDate, { weekStartsOn: 1 }), // segunda
      lte: endOfWeek(baseDate, { weekStartsOn: 1 }),
    };
  }

  // "all" = sem filtro de data

  // ----------------------------------
  // 4) Search opcional
  // ----------------------------------
  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  // ----------------------------------
  // 5) Buscar eventos
  // ----------------------------------
  const events = await prisma.event.findMany({
    where,
    orderBy: { startTime: "asc" },
  });

  // ----------------------------------
  // 6) Render
  // ----------------------------------
  if (events.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        Nenhum evento encontrado.
      </p>
    );
  }

  return (
    <>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </>
  );
};

export default EventList;


// // EventList.tsx
// import prisma from "@/lib/prisma";
// import { endOfMonth, startOfToday } from "date-fns";
// import EventItem from "./EventItem";

// const EventList = async ({
//   dateParam,
//   mode,
//   search,
// }: {
//   dateParam?: string;
//   mode: "day" | "week" | "future" | "all";
//   search?: string;
// }) => {
//   // ---------------------------
//   // 1) Calcular datas
//   // ---------------------------
//   const today = startOfToday(); // início do dia atual
//   const endMonth = endOfMonth(today); // último dia do mês atual

//   // ---------------------------
//   // 2) Base do filtro
//   // ---------------------------
//   let where: any = {};

//   // ---------------------------
//   // FUTURE = hoje → final do mês
//   // ---------------------------
//   if (mode === "future") {
//     where.startTime = {
//       gte: today,       // maior/igual a hoje
//       lte: endMonth,    // menor/igual ao último dia do mês
//     };
//   }

//   // ---------------------------
//   // SEARCH opcional
//   // ---------------------------
//   if (search) {
//     where.title = {
//       contains: search,
//       mode: "insensitive",
//     };
//   }

//   // ---------------------------
//   // 3) Buscar eventos
//   // ---------------------------
//   const events = await prisma.event.findMany({
//     where,
//     orderBy: { startTime: "asc" },
//   });

//   // ---------------------------
//   // 4) Render
//   // ---------------------------
//   if (events.length === 0) {
//     return <p className="text-gray-500 text-sm">Nenhum evento encontrado.</p>;
//   }

//   return (
//     <>
//       {events.map((event) => (
//         <EventItem key={event.id} event={event} />
//       ))}
//     </>
//   );
// };

// export default EventList;

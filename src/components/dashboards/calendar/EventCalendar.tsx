"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import styles from "./eventCalendar.module.scss";

import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface EventCalendarProps {
  dateParam?: string;
}

const EventCalendar = ({ dateParam }: EventCalendarProps) => {
  const initialDate = dateParam ? new Date(dateParam) : new Date();

  const [value, setValue] = useState<Value>(initialDate);
  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      const isoDate = value.toISOString();
      router.push(`?date=${isoDate}`);
    }
  }, [value, router]);

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        value={value}
        onChange={setValue}
        locale="pt-BR"
        className={styles.calendar}
      />
    </div>
  );
};

export default EventCalendar;


// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// interface EventCalendarProps {
//   dateParam?: string;
// }

// const EventCalendar = ({ dateParam }: EventCalendarProps) => {
//   /**
//    * =====================================================
//    * 📅 Data inicial
//    * =====================================================
//    * - Se vier da URL (?date=)
//    * - Senão usa a data atual
//    */
//   const initialDate = dateParam ? new Date(dateParam) : new Date();

//   const [value, setValue] = useState<Value>(initialDate);
//   const router = useRouter();

//   /**
//    * =====================================================
//    * 🔁 Atualiza a URL ao trocar a data
//    * =====================================================
//    */
//   useEffect(() => {
//     if (value instanceof Date) {
//       const isoDate = value.toISOString();
//       router.push(`?date=${isoDate}`);
//     }
//   }, [value, router]);

//   /**
//    * =====================================================
//    * 🛑 PONTO CRÍTICO (HYDRATION FIX)
//    * =====================================================
//    * locale="pt-BR" garante que:
//    * - Server e Client renderizem o mesmo texto
//    * - Evita "December" vs "dezembro"
//    */
//   return (
//     <Calendar
//       value={value}
//       onChange={setValue}
//       locale="pt-BR"
//     />
//   );
// };

// export default EventCalendar;

// src/components/EventCalendarContainer.tsx

import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import styles from "./eventCalendarContainer.module.scss";

const allowedModes = ["day", "week", "future", "all"] as const;
type Mode = (typeof allowedModes)[number];

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { date, search, mode } = searchParams || {};

  const effectiveMode: Mode = allowedModes.includes(mode as Mode)
    ? (mode as Mode)
    : "future";

  return (
    <div className={styles.container}>
      <EventCalendar dateParam={date} />

      <div className={styles.header}>
        <h1 className={styles.title}>Eventos</h1>
        <button className={styles.moreButton}>
          <Image
            src="/moreDark.png"
            alt="Mais opções"
            width={18}
            height={18}
          />
        </button>
      </div>

      <div className={styles.list}>
        <EventList
          dateParam={date}
          mode={effectiveMode}
          search={search}
        />
      </div>
    </div>
  );
};

export default EventCalendarContainer;

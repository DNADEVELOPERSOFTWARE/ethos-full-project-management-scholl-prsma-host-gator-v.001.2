import { Event } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import styles from "./eventItem.module.scss";
import clsx from "clsx";

const getType = (event: Event) => {
  return (event as any).type ?? "geral";
};

const EventItem = ({ event }: { event: Event }) => {
  const type = getType(event);
  const isPast = new Date(event.endTime) < new Date();

  return (
    <div className={styles.eventCard}>
      <div className={styles.header}>
        <h2>{event.title}</h2>

        <Image
          src="/eventDark.png"
          alt="Ícone de evento"
          width={22}
          height={22}
        />
      </div>

      <div className={styles.badges}>
        <span
          className={clsx(
            styles.badge,
            styles[type as keyof typeof styles] || styles.geral
          )}
        >
          {type}
        </span>

        <span
          className={clsx(
            styles.badge,
            isPast ? styles.closed : styles.active
          )}
        >
          {isPast ? "Encerrado" : "Ativo"}
        </span>
      </div>

      <div className={styles.dates}>
        <p>
          <strong>Início:</strong>{" "}
          {format(event.startTime, "dd MMM yyyy 'às' HH:mm", {
            locale: ptBR,
          })}
        </p>
        <p>
          <strong>Fim:</strong>{" "}
          {format(event.endTime, "dd MMM yyyy 'às' HH:mm", {
            locale: ptBR,
          })}
        </p>
      </div>

      {event.description && (
        <p className={styles.description}>
          {event.description}
        </p>
      )}
    </div>
  );
};

export default EventItem;

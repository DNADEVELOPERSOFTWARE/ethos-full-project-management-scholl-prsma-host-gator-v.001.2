"use client";

import { useEffect, useState } from "react";
import styles from "./announcements.module.scss";

type Announcement = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const Announcements = () => {
  const [data, setData] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const res = await fetch("/api/announcements");
      const json = await res.json();
      setData(json);
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Avisos</h1>
        <span className={styles.viewAll}>Ver Todos</span>
      </div>

      <div className={styles.list}>
        {data.map((item, idx) => (
          <div
            key={item.id}
            className={`${styles.card} ${styles[`variant${idx % 3}`]}`}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{item.title}</h2>

              <span className={styles.date}>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(item.date)
                )}
              </span>
            </div>

            <p className={styles.description}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;

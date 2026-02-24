"use client";

import { useState } from "react";
import Navbar from "@/components/layouts/navbars/Navbar";
import styles from "@/app/(dashboard)/layout.module.scss";

export default function DashboardShell({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dashboard}>
      {/* Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`${styles.mobileSidebar} ${
          isOpen ? styles.open : ""
        }`}
      >
        {sidebar}
      </aside>

      {/* Desktop Sidebar */}
      <aside className={styles.sidebar}>
        {sidebar}
      </aside>

      {/* Content */}
      <div className={styles.content}>
        <Navbar onMenuClick={() => setIsOpen(true)} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
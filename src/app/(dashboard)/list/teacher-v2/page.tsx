import prisma from "@/lib/prisma";
import { getAuthRole } from "@/lib/auth";
import styles from "./page.module.scss";
import TeacherCard from "./TeacherCard";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

const TeacherV2Page = async () => {
  const role = await getAuthRole();

  const teachers = await prisma.teacher.findMany({
    include: {
      subjects: true,
      classes: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Professores</h1>
          <p>Visualização moderna do módulo de professores</p>
        </div>

        {role === "admin" && (
          <Link href="/list/teacher-v2/new" className={styles.createButton}>
            <Plus size={18} />
            Novo Professor
          </Link>
        )}
      </div>

      <div className={styles.searchBox}>
        <Search size={18} />
        <input placeholder="Buscar professor..." />
      </div>

      <div className={styles.grid}>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} role={role} />
        ))}
      </div>
    </div>
  );
};

export default TeacherV2Page;
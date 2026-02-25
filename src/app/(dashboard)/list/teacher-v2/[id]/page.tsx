import prisma from "@/lib/prisma";
import { getAuthRole } from "@/lib/auth";
import styles from "./page.module.scss";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Mail, Phone, Calendar, BookOpen, Users } from "lucide-react";
import FormContainer from "@/components/forms/base/FormContainer";
import Badge from "@/components/ui/badges/Badge";

const TeacherSingleV2 = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const role = await getAuthRole();

  const teacher = await prisma.teacher.findUnique({
    where: { id },
    include: {
      subjects: true,
      classes: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!teacher) return notFound();

  const isActive = true; // 🔥 depois podemos ligar isso ao banco

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <Image
              src={teacher.img || "/noAvatar.png"}
              alt=""
              width={140}
              height={140}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.nameRow}>
              <h1>
                {teacher.name} {teacher.surname}
              </h1>

              <Badge variant={isActive ? "success" : "danger"}>
                {isActive ? "Ativo" : "Inativo"}
              </Badge>

              {role === "admin" && (
                <FormContainer table="teacher" type="update" data={teacher} />
              )}
            </div>

            <p className={styles.description}>
              {teacher.description || "Professor cadastrado no sistema."}
            </p>

            <div className={styles.meta}>
              <div>
                <Mail size={16} />
                {teacher.user?.email || "-"}
              </div>

              <div>
                <Phone size={16} />
                {teacher.phone || "-"}
              </div>

              <div>
                <Calendar size={16} />
                {teacher.birthday
                  ? new Intl.DateTimeFormat("pt-BR").format(teacher.birthday)
                  : "-"}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <BookOpen size={20} />
            <h3>{teacher.subjects.length}</h3>
            <span>Disciplinas</span>
          </div>

          <div className={styles.statCard}>
            <Users size={20} />
            <h3>{teacher.classes.length}</h3>
            <span>Turmas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSingleV2;

import styles from "./teacherCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import Icon from "@/components/ui/icons/Icon";
import FormContainer from "@/components/forms/base/FormContainer";

type Props = {
  teacher: any;
  role?: string;
};

export default function TeacherCard({ teacher, role }: Props) {
  const fullName = `${teacher.name} ${teacher.surname}`;

  const subjects =
    teacher.subjects?.map((s: any) => s.name).join(", ") || "Sem disciplinas";

  const totalClasses = teacher.classes?.length ?? 0;

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image
          src={teacher.img || "/noAvatar.png"}
          alt={fullName}
          width={90}
          height={90}
        />
      </div>

      <h3>{fullName}</h3>

      <p className={styles.subjects}>{subjects}</p>

      <div className={styles.meta}>
        <span>{totalClasses} Turmas</span>
      </div>

      <div className={styles.actions}>
        {/* Ver */}
        <Link
          href={`/list/teacher-v2/${teacher.id}`}
          className={styles.actionButton}
        >
          <Icon icon={Eye} size={18} />
        </Link>

        {/* Deletar */}
        {role === "admin" && (
          <div className={styles.actionButton}>
            <FormContainer
              table="teacher"
              type="delete"
              id={teacher.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
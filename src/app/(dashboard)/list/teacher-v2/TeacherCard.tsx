import styles from "./TeacherCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import FormContainer from "@/components/forms/base/FormContainer";

export default function TeacherCard({ teacher, role }: any) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image
          src={teacher.img || "/noAvatar.png"}
          alt=""
          width={90}
          height={90}
        />
      </div>

      <h3>{teacher.name} {teacher.surname}</h3>

      <p className={styles.subjects}>
        {teacher.subjects.map((s: any) => s.name).join(", ") || "Sem disciplinas"}
      </p>

      <div className={styles.meta}>
        <span>{teacher.classes.length} Turmas</span>
      </div>

      <div className={styles.actions}>
        <Link href={`/list/teacher-v2/${teacher.id}`}>
          <Eye size={18} />
        </Link>

        {role === "admin" && (
          <>
            <FormContainer table="teacher" type="update" data={teacher} />
            <FormContainer table="teacher" type="delete" id={teacher.id} />
          </>
        )}
      </div>
    </div>
  );
}
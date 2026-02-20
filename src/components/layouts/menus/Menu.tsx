import Link from "next/link";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { LucideIcon } from "lucide-react";
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  School,
  ClipboardList,
  FileText,
  CheckCircle,
  Calendar,
  MessageCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Icon from "@/components/ui/icons/Icon";
import styles from "./menu.module.scss";

const VALID_ROLES = ["admin", "teacher", "student", "parent"] as const;
type Role = (typeof VALID_ROLES)[number];

type BadgeType = "contacts";

type MenuItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  visible: Role[];
  badge?: BadgeType;
};

type MenuSection = {
  title: string;
  visibleTo?: Role[];
  items: MenuItem[];
};

const menuItems: MenuSection[] = [
  {
    title: "MENU",
    items: [
      { icon: Home, label: "Home", href: "/", visible: ["admin", "teacher", "student", "parent"] },
      { icon: Users, label: "Professores", href: "/list/teachers", visible: ["admin", "teacher"] },
      { icon: GraduationCap, label: "Alunos", href: "/list/students", visible: ["admin", "teacher"] },
      { icon: Users, label: "Responsáveis", href: "/list/parents", visible: ["admin", "teacher"] },
      { icon: School, label: "Série", href: "/list/grades", visible: ["admin", "teacher"] },
      { icon: BookOpen, label: "Discíplinas", href: "/list/subjects", visible: ["admin"] },
      { icon: Users, label: "Turmas", href: "/list/classes", visible: ["admin", "teacher"] },
      { icon: ClipboardList, label: "Lições", href: "/list/lessons", visible: ["admin", "teacher"] },
      { icon: FileText, label: "Testes / Provas", href: "/list/exams", visible: ["admin", "teacher", "student", "parent"] },
      { icon: CheckCircle, label: "Resultados", href: "/list/results", visible: ["admin", "teacher", "student", "parent"] },
      { icon: Calendar, label: "Eventos", href: "/list/events", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
  {
    title: "ADMIN",
    visibleTo: ["admin"],
    items: [
      {
        icon: MessageCircle,
        label: "Mensagens de contato",
        href: "/admin/contacts",
        visible: ["admin"],
        badge: "contacts",
      },
    ],
  },
  {
    title: "OUTROS",
    items: [
      { icon: User, label: "Perfil", href: "/profile", visible: ["admin", "teacher", "student", "parent"] },
      { icon: Settings, label: "Ajustes", href: "/settings", visible: ["admin", "teacher", "student", "parent"] },
      { icon: LogOut, label: "Sair", href: "/logout", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
];

const Menu = async () => {
  let role: Role | null = null;

  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (sessionCookie) {
    try {
      const parsed = JSON.parse(sessionCookie);
      const parsedRole = parsed.role?.toLowerCase();

      if (parsedRole && VALID_ROLES.includes(parsedRole as Role)) {
        role = parsedRole as Role;
      }
    } catch (error) {
      console.error("Erro ao ler cookie:", error);
    }
  }

  if (!role) return null;

  let unreadContacts = 0;

  if (role === "admin") {
    unreadContacts = await prisma.contact.count({
      where: { isRead: false },
    });
  }

  return (
    <div className={styles.menu}>
      {menuItems
        .filter((section) => !section.visibleTo || section.visibleTo.includes(role))
        .map((section) => (
          <div key={section.title} className={styles.section}>
            <span className={styles.sectionTitle}>{section.title}</span>

            {section.items
              .filter((item) => item.visible.includes(role))
              .map((item) => (
                <Link key={item.label} href={item.href} className={styles.link}>
                  <Icon icon={item.icon} size={18} />
                  <span className={styles.label}>{item.label}</span>

                  {item.badge === "contacts" && unreadContacts > 0 && (
                    <span className={styles.badge}>{unreadContacts}</span>
                  )}
                </Link>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Menu;


// components/ui/Icon.tsx
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  size?: number;
  className?: string;
};

export default function Icon({ icon: Icon, size = 20, className }: Props) {
  return <Icon size={size} className={className} strokeWidth={1.5} />;
}

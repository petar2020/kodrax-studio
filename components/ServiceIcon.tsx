import { useId } from "react";
import { Code, GitBranch, ShoppingCart, Smartphone, Zap, type LucideIcon } from "lucide-react";

import styles from "./ServiceIcon.module.css";

export type ServiceIconKey =
  | "custom-websites"
  | "web-applications"
  | "e-commerce"
  | "mobile-apps"
  | "integrations-devops";

const iconByService: Record<ServiceIconKey, LucideIcon> = {
  "custom-websites": Code,
  "web-applications": Zap,
  "e-commerce": ShoppingCart,
  "mobile-apps": Smartphone,
  "integrations-devops": GitBranch
};

interface ServiceIconProps {
  service: ServiceIconKey;
  size?: number;
}

export default function ServiceIcon({ service, size = 32 }: ServiceIconProps) {
  const Icon = iconByService[service];
  const gradientId = useId().replace(/:/g, "");

  return (
    <span className={styles.iconWrap} aria-hidden="true">
      <svg className={styles.gradientDefs} width="0" height="0" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--acc)" />
            <stop offset="100%" stopColor="var(--acc2)" />
          </linearGradient>
        </defs>
      </svg>
      <Icon size={size} strokeWidth={2.1} style={{ stroke: `url(#${gradientId})` }} />
    </span>
  );
}

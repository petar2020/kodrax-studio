import styles from "./TechnologyBadge.module.css";

interface TechnologyBadgeProps {
  name: string;
}

export default function TechnologyBadge({ name }: TechnologyBadgeProps) {
  return <span className={styles.badge}>{name}</span>;
}

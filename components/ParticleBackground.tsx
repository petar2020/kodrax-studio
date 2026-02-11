import styles from "./ParticleBackground.module.css";

const PARTICLE_COUNT = 20;

export default function ParticleBackground() {
  return (
    <div className={styles.particles} aria-hidden="true">
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
        <span key={`particle-${index}`} className={styles.particle} />
      ))}
    </div>
  );
}

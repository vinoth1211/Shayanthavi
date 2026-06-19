"use client";

import { motion } from "framer-motion";
import styles from "./Logo.module.css";

interface LogoProps {
  initials?: string;
}

export function Logo({ initials = "ST" }: LogoProps) {
  return (
    <motion.div
      className={styles.logoContainer}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={styles.logoCircle}>
        <span className={styles.logoText}>{initials}</span>
      </div>
    </motion.div>
  );
}

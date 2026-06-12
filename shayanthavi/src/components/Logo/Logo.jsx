import React from "react";
import { motion } from "framer-motion";
import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <motion.div
      className={styles.logoContainer}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={styles.logoCircle}>
        <span className={styles.logoText}>ST</span>
      </div>
    </motion.div>
  );
};

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { getIconSmall } from "@/lib/iconMap";
import type { ExperienceData } from "@/lib/content/types";
import styles from "./Experience.module.css";

interface ExperienceProps {
  data: ExperienceData;
}

export function Experience({ data }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
      </div>

      <div className={styles.container} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>{data.heading}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </motion.div>

        {data.positions.map((position, posIndex) => (
          <div key={position.id ?? posIndex} className={styles.timeline}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={styles.companyCard}
            >
              <div className={styles.companyCardContent}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                  className={styles.companyBadge}
                >
                  <FaBriefcase />
                </motion.div>

                <div className={styles.companyInfo}>
                  <h3 className={styles.companyRole}>{position.role}</h3>
                  <p className={styles.companyName}>{position.company}</p>

                  <div className={styles.companyMetaBar}>
                    <div className={styles.metaBadge}>
                      <FaCalendarAlt />
                      <span>{position.duration}</span>
                    </div>
                    <div className={styles.metaBadge}>
                      <FaMapMarkerAlt />
                      <span>{position.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className={styles.timelineLine}></div>

            <div className={styles.projectsTimeline}>
              {position.projects.map((project, index) => (
                <div key={project.id ?? index} className={styles.timelineItem}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.7 + index * 0.3 }}
                    className={`${styles.projectCard} ${index % 2 === 0 ? styles.projectRight : styles.projectLeft}`}
                  >
                    <div className={styles.projectHeader}>
                      <h4 className={styles.projectTitle}>{project.name}</h4>
                      <span className={styles.roleTag}>{project.role}</span>
                    </div>

                    <p className={styles.projectDescription}>{project.description}</p>

                    <div className={styles.highlightsSection}>
                      <h5 className={styles.sectionLabel}>Key Achievements</h5>
                      <div className={styles.highlightsList}>
                        {project.highlights.map((highlight, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.9 + index * 0.3 + idx * 0.1 }}
                            className={styles.highlightItem}
                          >
                            <FaCheckCircle className={styles.checkIcon} />
                            <span>{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.techSection}>
                      <h5 className={styles.sectionLabel}>Tech Stack</h5>
                      <div className={styles.techBadges}>
                        {project.technologies.map((tech, techIdx) => (
                          <motion.div
                            key={techIdx}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: 1.1 + index * 0.3 + techIdx * 0.1 }}
                            whileHover={{ scale: 1.1, y: -3 }}
                            className={styles.techBadge}
                          >
                            <span style={{ color: tech.color }} className={styles.techIcon}>
                              {getIconSmall(tech.iconKey)}
                            </span>
                            <span className={styles.techName}>{tech.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.cardCorner}></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

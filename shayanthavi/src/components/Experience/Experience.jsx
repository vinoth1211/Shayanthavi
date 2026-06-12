import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCode, FaCheckCircle } from "react-icons/fa";
import { SiReact, SiNodedotjs, SiExpress, SiMysql, SiElectron } from "react-icons/si";
import styles from "./Experience.module.css";

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experienceData = {
    role: "Intern Software Engineer",
    company: "Neirah Tech Solutions Pvt. Ltd.",
    duration: "Present",
    location: "Sri Lanka",
    projects: [
      {
        name: "Jewellery Shop POS System",
        description: "Developed a comprehensive Point of Sale system for jewellery shops with inventory management, billing, and customer tracking features. Built as a full-stack desktop application.",
        role: "Full Stack Developer",
        technologies: [
          { name: "React", icon: <SiReact />, color: "#61DAFB" },
          { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
          { name: "Express.js", icon: <SiExpress />, color: "#000000" },
          { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
          { name: "Electron.js", icon: <SiElectron />, color: "#47848F" },
        ],
        highlights: [
          "Complete end-to-end development",
          "Desktop application using Electron.js",
          "Real-time inventory tracking",
          "User-friendly billing interface"
        ]
      },
      {
        name: "Security Assignment System",
        description: "Built a web application for efficiently managing security worker assignments, scheduling, and client sites. Features quick assignment capabilities, automated scheduling, and comprehensive reporting.",
        role: "Full Stack Developer",
        technologies: [
          { name: "React", icon: <SiReact />, color: "#61DAFB" },
          { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
          { name: "Express.js", icon: <SiExpress />, color: "#000000" },
          { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
        ],
        highlights: [
          "Smart scheduling algorithm",
          "Client & worker management",
          "Automated report generation",
          "User-friendly assignment interface"
        ]
      }
    ]
  };

  return (
    <section id="experience" className={styles.experienceSection}>
      {/* Animated Background */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
      </div>

      <div className={styles.container} ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Experience</h2>
          <p className={styles.subtitle}>
            Building innovative solutions at the forefront of technology
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className={styles.timeline}>
          {/* Company Header Card */}
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
                <h3 className={styles.companyRole}>{experienceData.role}</h3>
                <p className={styles.companyName}>{experienceData.company}</p>
                
                <div className={styles.companyMetaBar}>
                  <div className={styles.metaBadge}>
                    <FaCalendarAlt />
                    <span>{experienceData.duration}</span>
                  </div>
                  <div className={styles.metaBadge}>
                    <FaMapMarkerAlt />
                    <span>{experienceData.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline Line */}
          <div className={styles.timelineLine}></div>

          {/* Projects Timeline */}
          <div className={styles.projectsTimeline}>
            {experienceData.projects.map((project, index) => (
              <div key={index} className={styles.timelineItem}>
                {/* Project Card */}
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

                  {/* Highlights */}
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

                  {/* Tech Stack Badges */}
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
                            {tech.icon}
                          </span>
                          <span className={styles.techName}>{tech.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className={styles.cardCorner}></div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

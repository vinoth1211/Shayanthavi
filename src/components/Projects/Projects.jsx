import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../../data/projects.js";
import { FaPlay, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa";
import styles from "./Projects.module.css";

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeScreenshot, setActiveScreenshot] = useState({});

  const handlePrevImage = (projectIndex) => {
    setActiveScreenshot(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + projects[projectIndex].screenshots.length) % projects[projectIndex].screenshots.length
    }));
  };

  const handleNextImage = (projectIndex) => {
    setActiveScreenshot(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % projects[projectIndex].screenshots.length
    }));
  };

  return (
    <section id="projects" className={styles.projectsSection}>
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
          <h2 className={styles.title}>My Projects</h2>
          <p className={styles.subtitle}>
            Showcasing innovative solutions with cutting-edge technology
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => {
            const currentImageIndex = activeScreenshot[index] || 0;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={`${styles.projectCard} ${isEven ? styles.projectCardLeft : styles.projectCardRight}`}
              >
                {/* Project Content */}
                <div className={styles.projectContent}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    className={styles.projectInfo}
                  >
                    <div className={styles.projectNumber}>0{index + 1}</div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>

                    {/* Skills */}
                    <div className={styles.skillsContainer}>
                      {project.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: index * 0.2 + 0.5 + skillIndex * 0.1 }}
                          className={styles.skillBadge}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Demo Button */}
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(87, 108, 188, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.demoButton}
                    >
                      <FaPlay className={styles.playIcon} />
                      Watch Demo Video
                      <FaExternalLinkAlt className={styles.externalIcon} />
                    </motion.a>
                  </motion.div>

                  {/* Screenshot Carousel */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    className={styles.screenshotContainer}
                  >
                    <div className={styles.screenshotWrapper}>
                      {/* Main Screenshot */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.5 }}
                          className={styles.mainScreenshot}
                        >
                          <img
                            src={project.screenshots[currentImageIndex]}
                            alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                            className={styles.screenshotImage}
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      <button
                        onClick={() => handlePrevImage(index)}
                        className={`${styles.navButton} ${styles.navButtonLeft}`}
                        aria-label="Previous screenshot"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={() => handleNextImage(index)}
                        className={`${styles.navButton} ${styles.navButtonRight}`}
                        aria-label="Next screenshot"
                      >
                        <FaChevronRight />
                      </button>

                      {/* Thumbnail Navigation */}
                      <div className={styles.thumbnailContainer}>
                        {project.screenshots.map((screenshot, thumbIndex) => (
                          <motion.button
                            key={thumbIndex}
                            onClick={() => setActiveScreenshot(prev => ({ ...prev, [index]: thumbIndex }))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`${styles.thumbnail} ${
                              currentImageIndex === thumbIndex ? styles.thumbnailActive : ""
                            }`}
                          >
                            <img
                              src={screenshot}
                              alt={`Thumbnail ${thumbIndex + 1}`}
                              className={styles.thumbnailImage}
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className={styles.decorativeCircle}></div>
                    <div className={styles.decorativeSquare}></div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

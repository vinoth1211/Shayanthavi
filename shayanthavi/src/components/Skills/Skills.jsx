import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit,
  SiFigma,
  SiElectron,
  SiPython,
  SiTensorflow,
  SiScikitlearn,
  SiPostman,
} from "react-icons/si";

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allSkills = [
    { name: "React", icon: <SiReact />, color: "#61DAFB" },
    { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26" },
    { name: "CSS3", icon: <SiCss3 />, color: "#1572B6" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    { name: "Material UI", icon: <SiMui />, color: "#007FFF" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    { name: "Express.js", icon: <SiExpress />, color: "#000000" },
    { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
    { name: "Git", icon: <SiGit />, color: "#F05032" },
    { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
    { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
    { name: "Electron.js", icon: <SiElectron />, color: "#47848F" },
    { name: "Python", icon: <SiPython />, color: "#3776AB" },
    { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
    { name: "scikit-learn", icon: <SiScikitlearn />, color: "#F7931E" },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-olive/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technologies & Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-teal flex flex-col items-center justify-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="text-5xl"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </motion.div>
              <h4 className="font-semibold text-gray-900 text-center text-sm">{skill.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

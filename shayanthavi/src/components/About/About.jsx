import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaLaptopCode, FaServer, FaPalette, FaBrain } from "react-icons/fa";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: <FaLaptopCode className="w-12 h-12" />,
      title: "Frontend Developer",
      description: "I am a frontend developer with a passion for creating user-friendly interfaces.",
      gradient: "from-teal to-teal-dark",
    },
    {
      icon: <FaServer className="w-12 h-12" />,
      title: "Backend Developer",
      description: "I am a backend developer focused on building robust and scalable APIs.",
      gradient: "from-olive to-olive-light",
    },
    {
      icon: <FaPalette className="w-12 h-12" />,
      title: "UI Designer",
      description: "I am a UI designer with a passion for creating visually appealing and user-friendly designs.",
      gradient: "from-teal-dark to-teal",
    },
    {
      icon: <FaBrain className="w-12 h-12" />,
      title: "Machine Learning Enthusiast",
      description: "I explore ML models for intelligent automation and predictive analytics.",
      gradient: "from-olive-light to-olive",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-olive-light/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            I'm a passionate Computer Engineering undergraduate at the University of Ruhuna,
            specializing in full-stack development, UI/UX design, and machine learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -90 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

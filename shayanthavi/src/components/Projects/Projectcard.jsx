import React from "react";
import { motion } from "framer-motion";
import { FaVideo, FaCode } from "react-icons/fa";

export const Projectcard = ({
  project: { title, imageSrc, description, skills, demo, source },
  index,
  isInView,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        <motion.img
          src={imageSrc}
          alt={title}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, id) => (
            <span
              key={id}
              className="px-3 py-1 bg-gradient-to-r from-teal/10 to-olive/10 text-teal-dark text-sm font-medium rounded-full border border-teal/20"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal to-teal-dark text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <FaVideo /> Demo Video
          </motion.a>
          <motion.a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-teal text-teal font-semibold rounded-lg hover:bg-teal hover:text-white transition-all duration-300"
          >
            <FaCode /> Source Code
          </motion.a>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-teal/5 to-olive/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
    </motion.div>
  );
};

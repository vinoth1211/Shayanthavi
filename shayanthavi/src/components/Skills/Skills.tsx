"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getIconSmall } from "@/lib/iconMap";
import type { SkillsData } from "@/lib/content/types";

interface SkillsProps {
  data: SkillsData;
}

export function Skills({ data }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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
            {data.heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {data.items.map((skill, index) => (
            <motion.div
              key={skill.id ?? skill.name}
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
                {getIconSmall(skill.iconKey)}
              </motion.div>
              <h4 className="font-semibold text-gray-900 text-center text-sm">{skill.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

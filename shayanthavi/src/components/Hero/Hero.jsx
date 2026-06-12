import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import heroImage from "../../../assets/hero/heroImage.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-olive-light/20">
      {/* Diagonal Background Split */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-olive/10 transform -skew-y-6 origin-top-left"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-olive text-lg font-medium uppercase tracking-wider">
              HELLO! I'M
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mt-2">
              Shayanthavi Tharmananthan
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 font-light"
          >
            Creative Computer Engineering Undergraduate & Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-teal font-medium"
          >
            University of Ruhuna
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-6"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-teal to-teal-dark text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Hire Me
            </motion.a>
            <motion.a
              href="/assets/cv/Shayanthavi-Tharmananthan.pdf"
              download="Shayanthavi-Tharmananthan.pdf"
              whileHover={{ scale: 1.05, backgroundColor: "#4a7c8c" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-teal text-teal font-semibold rounded-full hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <FaDownload /> Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative z-10">
            <img 
              src={heroImage} 
              alt="Shayanthavi Tharmananthan" 
              className="w-80 h-auto md:w-[450px] object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(74, 124, 140, 0.3))' }}
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-teal/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-olive/10 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

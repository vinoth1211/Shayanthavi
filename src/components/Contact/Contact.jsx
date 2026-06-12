import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: <HiMail className="w-6 h-6" />,
      label: "Email",
      value: "sayanthavitharmaa13@gmail.com",
      link: "mailto:sayanthavitharmaa13@gmail.com",
    },
    {
      icon: <HiPhone className="w-6 h-6" />,
      label: "Phone",
      value: "+94 763650199",
      link: "tel:+94763650199",
    },
    {
      icon: <HiLocationMarker className="w-6 h-6" />,
      label: "Location",
      value: "No.15/1, Krishnar kovil road,Kallady, Batticaloa, Sri Lanka",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      name: "GitHub",
      url: "https://github.com/Shayanthavi",
      color: "#333",
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shayanthavi-tharmananthan/",
      color: "#0077B5",
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      name: "Instagram",
      url: "https://www.instagram.com/saya_aananth/",
      color: "#E4405F",
    },
  ];

  return (
    <footer id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-olive/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Info</h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-teal mt-1">{info.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-900 hover:text-teal transition-colors text-sm"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 text-sm">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-teal transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-600 hover:text-teal transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-600 hover:text-teal transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-teal transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Me</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: social.color,
                    borderWidth: "2px",
                  }}
                >
                  <span style={{ color: social.color }}>
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
            <p className="text-gray-600 text-sm mt-6">
              Feel free to connect with me on social media or reach out via email!
            </p>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-gray-600">
            © {new Date().getFullYear()} Saya Aananth. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

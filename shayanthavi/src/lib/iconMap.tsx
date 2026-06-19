import type { IconType } from "react-icons";
import {
  FaLaptopCode,
  FaServer,
  FaPalette,
  FaBrain,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
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

export const iconMap: Record<string, IconType> = {
  FaLaptopCode,
  FaServer,
  FaPalette,
  FaBrain,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  HiMail,
  HiPhone,
  HiLocationMarker,
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
};

export const iconOptions = Object.keys(iconMap).sort();

export function getIcon(key: string, className = "w-12 h-12") {
  const Icon = iconMap[key];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export function getIconSmall(key: string) {
  const Icon = iconMap[key];
  if (!Icon) return null;
  return <Icon />;
}

import { config } from "dotenv";
config({ path: ".env.local" });
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../drizzle/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Seeding database...");

  await db.delete(schema.projectScreenshots);
  await db.delete(schema.portfolioProjects);
  await db.delete(schema.experienceProjects);
  await db.delete(schema.experiencePositions);
  await db.delete(schema.skillItems);
  await db.delete(schema.aboutCards);
  await db.delete(schema.adminUsers);
  await db.delete(schema.contactSection);
  await db.delete(schema.projectsSection);
  await db.delete(schema.experienceSection);
  await db.delete(schema.skillsSection);
  await db.delete(schema.aboutSection);
  await db.delete(schema.hero);
  await db.delete(schema.siteSettings);

  await db.insert(schema.siteSettings).values({
    siteTitle: "Shayanthavi Tharmananthan | Portfolio",
    metaDescription:
      "Portfolio of Shayanthavi Tharmananthan - Computer Engineering Undergraduate & Developer at University of Ruhuna",
    logoInitials: "ST",
    footerCopyright: "Shayanthavi Tharmananthan",
    navItems: [
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Experience", href: "#experience" },
      { name: "Projects", href: "#projects" },
      { name: "Contact", href: "#contact" },
    ],
  });

  await db.insert(schema.hero).values({
    greeting: "HELLO! I'M",
    name: "Shayanthavi Tharmananthan",
    tagline: "Creative Computer Engineering Undergraduate & Developer",
    university: "University of Ruhuna",
    heroImageUrl: "/assets/hero/heroImage.png",
    cvUrl: "/assets/cv/Shayanthavi-Tharmananthan.pdf",
    cvDownloadName: "Shayanthavi-Tharmananthan.pdf",
    ctaLabel: "Hire Me",
    ctaHref: "#contact",
  });

  const [aboutSec] = await db
    .insert(schema.aboutSection)
    .values({
      heading: "About Me",
      intro:
        "I'm a passionate Computer Engineering undergraduate at the University of Ruhuna, specializing in full-stack development, UI/UX design, and machine learning.",
    })
    .returning();

  await db.insert(schema.aboutCards).values([
    {
      aboutSectionId: aboutSec.id,
      title: "Frontend Developer",
      description: "I am a frontend developer with a passion for creating user-friendly interfaces.",
      iconKey: "FaLaptopCode",
      gradient: "from-teal to-teal-dark",
      sortOrder: 0,
    },
    {
      aboutSectionId: aboutSec.id,
      title: "Backend Developer",
      description: "I am a backend developer focused on building robust and scalable APIs.",
      iconKey: "FaServer",
      gradient: "from-olive to-olive-light",
      sortOrder: 1,
    },
    {
      aboutSectionId: aboutSec.id,
      title: "UI Designer",
      description: "I am a UI designer with a passion for creating visually appealing and user-friendly designs.",
      iconKey: "FaPalette",
      gradient: "from-teal-dark to-teal",
      sortOrder: 2,
    },
    {
      aboutSectionId: aboutSec.id,
      title: "Machine Learning Enthusiast",
      description: "I explore ML models for intelligent automation and predictive analytics.",
      iconKey: "FaBrain",
      gradient: "from-olive-light to-olive",
      sortOrder: 3,
    },
  ]);

  await db.insert(schema.skillsSection).values({
    heading: "Technologies & Tools",
    subtitle: "Technologies and tools I use to bring ideas to life",
  });

  await db.insert(schema.skillItems).values([
    { name: "React", iconKey: "SiReact", color: "#61DAFB", sortOrder: 0 },
    { name: "JavaScript", iconKey: "SiJavascript", color: "#F7DF1E", sortOrder: 1 },
    { name: "HTML5", iconKey: "SiHtml5", color: "#E34F26", sortOrder: 2 },
    { name: "CSS3", iconKey: "SiCss3", color: "#1572B6", sortOrder: 3 },
    { name: "Tailwind CSS", iconKey: "SiTailwindcss", color: "#06B6D4", sortOrder: 4 },
    { name: "Material UI", iconKey: "SiMui", color: "#007FFF", sortOrder: 5 },
    { name: "Node.js", iconKey: "SiNodedotjs", color: "#339933", sortOrder: 6 },
    { name: "Express.js", iconKey: "SiExpress", color: "#000000", sortOrder: 7 },
    { name: "MySQL", iconKey: "SiMysql", color: "#4479A1", sortOrder: 8 },
    { name: "Git", iconKey: "SiGit", color: "#F05032", sortOrder: 9 },
    { name: "Postman", iconKey: "SiPostman", color: "#FF6C37", sortOrder: 10 },
    { name: "Figma", iconKey: "SiFigma", color: "#F24E1E", sortOrder: 11 },
    { name: "Electron.js", iconKey: "SiElectron", color: "#47848F", sortOrder: 12 },
    { name: "Python", iconKey: "SiPython", color: "#3776AB", sortOrder: 13 },
    { name: "TensorFlow", iconKey: "SiTensorflow", color: "#FF6F00", sortOrder: 14 },
    { name: "scikit-learn", iconKey: "SiScikitlearn", color: "#F7931E", sortOrder: 15 },
  ]);

  await db.insert(schema.experienceSection).values({
    heading: "Experience",
    subtitle: "Building innovative solutions at the forefront of technology",
  });

  const [position] = await db
    .insert(schema.experiencePositions)
    .values({
      role: "Intern Software Engineer",
      company: "Neirah Tech Solutions Pvt. Ltd.",
      duration: "Present",
      location: "Sri Lanka",
      sortOrder: 0,
    })
    .returning();

  await db.insert(schema.experienceProjects).values([
    {
      positionId: position.id,
      name: "Jewellery Shop POS System",
      description:
        "Developed a comprehensive Point of Sale system for jewellery shops with inventory management, billing, and customer tracking features. Built as a full-stack desktop application.",
      role: "Full Stack Developer",
      technologies: [
        { name: "React", iconKey: "SiReact", color: "#61DAFB" },
        { name: "Node.js", iconKey: "SiNodedotjs", color: "#339933" },
        { name: "Express.js", iconKey: "SiExpress", color: "#000000" },
        { name: "MySQL", iconKey: "SiMysql", color: "#4479A1" },
        { name: "Electron.js", iconKey: "SiElectron", color: "#47848F" },
      ],
      highlights: [
        "Complete end-to-end development",
        "Desktop application using Electron.js",
        "Real-time inventory tracking",
        "User-friendly billing interface",
      ],
      sortOrder: 0,
    },
    {
      positionId: position.id,
      name: "Security Assignment System",
      description:
        "Built a web application for efficiently managing security worker assignments, scheduling, and client sites. Features quick assignment capabilities, automated scheduling, and comprehensive reporting.",
      role: "Full Stack Developer",
      technologies: [
        { name: "React", iconKey: "SiReact", color: "#61DAFB" },
        { name: "Node.js", iconKey: "SiNodedotjs", color: "#339933" },
        { name: "Express.js", iconKey: "SiExpress", color: "#000000" },
        { name: "MySQL", iconKey: "SiMysql", color: "#4479A1" },
      ],
      highlights: [
        "Smart scheduling algorithm",
        "Client & worker management",
        "Automated report generation",
        "User-friendly assignment interface",
      ],
      sortOrder: 1,
    },
  ]);

  await db.insert(schema.projectsSection).values({
    heading: "My Projects",
    subtitle: "Showcasing innovative solutions with cutting-edge technology",
  });

  const projectScreenshots = [
    "/assets/projects/project1/mock1.png",
    "/assets/projects/project1/ss1.png",
    "/assets/projects/project1/ss2.png",
    "/assets/projects/project1/ss3.png",
    "/assets/projects/project1/ss4.png",
  ];

  const project2Screenshots = [
    "/assets/projects/project2/mock2.png",
    "/assets/projects/project2/ss1.png",
    "/assets/projects/project2/ss2.png",
    "/assets/projects/project2/ss3.png",
    "/assets/projects/project2/ss4.png",
  ];

  const [project1] = await db
    .insert(schema.portfolioProjects)
    .values({
      title: "Project 1",
      description:
        "An innovative solution featuring cutting-edge technology and elegant design patterns. Built with modern frameworks and best practices.",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      demoUrl: "https://drive.google.com/file/d/1hDV0mHeQMd5OlJM1X_BxwbnU4TEvjlgT/view?usp=drive_link",
      mainImageUrl: "/assets/projects/project1/mock1.png",
      color: "from-teal to-teal-dark",
      bgGradient: "from-teal/10 to-olive/10",
      sortOrder: 0,
    })
    .returning();

  await db.insert(schema.projectScreenshots).values(
    projectScreenshots.map((url, i) => ({
      projectId: project1.id,
      imageUrl: url,
      sortOrder: i,
    }))
  );

  const [project2] = await db
    .insert(schema.portfolioProjects)
    .values({
      title: "FitTrack AI - AI-Powered Fitness & Health Tracker",
      description:
        "Revolutionary AI-powered fitness and health tracking application that helps users achieve their wellness goals with personalized insights and real-time monitoring.",
      skills: ["AI/ML", "Python", "TensorFlow", "React"],
      demoUrl:
        "https://www.linkedin.com/posts/shayanthavi-tharmananthan_fittrack-ai-ai-powered-fitness-health-activity-7388053533176225792-Imym?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEeOJRMBfGXNS0T2SdH7Y56hHwy-LxnyyHk",
      mainImageUrl: "/assets/projects/project2/mock2.png",
      color: "from-olive to-teal",
      bgGradient: "from-olive/10 to-teal/10",
      sortOrder: 1,
    })
    .returning();

  await db.insert(schema.projectScreenshots).values(
    project2Screenshots.map((url, i) => ({
      projectId: project2.id,
      imageUrl: url,
      sortOrder: i,
    }))
  );

  await db.insert(schema.contactSection).values({
    heading: "Let's Connect",
    subtitle: "Have a project in mind or just want to chat? Feel free to reach out!",
    email: "sayanthavitharmaa13@gmail.com",
    phone: "+94 763650199",
    location: "No.15/1, Krishnar kovil road,Kallady, Batticaloa, Sri Lanka",
    socialLinks: [
      {
        name: "GitHub",
        url: "https://github.com/Shayanthavi",
        iconKey: "FaGithub",
        color: "#333",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/shayanthavi-tharmananthan/",
        iconKey: "FaLinkedin",
        color: "#0077B5",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/saya_aananth/",
        iconKey: "FaInstagram",
        color: "#E4405F",
      },
    ],
    socialNote: "Feel free to connect with me on social media or reach out via email!",
  });

  const adminEmail = process.env.ADMIN_EMAIL || "admin@portfolio.local";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await db.insert(schema.adminUsers).values({
    email: adminEmail,
    passwordHash,
  });

  console.log("Seed complete!");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

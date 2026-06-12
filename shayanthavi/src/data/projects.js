// Import project screenshots - Mock images first
import ss1_mock from "../../assets/ss1/mock1.png";
import ss1_1 from "../../assets/ss1/Screenshot 2025-10-31 140130.png";
import ss1_2 from "../../assets/ss1/Screenshot 2025-10-31 142827.png";
import ss1_3 from "../../assets/ss1/Screenshot 2025-10-31 143027.png";
import ss1_4 from "../../assets/ss1/image.png";

import ss2_mock from "../../assets/ss2/mock2.png";
import ss2_1 from "../../assets/ss2/Screenshot 2025-10-31 144217.png";
import ss2_2 from "../../assets/ss2/Screenshot 2025-10-31 144306.png";
import ss2_3 from "../../assets/ss2/Screenshot 2025-10-31 144424.png";
import ss2_4 from "../../assets/ss2/Screenshot 2025-10-31 161238.png";

export const projects = [
  {
    title: "Project 1",
    description: "An innovative solution featuring cutting-edge technology and elegant design patterns. Built with modern frameworks and best practices.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    demo: "https://drive.google.com/file/d/1hDV0mHeQMd5OlJM1X_BxwbnU4TEvjlgT/view?usp=drive_link",
    screenshots: [ss1_mock, ss1_1, ss1_2, ss1_3, ss1_4],
    mainImage: ss1_mock,
    color: "from-teal to-teal-dark",
    bgGradient: "from-teal/10 to-olive/10"
  },
  {
    title: "FitTrack AI - AI-Powered Fitness & Health Tracker",
    description: "Revolutionary AI-powered fitness and health tracking application that helps users achieve their wellness goals with personalized insights and real-time monitoring.",
    skills: ["AI/ML", "Python", "TensorFlow", "React"],
    demo: "https://www.linkedin.com/posts/shayanthavi-tharmananthan_fittrack-ai-ai-powered-fitness-health-activity-7388053533176225792-Imym?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEeOJRMBfGXNS0T2SdH7Y56hHwy-LxnyyHk",
    screenshots: [ss2_mock, ss2_1, ss2_2, ss2_3, ss2_4],
    mainImage: ss2_mock,
    color: "from-olive to-teal",
    bgGradient: "from-olive/10 to-teal/10"
  }
];

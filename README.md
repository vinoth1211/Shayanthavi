<<<<<<< HEAD
# Saya Aananth - Portfolio

A professional, elegant, and animated personal portfolio website for **Saya Aananth** - Computer Engineering Undergraduate at the University of Ruhuna. Built with modern web technologies featuring a minimal, asymmetrical design with olive accents, smooth animations, and responsive layouts.

## ✨ Features

- **Modern Asymmetrical Design**: Clean white-gray background with olive/teal accents
- **Smooth Animations**: Framer Motion animations throughout (fade-in, slide-up, hover effects)
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Interactive Components**: Animated cards, skill bars, and project showcases
- **Contact Form**: Functional contact form with validation
- **WhatsApp Integration**: Floating WhatsApp button for instant messaging
- **Social Showcase**: GitHub, LinkedIn, and YouTube integration
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Built with Vite for lightning-fast loading

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Lottie**: Lottie React (for animated illustrations)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Fonts**: Poppins & Inter (Google Fonts)

## 📦 Project Structure

```
src/
├── components/            # React components
│   ├── About/            # About section with 4 animated cards
│   ├── Contact/          # Contact form & social links
│   ├── Hero/             # Landing section with asymmetrical design
│   ├── Navbar/           # Responsive navigation with scroll effects
│   ├── Projects/         # Portfolio projects with 3D cards
│   ├── Skills/           # Skills section with animated progress bars
│   └── WhatsAppFloat/    # Floating WhatsApp button
├── data/                 # Data files
│   └── projects.js       # Projects data
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles with Tailwind directives
```

## 🎨 Design System

### Color Palette
- **Olive Light**: `#d8c8b0` - Accent color
- **Olive**: `#a6b2a4` - Secondary accent
- **Teal**: `#4a7c8c` - Primary action color
- **Teal Dark**: `#2d5b7b` - Dark accent
- **Black**: `#000000` - Primary text

### Typography
- **Primary Font**: Poppins (headings, bold elements)
- **Secondary Font**: Inter (body text)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Customization Guide

### 1. Personal Information

**Hero Section** (`src/components/Hero/Hero.jsx`):
- Update name, title, and university
- Change CV download link
- Replace profile image

**Contact Section** (`src/components/Contact/Contact.jsx`):
- Update email, phone, and location in `contactInfo` array
- Modify social media links in `socialLinks` array

**WhatsApp Button** (`src/components/WhatsAppFloat/WhatsAppFloat.jsx`):
- Update `whatsappNumber` with your actual number

### 2. Projects

Edit `src/data/projects.js`:
```javascript
export const projects = [
  {
    title: "Your Project Name",
    imageSrc: projectImage, // Import at top of file
    description: "Brief 2-line description",
    skills: ["React", "Node.js", "etc"],
    demo: "https://linkedin.com/posts/...", // LinkedIn video
    source: "https://github.com/yourrepo"
  }
];
```

### 3. Skills

Edit skill categories in `src/components/Skills/Skills.jsx`:
- Add/remove skills in `skillCategories` array
- Update skill levels (0-100)
- Change skill icons from `react-icons/si`

### 4. About Section

Modify `src/components/About/About.jsx`:
- Update intro paragraph
- Customize the 4 cards (title, description, icons, gradient colors)

### 5. Styling & Theme

**Tailwind Config** (`tailwind.config.js`):
```javascript
colors: {
  olive: {
    light: '#d8c8b0',
    DEFAULT: '#a6b2a4',
  },
  teal: {
    DEFAULT: '#4a7c8c',
    dark: '#2d5b7b',
  }
}
```

**Global Styles** (`src/index.css`):
- Modify body background gradient
- Adjust default font family

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Method 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

### Environment Variables (if needed)

If you integrate email services or APIs, add environment variables in Vercel:
- Go to Project Settings → Environment Variables
- Add your variables (e.g., `VITE_EMAIL_SERVICE_ID`)

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## 📋 Post-Deployment Checklist

- [ ] Update all personal information
- [ ] Replace placeholder images
- [ ] Add your actual projects
- [ ] Update contact details (email, phone, WhatsApp)
- [ ] Add your social media links
- [ ] Upload your CV to `/public/assets/cv/`
- [ ] Test all links and forms
- [ ] Check responsiveness on mobile devices
- [ ] Verify all animations work smoothly

## 🎯 Sections Overview

1. **Hero** - Asymmetrical landing with name, title, and CTA buttons
2. **About** - 4 animated cards showcasing your expertise
3. **Skills** - Animated progress bars for technical skills
4. **Projects** - Modern 3D cards with demo videos and source code links
5. **Contact** - Functional form with social media integration
6. **WhatsApp Float** - Sticky button for instant messaging

## 👥 Contact

**Saya Aananth** - Computer Engineering Undergraduate

**University**: University of Ruhuna

**Email**: saya.aananth@example.com

**Location**: Matara, Sri Lanka

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
=======
# 💻 Hi, I'm Shayanthavi Tharmananthan 
### 🚀 Computer Engineering Student | Full-Stack Developer | UI/UX Enthusiast

📧 **Email:** [sayanthavitharmaal3@gmail.com](mailto:sayanthavitharmaa13@gmail.com)  
📞 **Phone:** +94 76 365 0199  
📍 **Location:** Galle, Sri Lanka  
🔗 **GitHub:** [Shayanthavi](https://github.com/Shayanthavi)  

---

### 🌟 About Me
- 🎓 **BSc in Computer Engineering** at University of Ruhuna (2022–Present)  
- 🔧 **Skills:** Full-Stack Dev (Spring Boot, React), DevOps (Docker, Jenkins), UI/UX (Figma, Adobe XD)  
- 🏆 **Achievements:** 1.7260 Z-Score in A/Ls, HackerRank Problem Solving Certified  
- 🌱 **Currently Exploring:** MERN Stack & Machine Learning  
- ✨ **Passion Projects:** Building scalable systems and intuitive interfaces  

---

### 🛠️ Tech Stack  
#### **Languages**  
![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)

#### **Frameworks & Tools**  
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

---

### 🏗️ Featured Projects  
#### **1. University MIS (Ongoing)**  
✅ Role-based auth for students/lecturers | Spring Boot + React + PostgreSQL  
🔗 [GitHub Link](#)  

#### **2. Employee Management System**  
✅ CRUD operations for employees | Spring Boot + React + MySQL  
🔗 [GitHub Link](#)  

#### **3. Handwritten Digit Recognizer (ML)**  
✅ 98.6% accuracy with SVM | Python + Scikit-learn  
🔗 [GitHub Link](#)  

#### **4. Multiplayer Bike Game (Java)**  
✅ Real-time socket programming + multithreading  
🔗 [GitHub Link](#)  

---

## 📊 GitHub Analytics
[![GitHub Stats](https://github-readme-stats.vercel.app/api?username=Shayanthavi&show_icons=true&theme=radical&hide_border=true)](https://github.com/Shayanthavi)  
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=Shayanthavi&layout=compact&theme=radical&hide_border=true)](https://github.com/Shayanthavi)  
---

### 🎨 Beyond Code  
- 🎤 **Extracurricular:** Teaching physics to A/L students (Education Incentive Association)  
- 🎨 **Design:** UI/UX prototyping in Figma/Adobe XD  
- 📚 **Reading:** Tech blogs on DevOps best practices  

---

### 📬 Let’s Connect!  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)



[![Visitors](https://komarev.com/ghpvc/?username=Shayanthav&color=blueviolet&label=Profile+Views)](https://github.com/Shayanthavi)  
>>>>>>> ebdc4197caa5e3f479a16bf3ca1cc9dd220b4811

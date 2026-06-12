# Portfolio Customization Guide

This guide will help you customize the portfolio with your personal information, projects, and preferences.

## 📝 Step-by-Step Customization

### 1. Personal Information

#### Hero Section
**File**: `src/components/Hero/Hero.jsx`

```javascript
// Line 30: Update your name
<h1 className="text-5xl md:text-7xl font-bold text-gray-900 mt-2">
  Your Full Name  // Change "Saya Aananth" to your name
</h1>

// Line 40: Update your title/tagline
<motion.p className="text-xl md:text-2xl text-gray-600 font-light">
  Your Professional Title & Description
</motion.p>

// Line 49: Update your university
<motion.p className="text-lg text-teal font-medium">
  Your University Name
</motion.p>

// Line 67: Update CV file path
<motion.a
  href="/assets/cv/Your_Name_CV.pdf"
  download="Your_Name_CV.pdf"
```

**Don't forget to**:
- Upload your CV to `public/assets/cv/Your_Name_CV.pdf`
- Replace profile image (currently placeholder)

---

### 2. About Section
**File**: `src/components/About/About.jsx`

```javascript
// Line 54-57: Update intro paragraph
<p className="text-lg text-gray-600 max-w-3xl mx-auto">
  Write your own introduction here. Talk about your background,
  specializations, and what makes you unique.
</p>

// Line 11-36: Customize the 4 cards
const cards = [
  {
    icon: <HiLaptop className="w-12 h-12" />,
    title: "Your Skill Title",
    description: "Your skill description",
    gradient: "from-blue-400 to-cyan-500",
  },
  // Add or modify cards as needed
];
```

---

### 3. Skills Section
**File**: `src/components/Skills/Skills.jsx`

Update the `skillCategories` array (starting at line 23):

```javascript
const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { 
        name: "React", 
        icon: <SiReact />, 
        level: 90,  // Your proficiency level (0-100)
        color: "#61DAFB" 
      },
      // Add more skills...
    ],
  },
  // Add more categories...
];
```

**Available Icon Libraries**:
- `react-icons/si` - Simple Icons (technology brands)
- `react-icons/hi2` - Hero Icons v2
- `react-icons/fa` - Font Awesome

**To add new skills**:
1. Import the icon: `import { SiYourTech } from "react-icons/si";`
2. Add to skills array with name, icon, level, and brand color

---

### 4. Projects Section
**File**: `src/data/projects.js`

```javascript
// Import project images at the top
import project1Img from "../../assets/projects/your-project.png";

export const projects = [
  {
    title: "Project Name",
    imageSrc: project1Img,
    description: "Brief 2-line description of your project",
    skills: ["React", "Node.js", "MongoDB"], // Tech stack
    demo: "https://linkedin.com/posts/your-demo-video",
    source: "https://github.com/yourusername/repo"
  },
  // Add more projects...
];
```

**Steps to add a new project**:
1. Add project screenshot to `assets/projects/`
2. Import the image at the top of `projects.js`
3. Add project object to the array
4. Update demo link (LinkedIn video URL)
5. Update source link (GitHub repo URL)

---

### 5. Contact Information
**File**: `src/components/Contact/Contact.jsx`

```javascript
// Line 27-46: Update contact details
const contactInfo = [
  {
    icon: <HiMail className="w-6 h-6" />,
    label: "Email",
    value: "your.email@example.com",
    link: "mailto:your.email@example.com",
  },
  {
    icon: <HiPhone className="w-6 h-6" />,
    label: "Phone",
    value: "+94 XX XXX XXXX",
    link: "tel:+94XXXXXXXXX",
  },
  {
    icon: <HiLocationMarker className="w-6 h-6" />,
    label: "Location",
    value: "Your City, Country",
    link: null,
  },
];

// Line 48-67: Update social media links
const socialLinks = [
  {
    icon: <FaGithub className="w-6 h-6" />,
    name: "GitHub",
    url: "https://github.com/yourusername",
    color: "#333",
  },
  {
    icon: <FaLinkedin className="w-6 h-6" />,
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    color: "#0077B5",
  },
  {
    icon: <FaYoutube className="w-6 h-6" />,
    name: "YouTube",
    url: "https://youtube.com/@yourusername",
    color: "#FF0000",
  },
];
```

---

### 6. WhatsApp Integration
**File**: `src/components/WhatsAppFloat/WhatsAppFloat.jsx`

```javascript
// Line 6: Update your WhatsApp number
const whatsappNumber = "+94XXXXXXXXX"; // Your number with country code
```

---

### 7. Page Title & Meta Tags
**File**: `index.html`

```html
<!-- Line 7: Update description -->
<meta name="description" content="Your Name - Your Title at University" />

<!-- Line 11: Update title -->
<title>Your Name | Portfolio</title>
```

---

### 8. Navbar Branding
**File**: `src/components/Navbar/Navbar.jsx`

```javascript
// Line 44: Update initials/logo
<motion.a href="/" className="text-2xl font-bold font-poppins">
  YN  // Your initials
</motion.a>
```

---

## 🎨 Customizing Colors

### Tailwind Configuration
**File**: `tailwind.config.js`

```javascript
colors: {
  olive: {
    light: '#d8c8b0',  // Change to your preferred color
    DEFAULT: '#a6b2a4',
  },
  teal: {
    DEFAULT: '#4a7c8c',  // Primary color
    dark: '#2d5b7b',     // Darker shade
  },
}
```

### Gradients
Find and replace gradient classes throughout components:
- `from-teal to-teal-dark` - Primary gradient
- `from-olive/10 to-teal/10` - Subtle backgrounds

---

## 📸 Adding Images

### Profile Image
**File**: `src/components/Hero/Hero.jsx`
- Currently using a placeholder (📷 emoji)
- Replace with: `<img src={yourImage} alt="Profile" className="w-full h-full object-cover rounded-full" />`
- Import image at top: `import yourImage from "../../../assets/hero/profile.jpg";`

### Project Screenshots
1. Add images to `assets/projects/`
2. Supported formats: PNG, JPG, WebP
3. Recommended size: 800x600px or 16:9 ratio
4. Optimize images before uploading

---

## 🔧 Advanced Customization

### Animation Speed
Adjust Framer Motion `duration` and `delay` values in components:
```javascript
transition={{ duration: 0.6, delay: 0.2 }}
```

### Scroll Margins
Adjust when animations trigger:
```javascript
useInView(ref, { once: true, margin: "-100px" })
```

### Card Gradients (About Section)
Change gradient colors in `cards` array:
```javascript
gradient: "from-blue-400 to-cyan-500"
```

Available Tailwind gradients:
- `from-purple-400 to-pink-500`
- `from-green-400 to-teal-500`
- `from-orange-400 to-red-500`
- `from-yellow-400 to-orange-500`

---

## ✅ Testing Checklist

After customization:

- [ ] All personal information updated
- [ ] Images replaced and optimized
- [ ] CV file uploaded and linked correctly
- [ ] All social media links working
- [ ] WhatsApp number correct
- [ ] Contact form submits properly
- [ ] Projects display correctly
- [ ] Mobile responsiveness checked
- [ ] All animations smooth
- [ ] No console errors
- [ ] Build completes: `npm run build`

---

## 🚀 Ready to Deploy?

Once you've customized everything:

```bash
# Build the project
npm run build

# Test the production build locally
npm run preview

# Deploy to Vercel
vercel
```

See `README.md` for detailed deployment instructions.

---

## 💡 Tips

1. **Test Frequently**: Run `npm run dev` and check changes in browser
2. **Backup**: Create a backup before major changes
3. **Commit Often**: Use Git to save your progress
4. **Mobile First**: Always test on mobile devices
5. **Performance**: Keep images under 500KB each
6. **Accessibility**: Ensure good color contrast and alt texts

---

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify all imports are correct
3. Ensure image paths are accurate
4. Run `npm install` if dependencies are missing
5. Clear cache and restart dev server

Good luck with your portfolio! 🎉

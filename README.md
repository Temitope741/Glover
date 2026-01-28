# 🚀 3D Animated Portfolio - Temitope Glover

![Portfolio Preview](https://imgix.cosmicjs.com/1e401870-ebf4-11f0-a31c-ad849e04e6f2-photo-1507003211169-0a1dd7228f2d-1767809403957.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A stunning, premium 3D animated portfolio website built with Next.js 16 and React Three Fiber. Features immersive 3D visuals, smooth animations, and dynamic content powered by Cosmic CMS. Designed to showcase full-stack development expertise with a futuristic, professional aesthetic.

## ✨ Features

- **🎨 3D Animated Hero** - Full-screen 3D background with floating shapes, particles, and camera motion
- **💫 Typewriter Effects** - Dynamic text animations for hero titles and subtitles
- **🎯 Interactive Projects** - Floating 3D project cards with hover animations and detailed modals
- **📊 Animated Skills** - 3D skill cards organized by category with proficiency indicators
- **📅 Timeline Experience** - Animated 3D timeline for work history and projects
- **📧 Contact Form** - 3D-styled contact form with Cosmic CMS integration
- **🎭 Glassmorphism Design** - Premium frosted glass effects throughout
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **⚡ Performance Optimized** - Lazy loading, efficient 3D rendering, optimized bundle size
- **🎬 Smooth Animations** - Framer Motion for seamless page transitions and scroll effects

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=695e9d269594f775370f8e54&clone_repository=695eabfb9594f775370f97bc)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build a premium 3D animated personal portfolio website using React.js (nextjs only).
The site must be component-based, modern, and high-performance, designed to showcase a Full-Stack Software Developer with advanced UI and animation.
FRONTEND
React.js (JavaScript, no TypeScript)
Functional components and hooks
Clean component structure: Hero, About, Skills, Projects, Experience, Contact, Footer
3D visuals compatible with React (WebGL / Three.js–style rendering)
DESIGN & BRANDING
Premium, futuristic, and professional look
Smooth page transitions and scroll animations
Fully responsive (desktop, tablet, mobile)
Strict color palette (use consistently):
#9ECAD6 (primary CTAs)
#ABDFE8 (glows and highlights)
#84D9E4 (hover and interaction states)
#AADCD4 (cards and background gradients)
HERO SECTION (KEY FOCUS)
Full-screen 3D animated background with floating abstract shapes, particles, and subtle camera motion
Foreground content layered above the 3D scene
Writing / typewriter animation for text
Hero text content:
Name: Temitope Glover
Animated title and subtitles (typing effect):
"Full-Stack Developer"
"Building scalable web applications"
"Creating interactive digital experiences"
Hero CTAs:
Download CV (PDF download)
View My Work (smooth scroll to Projects section)
ABOUT SECTION
3D glassmorphism-style card
Brief professional summary highlighting JavaScript, React, Node.js, APIs
Animated skill indicators
SKILLS SECTION
Skills displayed as animated 3D cards or icons
Frontend: HTML, CSS, JavaScript, React, Next.js
Backend: Node.js, Express.js, MongoDB
Other: Git, GitHub, REST APIs, Cloud basics
PROJECTS SECTION
Floating 3D project cards with hover animations
Click to open animated modal
Include projects:
https://rhythmic-jiyf.onrender.com/

https://gym-fit-web.onrender.com/

https://tradesphere-wr1e.onrender.com
Gym System
Anonymous Advice Platform
Photography Website
E-commerce Store
PrintBlink (Printer Showcase Website)
Each project shows title, description, tech stack, live demo, and GitHub link.
EXPERIENCE
Animated 3D timeline for internships, and major projects
CONTACT
3D-styled contact form with animated focus states
Social links: GitHub, LinkedIn, Email
FOOTER
Minimal animated footer
Text: ©️ 2025 Temitope Glover. All Rights Reserved.
INTERACTION & PERFORMANCE
Smooth scrolling and transitions
Mouse-move parallax
Lazy loading of 3D assets
Optimized React bundle
The final result should be a production-grade React 3D animated portfolio that feels modern, professional, and impressive to recruiters and clients."

### Code Generation Prompt

> Based on the content model I created for the premium 3D animated portfolio website, now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **React Three Fiber** - 3D graphics with Three.js
- **@react-three/drei** - 3D helpers and abstractions
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **TypeScript** - Type-safe development

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Basic knowledge of React and Next.js

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Portfolio Settings

```typescript
import { cosmic } from '@/lib/cosmic'

export async function getPortfolioSettings() {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'portfolio-settings',
        slug: 'portfolio-settings'
      })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    return object
  } catch (error) {
    console.error('Error fetching portfolio settings:', error)
    return null
  }
}
```

### Fetching Projects

```typescript
export async function getProjects() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Sort by order field
    return objects.sort((a, b) => {
      const orderA = a.metadata?.order || 999
      const orderB = b.metadata?.order || 999
      return orderA - orderB
    })
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Submitting Contact Form

```typescript
export async function submitContactForm(formData) {
  try {
    const { object } = await cosmic.objects.insertOne({
      type: 'contact-submissions',
      title: `Contact from ${formData.name}`,
      metadata: {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        submission_date: new Date().toISOString()
      }
    })
    
    return { success: true, object }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: error.message }
  }
}
```

## 🔗 Cosmic CMS Integration

This portfolio is powered by Cosmic CMS with the following content types:

- **Portfolio Settings** (Singleton) - Personal info, profile image, social links, animated subtitles
- **Projects** - Project showcases with images, descriptions, tech stacks, and links
- **Skills** - Technical skills organized by category with proficiency levels
- **Experience** - Work history timeline with company details and descriptions
- **Contact Submissions** - Form submissions from visitors

All content can be easily managed through the Cosmic dashboard without touching code.

## 🌐 Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Connect your Git repository
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy!

## 🎨 Design System

### Color Palette

- **Primary CTAs**: `#9ECAD6`
- **Glows/Highlights**: `#ABDFE8`
- **Hover States**: `#84D9E4`
- **Backgrounds**: `#AADCD4`

### Typography

- **Headings**: Inter font family
- **Body**: Inter font family
- Smooth typewriter animations for hero text

### 3D Elements

- Floating abstract shapes and particles
- Glassmorphism effects with depth
- Smooth camera movements
- Lazy-loaded for performance

## 📄 License

MIT License - feel free to use this portfolio template for your own projects!

## 🙏 Acknowledgments

- Built with [Cosmic CMS](https://www.cosmicjs.com)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

---

**© 2025 Temitope Glover. All Rights Reserved.**

<!-- README_END -->#   B u i l d   f i x  
 
'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import { PortfolioSettings, Project, Skill, Experience as ExperienceType } from '@/types'
import { getPortfolioSettings, getProjects, getSkills, getExperience } from '@/lib/cosmic'

console.log('Env vars:', {
  bucket: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY
})

const defaultSettings: PortfolioSettings = {
  id: 'default',
  slug: 'default-settings',
  title: 'Portfolio Settings',
  type: 'portfolio-settings',
  created_at: new Date().toISOString(),
  modified_at: new Date().toISOString(),
  metadata: {
    full_name: 'Temitope Glover',
    job_title: 'Full Stack Developer',
    email: 'Topeglover06@gmail.com',
    about_me: 'Passionate Full-Stack Developer with expertise in JavaScript, React, Node.js, and modern web technologies.',
    github_url: 'https://github.com/Temitope741',
    linkedin_url: '',
    twitter_url: '',
    animated_subtitles: [
      'Building scalable web applications',
      'Creating interactive digital experiences',
      'Turning ideas into reality with code'
    ],
    profile_image: {
      url: 'https://cdn.cosmicjs.com/5c293340-f8ad-11f0-a549-3b8c82c059da-WhatsApp-Image-2026-01-21-at-01-19-23.jpeg',
      imgix_url: 'https://imgix.cosmicjs.com/5c293340-f8ad-11f0-a549-3b8c82c059da-WhatsApp-Image-2026-01-21-at-01-19-23.jpeg'
    },
    resume_pdf: {
      url: '/resume.pdf',
      imgix_url: '/resume.pdf'
    }
  }
}

export default function Home() {
  const [settings, setSettings] = useState<PortfolioSettings>(defaultSettings)
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [experience, setExperience] = useState<ExperienceType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch settings
        const settingsData = await getPortfolioSettings()
        if (settingsData) {
          setSettings(settingsData as PortfolioSettings)
        }

        // Fetch projects
        const projectsData = await getProjects()
        console.log('Fetched projects:', projectsData)
        setProjects(projectsData as Project[])

        // Fetch skills
        const skillsData = await getSkills()
        setSkills(skillsData as Skill[])

        // Fetch experience
        const experienceData = await getExperience()
        setExperience(experienceData as ExperienceType[])

      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <main>
      <Navigation />
      <Hero settings={settings} />
      <About settings={settings} />
      <Skills skills={skills} />
      <Experience experience={experience} />
      <Projects projects={projects} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </main>
  )
}
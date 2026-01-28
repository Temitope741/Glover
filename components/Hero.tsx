'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { PortfolioSettings } from '@/types'

// Dynamically import Canvas components with no SSR
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false })
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false })
const Sphere = dynamic(() => import('@react-three/drei').then(mod => mod.Sphere), { ssr: false })
const MeshDistortMaterial = dynamic(() => import('@react-three/drei').then(mod => mod.MeshDistortMaterial), { ssr: false })

interface HeroProps {
  settings: PortfolioSettings
}

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#9ECAD6"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  )
}

function FloatingParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ],
    scale: Math.random() * 0.1 + 0.05,
  }))

  return (
    <>
      {particles.map((particle, i) => (
        <Sphere key={i} position={particle.position as [number, number, number]} args={[particle.scale, 8, 8]}>
          <meshBasicMaterial color="#ABDFE8" transparent opacity={0.6} />
        </Sphere>
      ))}
    </>
  )
}

function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <AnimatedSphere />
      <FloatingParticles />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}


export default function Hero({ settings }: HeroProps) {
  const [subtitleIndex, setSubtitleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const subtitles = settings.metadata?.animated_subtitles || [
    'Building scalable web applications',
    'Creating interactive digital experiences',
    'Turning ideas into reality with code'
  ]

  useEffect(() => {
    const subtitle = subtitles[subtitleIndex]
    const typingSpeed = isDeleting ? 50 : 100

    if (!isDeleting && displayedText === subtitle) {
      setTimeout(() => setIsDeleting(true), 2000)
      return
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false)
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1)
        } else {
         return subtitle?.slice(0, prev.length + 1) || prev
        }
      })
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, subtitleIndex, subtitles])

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background - Only render on client */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>
      )}

      {/* Fallback gradient background while 3D loads */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-glow"
        >
          {settings.metadata.full_name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-3xl text-primary font-semibold mb-6"
        >
          {settings.metadata.job_title}
        </motion.p>

        <div className="h-16 mb-8">
          <p className="text-xl md:text-2xl text-glow">
            {displayedText}
            <span className="animate-blink">|</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf.docx"
            download
            className="px-8 py-4 bg-primary text-gray-900 font-semibold rounded-lg hover:bg-hover transition-colors duration-200 shadow-lg"
          >
            Download CV
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className="px-8 py-4 glass-effect text-white font-semibold rounded-lg hover:border-primary transition-colors duration-200"
          >
            View My Work
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-3 bg-primary rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
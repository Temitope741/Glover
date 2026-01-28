'use client'

import { motion } from 'framer-motion'
import type { Experience } from '@/types'

interface ExperienceProps {
  experience: Experience[]
}

export default function Experience({ experience }: ExperienceProps) {
  if (!experience || experience.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <section id="experience" className="section-padding bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Experience</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10 ring-4 ring-gray-900" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-effect rounded-xl p-6 ml-16 md:ml-0"
                  >
                    {/* Type Badge */}
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-semibold mb-3">
                      {exp.metadata?.type?.value || 'Experience'}
                    </span>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {exp.metadata?.role || exp.title}
                    </h3>
                    <h4 className="text-lg text-primary mb-2">
                      {exp.metadata?.company_name}
                    </h4>

                    {/* Date Range */}
                    <p className="text-gray-400 text-sm mb-4">
                      {formatDate(exp.metadata?.start_date || '')} -{' '}
                      {exp.metadata?.end_date ? formatDate(exp.metadata.end_date) : 'Present'}
                    </p>

                    {/* Description */}
                    {exp.metadata?.description && (
                      <p className="text-gray-300 leading-relaxed">
                        {exp.metadata.description}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
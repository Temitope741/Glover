'use client'

import { motion } from 'framer-motion'
import { Project } from '@/types'  // ✅ CORRECT

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Project Image */}
        {project.metadata?.project_image && (
          <div className="relative h-64 md:h-96 overflow-hidden rounded-t-2xl">
            <img
              src={`${project.metadata.project_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={project.metadata.project_name || project.title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          </div>
        )}

        {/* Project Details */}
        <div className="p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {project.metadata?.project_name || project.title}
          </h2>

          {/* Technologies */}
          {project.metadata?.technologies && project.metadata.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.metadata.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-800 text-primary text-sm rounded-full font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="prose prose-invert max-w-none mb-6">
            {project.metadata?.full_description ? (
              <div dangerouslySetInnerHTML={{ __html: project.metadata.full_description }} />
            ) : (
              <p className="text-gray-300 text-lg">{project.metadata?.short_description}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.metadata?.live_demo_url && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.metadata.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-gray-900 font-semibold rounded-lg hover:bg-hover transition-colors duration-200"
              >
                View Live Demo
              </motion.a>
            )}
            {project.metadata?.github_url && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.metadata.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass-effect text-white font-semibold rounded-lg hover:border-primary transition-colors duration-200"
              >
                View on GitHub
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/types'
import ProjectModal from './ProjectModal'

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <>
      <section
        id="projects"
        className="section-padding bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Explore some of my recent work showcasing modern web development and full-stack applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="glass-effect rounded-xl overflow-hidden cursor-pointer group"
              >
                {/* Project Image */}
                {project.metadata?.project_image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${project.metadata.project_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                      alt={project.metadata.project_name || project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                    {project.metadata?.featured && (
                      <div className="absolute top-4 right-4 bg-primary text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                )}

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-200">
                    {project.metadata?.project_name || project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.metadata?.short_description}
                  </p>

                  {/* Technologies */}
                  {project.metadata?.technologies && project.metadata.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.metadata.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 text-primary text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.metadata.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                          +{project.metadata.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.metadata?.live_demo_url && (
                      <a
                        href={project.metadata.live_demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary hover:text-hover transition-colors duration-200 text-sm font-semibold"
                      >
                        Live Demo →
                      </a>
                    )}

                    {project.metadata?.github_url && (
                      <a
                        href={project.metadata.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary hover:text-hover transition-colors duration-200 text-sm font-semibold"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

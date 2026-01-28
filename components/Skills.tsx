'use client'

import { motion } from 'framer-motion'
import { Skill } from '@/types'

interface SkillsProps {
  skills: Skill[]
}

export default function Skills({ skills }: SkillsProps) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.metadata?.category?.value || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categories = ['Frontend', 'Backend', 'Tools & Other']

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const categorySkills = groupedSkills[category]
            
            if (!categorySkills || categorySkills.length === 0) {
              return null
            }

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-primary mb-6">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass-effect rounded-xl p-6 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {skill.metadata?.icon_emoji && (
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                              {skill.metadata.icon_emoji}
                            </span>
                          )}
                          <h4 className="text-lg font-semibold text-white">
                            {skill.metadata?.skill_name || skill.title}
                          </h4>
                        </div>
                      </div>

                      {skill.metadata?.proficiency_level && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Proficiency</span>
                            <span>{skill.metadata.proficiency_level}%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.metadata.proficiency_level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-primary to-hover rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
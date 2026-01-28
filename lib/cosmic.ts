import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG as string,
  readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY as string,
  writeKey: process.env.NEXT_PUBLIC_COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch portfolio settings (singleton)
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
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch portfolio settings')
  }
}

// Fetch all projects
export async function getProjects() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Sort by order field
    return objects.sort((a: any, b: any) => {
      const orderA = a.metadata?.order || 999
      const orderB = b.metadata?.order || 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch projects')
  }
}

// Fetch featured projects
export async function getFeaturedProjects() {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'projects',
        'metadata.featured': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects.sort((a: any, b: any) => {
      const orderA = a.metadata?.order || 999
      const orderB = b.metadata?.order || 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured projects')
  }
}

// Fetch all skills
export async function getSkills() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Sort by order field
    return objects.sort((a: any, b: any) => {
      const orderA = a.metadata?.order || 999
      const orderB = b.metadata?.order || 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch skills')
  }
}

// Fetch all experience
export async function getExperience() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'experience' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Sort by order field, then by start date
    return objects.sort((a: any, b: any) => {
      const orderA = a.metadata?.order || 999
      const orderB = b.metadata?.order || 999
      
      if (orderA !== orderB) {
        return orderA - orderB
      }
      
      const dateA = new Date(a.metadata?.start_date || '').getTime()
      const dateB = new Date(b.metadata?.start_date || '').getTime()
      return dateB - dateA // Most recent first
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch experience')
  }
}

// Submit contact form
export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}) {
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
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit form' 
    }
  }
}
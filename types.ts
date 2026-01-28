// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Portfolio Settings (Singleton)
export interface PortfolioSettings extends CosmicObject {
  type: 'portfolio-settings';
  metadata: {
    full_name: string;
    job_title: string;
    animated_subtitles?: string[];
    about_me: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    resume_pdf?: {
      url: string;
      imgix_url: string;
    };
    email: string;
    github_url?: string;
    linkedin_url?: string;
    twitter_url?: string;
  };
}

// Project
// export interface Project extends CosmicObject {
//   type: 'projects';
//   metadata: {
//     project_name: string;
//     short_description: string;
//     full_description?: string;
//     technologies?: string[];
//     project_image?: {
//       url: string;
//       imgix_url: string;
//     };
//     live_demo_url?: string;
//     github_url?: string;
//     featured?: boolean;
//     order?: number;
//   };
// }

interface projects {
    id: number;
    title: string;
    slug: string;
    metadata: {
      project_name: string;
      project_image: string;
      featured: boolean;
    };
}



// Skill
export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    skill_name: string;
    category: {
      key: 'frontend' | 'backend' | 'tools';
      value: 'Frontend' | 'Backend' | 'Tools & Other';
    };
    proficiency_level?: number;
    icon_emoji?: string;
    order?: number;
  };
}

// Experience
export interface Experience extends CosmicObject {
  type: 'experience';
  metadata: {
    company_name: string;
    role: string;
    description?: string;
    start_date: string;
    end_date?: string;
    type: {
      key: 'internship' | 'project' | 'freelance' | 'fulltime';
      value: 'Internship' | 'Major Project' | 'Freelance' | 'Full-Time';
    };
    order?: number;
  };
}

// Contact Submission
export interface ContactSubmission extends CosmicObject {
  type: 'contact-submissions';
  metadata: {
    name: string;
    email: string;
    message: string;
    submission_date?: string;
  };
}

// API Response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}
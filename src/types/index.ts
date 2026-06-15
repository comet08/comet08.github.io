export interface Profile {
  name: string
  nameEn: string
  title: string
  tagline?: string
  company: string
  years: number
  email: string
  location: string
  bio: string
  bioDetail: string
  currentFocus?: string
  interests: string[]
  stats: {
    yearsExperience: number
    projectsShipped: number
    teamSize: number
    openSourceContributions: number
  }
  social: {
    github: string
    linkedin: string
    twitter?: string
    blog?: string
  }
  resume: string
}

export type SkillLevel = 'expert' | 'proficient' | 'learning'

export interface Skill {
  name: string
  level: SkillLevel
  years: number
}

export interface SkillCategory {
  category: string
  icon: string
  description: string
  skills: Skill[]
}

export interface Experience {
  id: string
  company: string
  logo?: string
  role: string
  period: string
  startDate: string
  endDate: string | null
  isCurrent: boolean
  location: string
  description: string
  highlights: string[]
  tech: string[]
}

export interface SubProject {
  title: string
  description: string
  result: string
}

export interface PressItem {
  source: string
  title: string
  url: string
  date: string
}

export interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
  isPrivate?: boolean
  featured: boolean
  period?: string
  tags?: string[]
  subProjects?: SubProject[]
  press?: PressItem[]
}

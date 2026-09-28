import { ReactNode } from 'react'

export interface ProjectError {
  title: string
  problem: string
  solution: string
}

export interface Project {
  _id?: string
  id?: string
  title: string
  fullDescription: string
  thumbnail: string
  category: string
  status: string
  technologies: string[]
  features: string[]
  errors?: ProjectError[]
  lessonsLearned: string[]
  futurePlans?: string[]
  liveUrl?: string
  githubUrl?: string
  server?: string
  duration?: string
  team?: string
}

export type IntroStage = 'idle' | 'entering' | 'focus' | 'collapsing' | 'completed'

export interface QuickFact {
  icon: ReactNode
  label: string
  color: string
}

export interface EducationItem {
  degree: string
  institution: string
  year: string
  description: string
  grade: string
  icon: ReactNode
  color: string
  ongoing?: boolean
}

export interface CourseSkill {
  name: string
  icon: ReactNode
  color: string
}

export interface CourseData {
  name: string
  platform: string
  batch: string
  year: string
  icon: ReactNode
  color: string
  skills: CourseSkill[]
}

export interface CertificateItem {
  title: string
  issuer: string
  type: string
  link: string
  description: string
  icon: ReactNode
  badgeColor: string
}

export interface GoalItemData {
  label: string
  active?: boolean
  done?: boolean
}

export interface SkillItem {
  name: string
  level: number
  color: string
}

export interface SkillGroup {
  category: string
  skills: SkillItem[]
}

export interface ToolItem {
  name: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

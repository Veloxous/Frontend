// Veloxous — project data API client.
//
// Reads from NEXT_PUBLIC_API_URL when set (GET /projects, GET /projects/:id).
// Falls back to local mock data when the env var is absent or the request fails,
// so the click-through always works without a running backend.

import { HB_DATA, type Project } from '../data'
import { PROJECT_DETAILS, type ProjectDetail } from '../data/projectDetails'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface ProjectWithDetail {
  project: Project
  detail: ProjectDetail
}

export async function getProjects(): Promise<Project[]> {
  if (!API_URL) return HB_DATA.projects
  try {
    const res = await fetch(`${API_URL}/projects`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as Project[]
  } catch {
    console.warn('[api] GET /projects failed — using mock data')
    return HB_DATA.projects
  }
}

export async function getProject(id: number): Promise<ProjectWithDetail | null> {
  const mockProject = HB_DATA.projects.find((p) => p.id === id)
  const mockDetail = PROJECT_DETAILS[id]

  if (!API_URL) {
    if (!mockProject || !mockDetail) return null
    return { project: mockProject, detail: mockDetail }
  }

  try {
    const res = await fetch(`${API_URL}/projects/${id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as ProjectWithDetail
  } catch {
    console.warn(`[api] GET /projects/${id} failed — using mock data`)
    if (!mockProject || !mockDetail) return null
    return { project: mockProject, detail: mockDetail }
  }
}

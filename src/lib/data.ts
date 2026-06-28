import { DEFAULT_SETTINGS, type Project, type SiteSettings, type TeamMember } from '@/lib/types';
import { STATIC_PROJECTS, STATIC_TEAM } from '@/lib/fallback-data';

export async function getProjects(includeInactive = false): Promise<Project[]> {
  return includeInactive ? STATIC_PROJECTS : STATIC_PROJECTS.filter((p) => p.attivo);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return STATIC_PROJECTS.find((p) => p.slug === slug) ?? null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return STATIC_TEAM;
}

export async function getSettings(): Promise<SiteSettings> {
  return { ...DEFAULT_SETTINGS };
}

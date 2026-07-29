import type { ReactNode } from "react";

export type ProjectStatus = "stable" | "wip" | "archived";

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  repository: string;
  tags: string[];
  license: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  github: string;
  demo?: string;
  embeddedDemo?: boolean;
  artwork: string;
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
}

export interface Project extends ProjectMeta {
  content: ReactNode;
}

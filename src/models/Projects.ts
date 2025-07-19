import { TaskDto } from './Tasks';

interface CreateProjectRequest {
  title: string;
  description: string;
  deadline: Date;
  technologies: string[];
  budget: number;
}

interface UpdateProjectRequest {
  title?: string;
  description?: string;
  deadline?: Date;
  technologies?: string[];
  budget?: number;
}

interface ProjectTechnologiesDto {
  id: number;
  technology: string;
}

interface ProjectDto {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  deadline: Date;
  technologies: ProjectTechnologiesDto[];
  budget: number;
  tasks: TaskDto[];
}

export type { CreateProjectRequest, UpdateProjectRequest, ProjectDto };

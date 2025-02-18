import { ProjectDto } from './Projects';

interface CreateProposalRequest {
  projectName: string;
  proposedBudget: number;
}

interface ProposalsDto {
  id: number;
  project: ProjectDto;
  username: string;
  proposedBudget: number;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface UpdateProposalRequest {
  proposedBudget: number;
  status?: string;
}

export type { CreateProposalRequest, ProposalsDto, UpdateProposalRequest };

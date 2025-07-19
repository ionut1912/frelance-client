import { ProjectDto } from "./Projects";

interface CreateContractRequest {
  projectName: string;
  freelancerName: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  contractFile: File;
}

interface ContractsDto {
  id: number;
  project: ProjectDto;
  clientName: string;
  freelancerName: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  contractFileUrl: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface UpdateContractRequest {
  endDate?: Date;
  amount?: number;
  contractFile?: File;
  status?: string;
}
export type { CreateContractRequest, ContractsDto, UpdateContractRequest };

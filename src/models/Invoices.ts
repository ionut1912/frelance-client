import { ProjectDto } from './Projects';

interface CreateInvoiceRequest {
  projectName: string;
  clientName: string;
  amount: number;
  invoiceFile: File;
}

interface InvoicesDto {
  id: number;
  project: ProjectDto;
  clientName: string;
  freelancerName: string;
  createdAt: Date;
  updatedAt?: Date;
  amount: number;
  invoiceFileUrl: string;
  status: string;
}

interface UpdateInvoiceRequest {
  amount?: number;
  invoiceFile: File;
  status?: string;
}

export type { CreateInvoiceRequest, InvoicesDto, UpdateInvoiceRequest };

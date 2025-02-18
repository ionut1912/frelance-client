import {TimeLogsDto} from './TimeLogs';

interface  CreateProjectTaskRequest{
  projectTitle:string;
  freelancerUsername:string;
  title:string;
  description:string;
  priority:string;
}

interface TaskDto{
  id:number;
  title:string;
  description:string;
  projectTaskStatus:string;
  priority:string;
  timeLogs:TimeLogsDto[];
  createdAt:Date;
  updatedAt?:Date;
}

interface UpdateProjectTaskRequest{
  title?:string;
  description?:string;
  status?:string;
  priority?:string;
}

export type {CreateProjectTaskRequest,TaskDto,UpdateProjectTaskRequest};

interface  CreateTimeLogRequest{
taskTitle:string;
startTime:Date;
endTime:Date;
}

interface  TimeLogsDto{
  id:number;
  starTime:Date;
  endTime:Date;
  totalHours:number;
  createdAt:Date;
  updatedAt?:Date;
}

interface  UpdateTimeLogRequest{
  taskTitle?:string;
  startTime?:Date;
  endTime?:Date;
  totalHours?:number;
}

export type {CreateTimeLogRequest,TimeLogsDto,UpdateTimeLogRequest};

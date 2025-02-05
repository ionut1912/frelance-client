export interface  ProblemDetails {
  status:number;
  title:string;
  detail:string;
  errors?:ErrorDetail[]
}

export interface  ErrorDetail{
  property:string;
  errorMessage:string;
}

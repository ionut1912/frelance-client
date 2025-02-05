export interface  ProblemDetails {
  status:number;
  title:string;
  detail:string;
  extensions?:Record<string, string>
}

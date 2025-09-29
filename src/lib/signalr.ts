import * as signalR from "@microsoft/signalr";

export function createHubConnection(apiBase: string) {
  const base = apiBase || "";
  return new signalR.HubConnectionBuilder()
    .withUrl(`${base}/hubs/capture`, {
      withCredentials: true,
      transport: signalR.HttpTransportType.WebSockets,
      skipNegotiation: true,
    })
    .withAutomaticReconnect()
    .build();
}

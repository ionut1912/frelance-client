import { createAuthAxios } from "../utils/authUtils";

export const API_URL = "https://localhost:7020";
export const api = createAuthAxios(API_URL);

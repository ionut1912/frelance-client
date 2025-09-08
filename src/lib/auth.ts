import { store } from "../store";

export function isAuthenticated(): boolean {
  try {
    const state = store.getState();
    const role = state.auth?.role || null;
    return role !== null;
  } catch {
    return false;
  }
}

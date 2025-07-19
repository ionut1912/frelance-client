import { SET_ROLE, UserRole, AuthAction } from "./types";

export function setRole(role: UserRole): AuthAction {
  return { type: SET_ROLE, role };
}

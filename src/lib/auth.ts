export function isAuthenticated(): boolean {
  try {
    return Boolean(localStorage.getItem("jwt"));
  } catch {
    return false;
  }
}

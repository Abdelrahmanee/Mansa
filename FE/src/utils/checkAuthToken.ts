// utils/checkAuthToken.js
export const checkAuthToken = (): boolean => {
  // Check if the "token" cookie exists
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("authToken="));

  if (!token) {
    // If the token is not found (cookie expired), clear the localStorage
    localStorage.removeItem("user");
    return false;
  }
  return true;
};

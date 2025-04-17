import axios from "axios";

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = JSON.parse(
    localStorage.getItem("refresh_token") || "null"
  );

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/token/refresh/`,
    { refresh: refreshToken }
  );

  const { access } = response.data;
  localStorage.setItem("access_token", JSON.stringify(access));

  return access;
};

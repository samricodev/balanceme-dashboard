import axios from "axios";

const API_URL = "http://localhost:3000/api"; // tu backend

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const register = async (name: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");

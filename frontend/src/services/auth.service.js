import api from "./api";

export const getUserAuthenticated = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    throw new Error("Error getting user");
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error getting user by id");
  }
};

// Login et création de compte restent avec axios car ils n'ont pas encore le token
import axios from "axios";

export const logInUser = async (email, password) => {
  try {
    const response = await axios.post("http://localhost/api/auth/signin", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    throw new Error("Error logging in user");
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post("http://localhost/api/auth/create", user);
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

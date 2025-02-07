import api from "./api";

export const updateUser = async (user) => {
  console.log("user changed", user);
  try {
    const response = await api.put(`/users/update/${user._id}`, user);
    return response.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export const changePassword = async (userId, password, newPassword) => {
  try {
    const response = await api.put(`/users/change-password`, {
      userId,
      password,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error changing password");
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting user");
  }
};

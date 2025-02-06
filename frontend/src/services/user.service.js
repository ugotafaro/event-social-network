import axios from "axios";

export const updateUser = async (user) => {
  console.log("user changed", user);
  try {
    const response = await axios.put(
      `http://localhost/api/users/update/${user._id}`,
      user
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export const changePassword = async (userId, password, newPassword) => {
  console.log("user changed", userId, password);
  try {
    const response = await axios.put(
      `http://localhost/api/users/change-password`,
      { userId, password, newPassword }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error changing password");
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost/api/users/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error deleting user");
  }
};

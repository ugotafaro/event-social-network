import React, { useState, useEffect } from "react";
import {
  changePassword,
  deleteUser,
  updateUser,
} from "../services/user.service";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./errorMessage";
import SuccessMessage from "./SuccessMessage";

export default function Profile({ user, setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      user.image && setImage(user.image);
    }
  }, [user]);

  const onSubmit = async () => {
    const updatedUser = {
      _id: user._id,
      firstName,
      lastName,
      email,
      password,
    };
    if (image) {
      updatedUser.image = image;
    }
    await updateUser(updatedUser)
      .then((user) => {
        setUser(user);
        setTimeout(() => {
          setSuccess(true);
          setInfoMessage("User updated successfully");
          setTimeout(() => setSuccess(false), 3000);
        }, 500);
      })
      .catch((error) => {
        setTimeout(() => {
          setError(true);
          setInfoMessage("Error updating user");
          setTimeout(() => setError(false), 3000);
        }, 500);
      })
      .finally(() => {
        setInfoMessage("");
      });
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    await changePassword(user._id, password, newPassword)
      .then((user) => {
        setUser(user);

        setTimeout(() => {
          setSuccess(true);
          setInfoMessage("User password changed successfully");
          setTimeout(() => setSuccess(false), 3000);
        }, 500);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        setTimeout(() => {
          setError(true);
          setInfoMessage(
            "Error while changing password. Verify your current password"
          );
          setTimeout(() => setError(false), 3000);
        }, 500);
      })
      .finally(() => {
        setInfoMessage("");
      });
  };

  const handleDeleteUser = async () => {
    await deleteUser(user._id).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex flex-col gap-4 bg-white p-6 rounded-lg">
        {success && <SuccessMessage message={infoMessage} />}
        {error && <ErrorMessage message={infoMessage} />}
        <h1 className="text-xl font-bold">Profile setting</h1>
        {/* Profile image */}
        <div className="flex items-center gap-2">
          {image ? (
            <img
              className="w-10 h-10 mt-1 rounded-full shadow-lg"
              src={user?.image}
            ></img>
          ) : (
            <img
              className="w-10 h-10 mt-1 rounded-full shadow-lg"
              src="/me.jpeg"
              alt="Bonnie image"
            />
          )}
          <div className="">
            <h2 className="text-lg">
              {firstName} {lastName}
            </h2>
            <span className="text-gray-500">
              Update your photo and personal details
            </span>
          </div>
        </div>
        {/* Profile form */}
        <div className="flex flex-col gap-6 mt-5">
          <div className="flex gap-4">
            <div className="flex flex-col w-72">
              <label htmlFor="" className="text-gray-400 font-semibold text-sm">
                First name
              </label>
              <input
                type="text"
                value={firstName}
                className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-72">
              <label htmlFor="" className="text-gray-400 font-semibold text-sm">
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-400 font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button className="cursor-pointer border-gray-300 border px-4  py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={onSubmit}
            >
              Save Changes
            </button>
          </div>

          <hr className="text-gray-200" />
          <h1 className="font-semibold">Change Password</h1>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-400 font-semibold text-sm">
              Current Password
            </label>
            <input
              type="password"
              className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-400 font-semibold text-sm">
              New Password
            </label>
            <input
              type="password"
              className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-400 font-semibold text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-lg p-2 border-gray-300 border outline-none focus:ring-0 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="flex rounded-lg justify-between items-center gap-21 bg-white p-4">
        <div>
          <h1 className="font-bold text-xl">Delete Account</h1>
          <span className="text-gray-500 font-semibold">
            Once you delete your account, there is no going back
          </span>
        </div>
        <button
          className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-colors"
          onClick={handleDeleteUser}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

// Standard CRUD service functions for user operations

import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUsersService,
} from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUserService(name, email); // Assuming you have a 'users' table
    handleResponse(res, 201, "Users retrieved successfully", newUser);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService(); // Assuming you have a 'users' table
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id); // Assuming you have a 'users' table
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(req.params.id, name, email); // Assuming you have a 'users' table
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUsersService(req.params.id); // Assuming you have a 'users' table
    if (!deletedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User delete successfully", deletedUser);
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
};

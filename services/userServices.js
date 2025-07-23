import chalk from "chalk";
import User from "../models/userModel.js";

export const getUserByEmailService = async (email) => {
  try {
    const user = await User.findOne({ email });
    console.log(chalk.yellow.bold(`User Fetched By Email --> ${user}`));
    return user;
  } catch (error) {
    console.log(chalk.red.bold("Problem Fetching User By Email"));
    console.error(error);
    return null;
  }
};

export const getUserByIdService = async (id) => {
  try {
    const user = await User.findById(id).populate("services");
    console.log(chalk.yellow.bold(`User Fetched By Id --> ${user}`));
    return user;
  } catch (error) {
    console.log(chalk.red.bold("Problem Fetching User By Id"));
    console.error(error);
    return null;
  }
};

export const getAllUsersService = async ({
  firstName,
  lastName,
  phone,
  role,
  email,
  service,
  banned,
  availability,
  admin,
  id,
}) => {
  try {
    const query = {};

    if (firstName) query.firstName = firstName;
    if (lastName) query.lastName = lastName;
    if (phone) query.phone = phone;
    if (role) query.role = role;
    if (email) query.email = email;
    if (service) query.services = { $in: [service] };
    if (banned) query.banned = banned;
    if (availability) query.availability = availability;
    if (admin) query.admin = admin;
    if (id) query._id = id;

    const users = await User.find(query)
      .populate("services")
      .select(
        "_id firstName lastName email phone role banned profilePicture services"
      )
      .sort({ createdAt: -1 });

    if (!users) {
      console.log(chalk.yellow.bold("No Users Found"));
      return [];
    }

    console.log(chalk.yellow.bold("Users Found"));
    return users;
  } catch (error) {
    console.log(chalk.red.bold("Problem Fetching Users"));
    console.error(error);
    return null;
    s;
  }
};

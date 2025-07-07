import chalk from "chalk";
import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import { createToken, verifyToken } from "../utils/token.js";
import {
  getAllUsersService,
  getUserByEmailService,
  getUserByIdService,
} from "../services/userServices.js";
import removeFile from "../utils/removeFile.js";
import { otpTemplate } from "../utils/emailTemplates.js";
import { sendPhoneOtp } from "../utils/twilioClient.js";

// TODO: Find a way to store files on a cloud storage ( Recommended files.fm )

// Register New Super
export const registerSuper = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      company,
      address,
      country,
      language,
    } = req.body;

    const image = req.file?.filename;

    // Check if email already exists
    const existingUser = await getUserByEmailService(email);
    if (existingUser)
      return res.status(401).json({ message: "email already exists" });

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // add user to db
    const newSuper = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      company,
      address,
      country,
      language,
      profilePicture: image,
      role: "super",
    });
    await newSuper.save();
    console.log(
      chalk.green.bold(
        `Super Admin ${firstName} ${lastName} has been registered successfully`
      )
    );

    // sign in after registration
    const token = createToken(newSuper);
    const decoded = verifyToken(token);

    // Set cookie with the token
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // expires in one day
    });

    return res.status(201).json({
      message: `Super Admin ${firstName} ${lastName} Registered Successfully`,
      payload: decoded,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Registering Super",
      error: error.message,
    });
  }
};

// Register New Admin
export const registerAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      company,
      address,
      country,
      language,
    } = req.body;

    const image = req.file?.filename;

    // Check if email already exists
    const existingUser = await getUserByEmailService(email);
    if (existingUser)
      return res.status(401).json({ message: "email already exists" });

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // add user to db
    const newAdmin = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      company,
      address,
      country,
      language,
      profilePicture: image,
      role: "admin",
    });
    await newAdmin.save();
    console.log(
      chalk.green.bold(
        `Admin ${firstName} ${lastName} has been registered successfully`
      )
    );

    return res.status(201).json({
      message: `Admin ${firstName} ${lastName} Registered Successfully`,
      payload: newAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Registering Admin",
      error: error.message,
    });
  }
};

// Register client
export const registerClient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      recoveryEmail,
      phone,
      password,
      job,
      accountType,
      role,
      companyName,
      companyDescription,
      companyWebsite,
      industry,
      banned,
      //   estimatedBudget,
    } = req.body;

    const profilePicture =
      req.files?.profilePicture?.[0]?.filename || "default";
    const scopeOfWork = req.files?.scopeOfWork?.[0]?.filename || null;
    const liscence = req.files?.liscence?.[0]?.filename || null;

    // Check if email already exists
    const existingUser = await getUserByEmailService(email);
    if (existingUser)
      return res.status(401).json({ message: "email already exists" });

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // add user to db
    const newUser = new User({
      firstName,
      lastName,
      email,
      recoveryEmail,
      phone,
      password: hashedPassword,
      job,
      accountType,
      role,
      companyName,
      companyDescription,
      companyWebsite,
      industry,
      banned,

      // for company client type
      ...(accountType === "company" && {
        companyName,
        companyDescription,
        companyWebsite,
        industry,
      }),
    });
    await newUser.save();

    // sign in after registration
    const token = createToken(newUser);
    const decoded = verifyToken(token);

    // Set cookie with the token
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // expires in one day
    });

    return res.status(201).json({
      message: `Client ${firstName} ${lastName} Registered Successfully`,
      payload: decoded,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Registering Client",
      error: error.message,
    });
  }
};

// Register Provider
export const registerProvider = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      company,
      address,
      country,
      language,
      experience,
      services,
    } = req.body;

    const profilePicture = req.files.profilePicture
      ? req.files.profilePicture[0].filename
      : "default";
    const cvOrCompanyProfile = req.files.cvOrCompanyProfile
      ? req.files.cvOrCompanyProfile[0].filename
      : null;

    // Check if email already exists
    const existingUser = await getUserByEmailService(email);
    if (existingUser)
      return res.status(401).json({ message: "email already exists" });

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // add user to db
    const newProvider = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      company,
      address,
      country,
      language,
      experience,
      services,
      profilePicture,
      cvOrCompanyProfile,
      role: "provider",
    });
    await newProvider.save();

    // sign in after registration
    const token = createToken(newProvider);
    const decoded = verifyToken(token);

    // Set cookie with the token
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // expires in one day
    });

    return res.status(201).json({
      message: `Provider ${firstName} ${lastName} Registered Successfully`,
      payload: decoded,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Registering Provider",
      error: error.message,
    });
  }
};

// User Log in
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exists
    const existingUser = await getUserByEmailService(email);
    if (!existingUser)
      return res.status(404).json({ message: "email does not exist" });

    // check if password match
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword)
      return res.status(401).json({ message: "Wrong  Password" });

    // sign in
    const token = createToken(existingUser);
    const decoded = verifyToken(token);

    // Set cookie with the token
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // expires in one day
    });

    return res.status(200).json({
      message: `${existingUser.firstName} ${existingUser.lastName} Logged in Successfully`,
      payload: decoded,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Logging in",
      error: error.message,
    });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // update user
    await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({ message: "password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Changing Password",
      error: error.message,
    });
  }
};

// Verify Password
export const verifyPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // check if password match
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Wrong  Password" });

    return res.status(200).json({ message: "Password Match" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Verifying Password",
      error: error.message,
    });
  }
};

// Change user banned property
export const changeUserBannedStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { banned } = req.body;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update user
    await User.findByIdAndUpdate(id, { banned }, { new: true });

    res
      .status(200)
      .json({ message: "changed user banned status successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Banning User",
      error: error.message,
    });
  }
};

// Provider change availability
export const changeProviderAvailability = async (req, res) => {
  try {
    const id = req.params.id;
    const { availability } = req.body;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update user
    await User.findByIdAndUpdate(id, { availability }, { new: true });

    res
      .status(200)
      .json({ message: "changed provider availability successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Changing Availability",
      error: error.message,
    });
  }
};

// Edit Super Profile
export const editSuperProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, company, address, country, language } =
      req.body;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update user
    await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        company,
        address,
        country,
        language,
      },
      { new: true }
    );

    res.status(200).json({ message: `super ${id} edited successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Doing Profile Edits",
      error: error.message,
    });
  }
};

// Edit Client Profile
export const editClientProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      company,
      address,
      country,
      language,
      howSoonServices,
      estimatedBudget,
    } = req.body;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update user
    await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        company,
        address,
        country,
        language,
        howSoonServices,
        estimatedBudget,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: `client ${id} edited successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Doing Profile Edits",
      error: error.message,
    });
  }
};

// Edit Provider Profile
export const editProviderProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      company,
      address,
      country,
      language,
      experience,
      services,
    } = req.body;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update user
    await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        company,
        address,
        country,
        language,
        experience,
        services,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: `provider ${id} edited successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Doing Profile Edits",
      error: error.message,
    });
  }
};

// Change Profile Picture
export const changeProfilePicture = async (req, res) => {
  try {
    const id = req.params.id;
    const profilePicture = req.file?.filename;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // delete previous picture
    if (
      user &&
      user.profilePicture &&
      profilePicture &&
      user.profilePicture !== "default"
    ) {
      removeFile(user.profilePicture);
    }

    // update profile picture
    await User.findByIdAndUpdate(id, { profilePicture }, { new: true });

    res.status(200).json({ message: "profile picture updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Changing Profile Picture",
      error: error.message,
    });
  }
};

// Change Scope Of Work -- for client only
export const changeScopeOfWork = async (req, res) => {
  try {
    const id = req.params.id;
    const scopeOfWork = req.file?.filename;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // delete previous picture
    if (user && user.scopeOfWork && scopeOfWork) {
      removeFile(user.scopeOfWork);
    }

    // update scope of work
    await User.findByIdAndUpdate(id, { scopeOfWork }, { new: true });

    res.status(200).json({ message: "Scope Of Work updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Changing Scope Of Work",
      error: error.message,
    });
  }
};

// Change cvOrCompanyProfile -- for provider only
export const changeCvOrCompanyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const cvOrCompanyProfile = req.file?.filename;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // delete previous picture
    if (user && user.cvOrCompanyProfile && cvOrCompanyProfile) {
      removeFile(user.cvOrCompanyProfile);
    }

    // update cvOrCompanyProfile
    await User.findByIdAndUpdate(id, { cvOrCompanyProfile }, { new: true });

    res
      .status(200)
      .json({ message: "CvOrCompanyProfile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Changing CvOrCompanyProfile",
      error: error.message,
    });
  }
};

// Change phone number -- requires verify phone number
export const changePhoneNumber = async (req, res) => {
  try {
    const id = req.params.id;
    const { phone } = req.body;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update phone number
    await User.findByIdAndUpdate(id, { phone }, { new: true });

    res.status(200).json({ message: "phone number updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Changing Phone Number",
      error: error.message,
    });
  }
};

// Add Admin Specific Client
export const addAdminSpecificClient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      company,
      address,
      country,
      language,
      howSoonServices,
      estimatedBudget,
      admin,
    } = req.body;

    const profilePicture = req.files.profilePicture
      ? req.files.profilePicture[0].filename
      : "default";
    const scopeOfWork = req.files.scopeOfWork
      ? req.files.scopeOfWork[0].filename
      : null;

    // Check if email already exists
    const existingUser = await getUserByEmailService(email);
    if (existingUser)
      return res.status(401).json({ message: "email already exists" });

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // add user to db
    const AdminSpecificClient = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      company,
      address,
      country,
      language,
      howSoonServices,
      estimatedBudget,
      profilePicture,
      scopeOfWork,
      role: "client",
      admin,
    });
    await AdminSpecificClient.save();

    res.status(201).json({
      message: `Client ${firstName} ${lastName} Created For Admin ${admin}`,
      payload: AdminSpecificClient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Adding Admin Specific Client",
      error: error.message,
    });
  }
};

// Add Existing Client To Admin
export const addExistingClientToAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { admin } = req.body;

    // get user
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // add admin id to user
    await User.findByIdAndUpdate(id, { admin }, { new: true });

    res.status(200).json({
      message: `Client ${id} added to admin ${admin} successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Problem Adding Client to Admin",
      error: error.messages,
    });
  }
};

// Fetch All Users
export const getAllUsers = async (req, res) => {
  try {
    const {
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
    } = req.body;

    const users = await getAllUsersService({
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
    });

    if (users.length === 0)
      return res
        .status(404)
        .json({ message: "No users found!", payload: users });
    return res.status(200).json({ message: "Users found!", payload: users });
  } catch (error) {
    res.status(500).json({
      message: "Problem fetching all users",
      error: error.message,
    });
  }
};

// Fetch a Single User By Id
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await getUserByIdService(id).populate("services");

    if (!user) return res.status(404).json({ message: "User Not Found" });
    return res.status(200).json({ message: "User Found", payload: user });
  } catch (error) {
    res.status(500).json({
      message: "Problem fetching user",
      error: error.message,
    });
  }
};

// get user by id saved in the cookie
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "firstName lastName role profilePicture"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ payload: user });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // check if user exists
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "User not found!" });

    // delete user files
    if (user && user.profilePicture && user.profilePicture !== "default")
      removeFile(user.profilePicture);
    if (user && user.scopeOfWork) removeFile(user.scopeOfWork);
    if (user && user.cvOrCompanyProfile) removeFile(user.cvOrCompanyProfile);

    // delete user from db
    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: `${user.firstName} ${user.lastName} Deleted Successfully`,
      payload: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem deleting user",
      error: error.message,
    });
  }
};

// ----------------------------------------------------------------------
// TEST EMAIL CONTROLLER
// ----------------------------------------------------------------------
export const sendEmail = (req, res) => {
  try {
    otpTemplate("2silentninja2@gmail.com", "124232");
    res.status(201).json({ message: "Email Sent Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// TEST SMS CONTROLLER
// ----------------------------------------------------------------------
export const sendSMS = async (req, res) => {
  try {
    await sendPhoneOtp("+96176153425", "123456");
    res.status(200).json({ message: "sms sent successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something Went Wrong", error: error.message });
  }
};
// ----------------------------------------------------------------------

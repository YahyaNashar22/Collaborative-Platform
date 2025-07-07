import chalk from "chalk";

import Otp from "../models/otpModel.js";

// create email otp record
export const createEmailOtpService = async (
  email,
  emailOtp,
  emailOtpExpiresAt
) => {
  try {
    const otp = await Otp.findOneAndUpdate(
      { email },
      { emailOtp, emailOtpExpiresAt },
      { upsert: true, new: true }
    );
    await otp.save();

    console.log(chalk.yellow.bold("email otp created successfully"));

    return otp;
  } catch (error) {
    console.log(chalk.red.bold("problem creating email otp"));
    console.error(error);
    return null;
  }
};

// find otp by email
export const findOtpByEmailService = async (email) => {
  try {
    const otp = await Otp.findOne({ email });

    console.log(
      chalk.yellow.bold(`otp for email: ${email} found successfully`)
    );

    return otp;
  } catch (error) {
    console.log(chalk.red.bold("cannot find email otp!"));
    console.error(error);
    return null;
  }
};

// create phone otp record
export const createPhoneOtpService = async (
  phone,
  phoneOtp,
  phoneOtpExpiresAt
) => {
  try {
    const otp = new Otp({ phone, phoneOtp, phoneOtpExpiresAt });
    await otp.save();

    console.log(chalk.yellow.bold("phone otp created successfully"));

    return otp;
  } catch (error) {
    console.log(chalk.red.bold("problem creating phone otp"));
    console.error(error);
    return null;
  }
};

// find otp by phone
export const findOtpByPhoneService = async (phone) => {
  try {
    const otp = await Otp.findOne({ phone });

    console.log(
      chalk.yellow.bold(`otp for email: ${phone} found successfully`)
    );

    return otp;
  } catch (error) {
    console.log(chalk.red.bold("cannot find phone otp!"));
    console.error(error);
    return null;
  }
};

// delete otp by id
export const deleteOtpByIdService = async (id) => {
  try {
    await Otp.findByIdAndDelete(id);
    console.log(chalk.yellow.bold(`otp ${id} deleted successfully`));
  } catch (error) {
    console.log(chalk.red.bold(`cannot delete otp for id: ${id}!`));
    console.error(error);
  }
};

// TEST FOR FETCHING OTP
export const getAllOtpService = async () => {
  try {
    const otp = await Otp.find({});
    console.log(chalk.yellow.bold("otp found successfully"));

    return otp;
  } catch (error) {
    console.log(chalk.red.bold("Cannot fetch otp"));
    console.error(error);
    return [];
  }
};

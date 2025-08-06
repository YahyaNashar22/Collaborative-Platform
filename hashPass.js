import bcrypt from "bcryptjs";

const password = "pass";
const salt = bcrypt.genSaltSync(10);
const hashed = bcrypt.hashSync(password, salt);

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the necessary details"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email"
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }
    const accessToken = user.generateAccessToken();
    const sanitizedUser = user
    sanitizedUser.password = undefined;



    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
      })
      .status(200)
      .json({
        success: true,
        user: sanitizedUser,
        message: "User logged in successfully"
      });

  } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};

//Add
const addUser = async (req, res) => {
  try {
    const { full_name, email, phone, password, role } = req.body;
    console.log("addUser called")
    if (!full_name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      full_name,
      email,
      phone,
      password: hashedPassword,
      role: role || "student"
    });
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;
    return res.status(201).json({
      success: true,
      user: sanitizedUser,
      message: "User added successfully"
    });

  } catch (error) {
    console.error("ADD USER ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add user"
    });
  }
};

const student = async (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "You are inside the student controller"
  });
};

const staff = async (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "You are inside the staff controller"
  });
};

const admin = async (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "You are inside the admin controller"
  });
};

export {
  addUser,
  login,
  staff,
  admin,
  student,

};
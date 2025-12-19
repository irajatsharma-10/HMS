import User from "../models/user.model.js";

const generateAcessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

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
    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const { accessToken, refreshToken } =
      await generateAcessAndRefreshToken(user._id);

    const sanitizedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false
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

const allData = async (_req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

const addData = async (req, res) => {
  try {
    const { full_name, email, phone, password, role } = req.body;

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

    const user = await User.create({
      full_name,
      email,
      phone,
      password,
      role: role || "Student"
    });

    return res.status(201).json({
      success: true,
      user,
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
  allData,
  addData,
  login,
  staff,
  admin,
  student,
  generateAcessAndRefreshToken
};
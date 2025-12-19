import User from "../models/user.model.js"


const generateAcessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the necessary details"
      });
    }

    console.log("LOGIN CALLED",email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const checkPasswordValid = await user.passwordCorrect(password);
    console.log(checkPasswordValid)
    if (!checkPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    

    const { refreshToken, accessToken } =
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
      .json({
        success: true,
        user: sanitizedUser,
        message: "User logged in successfully"
      });

  } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    return res.status(500).json({
      success: false,
      message: "No valid user found"
    });
  }
};


const student = async(_req,res)=>{
    try{
        return res.json({
            success: true,
            message: "You are inside the student controller",
        })
    }catch(error){
          return res.status(500).json({
            success: false,
            message: "No valid user found"
        })
    }
}

const staff = async (_req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "You are inside the staff controller",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Staff controller error"
    });
  }
};

const admin = async (_req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "You are inside the admin controller",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admin controller error"
    });
  }
};


export {login, staff, admin, student, generateAcessAndRefreshToken}
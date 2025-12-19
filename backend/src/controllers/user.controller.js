import User from "../models/user.model"


const generateAcessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = await user.refreshToken();
        const accessToken = await user.accessToken();

        await User.findByIdAndUpdate(
            userId,
            {
                refreshToken: refreshToken
            },
            { new: true }
        )
        return { refreshToken, accessToken };
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while generating refreshToken and accessToken"
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({
            success: false,
            message: "Please provide all the necessory details"
        })
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please provide the valid user"
            })
        }
        const checkPasswordValid = await user.checkPasswordValid(password)
        if (!checkPasswordValid) {
            return res.status(404).json({
                success: false,
                message: "Invalid User credentials"
            })
        }
        const { refreshToken, accessToken } = await generateAcessAndRefreshToken(user._id)

        const sanitizedUser = await User.findById(user._id).select("-refreshToken -password")

        return res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true
        }).cookie("refreshToken",refreshToken,{
            httpOnly: true,
            secure: true
        }).json({
            success: true,
            user: sanitizedUser,
            message: "User loggedIn successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "No valid user found"
        })
    }
}


exports.Student = async(_req,res)=>{
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

exports.staff = async (_req, res) => {
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

exports.admin = async (_req, res) => {
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
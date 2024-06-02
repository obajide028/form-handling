const User = require('../models/User');



//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public
const register = async (req, res, next) => {
    const { email, password, firstname, lastname} = req.body;
    try {
      if (!email || !password || !firstname || !lastname) {
        return res
          .status(404)
          .json({ success: false, message: "Please Input all fields" });
      }
  
      // Check for user
      const Exisitinguser = await User.findOne({ email }).select("+password");
      if (Exisitinguser) {
        return res
          .status(401)
          .json({ success: false, message: "User Exists Already" });
      }
  
      // create user
      const user = await User.create({
        firstname,
        lastname,
        email,
        password,     
      });

      const response = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      }

    // send the response to the user
     res.status(201).json({success: true, message: "User created successfully", data: response});
      
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "An error occurred during registration" });
    }
  };

  module.exports = {register};
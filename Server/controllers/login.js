import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email, !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details."
      })
    }
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist."
      })
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password."
      })
    }

    const respData = {
      id: user._id,
      email: user.email,
      name: user.name
    }

    return res.status(200).json({
      success: true,
      message: 'Logged in Successfully',
      data: respData
    })
  }
  catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: "Error while trying to login"
    })
  }
}
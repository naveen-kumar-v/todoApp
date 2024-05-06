import User from '../models/User.js'
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {

  try {

    let { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please fill all the fields correctly.",
      })
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already registered, Try login",
      })
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    }
    catch (err) {
      console.log("Error while hashing the password")
      return res.status(400).json({
        success: false,
        message: "Error while trying to hash password"
      })
    }

    email = email.toLowerCase();
    const user = await User.create({ name, email, password: hashedPassword });

    const reponseData = {
      name,
      id: user._id,
      email,
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: reponseData
    })

  }
  catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: "Error while trying to signup"
    })
  }

}
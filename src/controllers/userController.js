import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// API ROutes

//register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "User already exists",
      });
    //hash the pasword
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(401).json("Error creating user", error);
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find our user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "invalid email" });

    //compare our password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "invalid password" });
    //token to validate user auth
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    //res for user token and some user data
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(401).json("Error loggin user in", error);
  }
};

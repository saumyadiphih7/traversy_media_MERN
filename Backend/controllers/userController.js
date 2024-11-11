const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exist or not

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    res.status(400);
    throw new Error("User already exist");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  //create user

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate a  user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const { id, name, email } = await User.findById(req.user._id)
  res.json({
    id: id,
    name: name,
    email: email,
  });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

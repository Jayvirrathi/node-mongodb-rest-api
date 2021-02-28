const User = require('../models/User');
const { tryCatch } = require('../utils/tryCatch');

exports.getUsers = tryCatch(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

exports.register = tryCatch(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  const token = user.getSignedJwt();

  res.status(201).json({
    success: true,
    token,
    user
  });
});

exports.login = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      message: 'Please provide valid email and password.'
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next({
      message: 'Invalid Credentials'
    });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next({
      message: 'Invalid Credentials'
    });
  }

  const token = user.getSignedJwt();

  res.status(201).json({
    success: true,
    token
  });
});

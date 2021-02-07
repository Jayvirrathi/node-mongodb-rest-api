import User from '../models/User';

exports.getUsers = async (req, res) => {
  const users = await User.find()
    .sort({ name: -1 })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error Occured'
      });
    });
  res.json(users);
};

exports.createUser = async (req, res) => {
  new User(req.body).save((err, data) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong, please try again later.'
      });
    } else {
      res.status(200).json({
        message: 'User Created',
        data
      });
    }
  });
};

exports.getSingleUser = async (req, res) => {
  let userID = req.params.id;

  await User.findById({ _id: userID }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong, please try again later.'
      });
    } else {
      res.status(200).json({
        message: 'User found',
        data
      });
    }
  });
};

exports.updateUser = async (req, res) => {
  let userID = req.params.id;

  await User.findByIdAndUpdate(
    { _id: userID },
    { $set: req.body },
    {
      new: true
    },
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: 'Something went wrong, please try again later.'
        });
      } else {
        res.status(200).json({
          message: 'User Updated',
          data
        });
      }
    }
  );
};

exports.deleteUser = async (req, res) => {
  let userID = req.params.id;

  await User.deleteOne({ _id: userID }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong, please try again later.'
      });
    } else {
      res.status(200).json({
        message: 'User Deleted'
      });
    }
  });
};

module.exports = (err, req, res, next) => {
  return res.json({
    success: false,
    err
  });
};

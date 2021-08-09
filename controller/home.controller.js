const Home = (req, res, next) => {
  if (req.error) {
    res.status(404).json({ success: false, message: "Invalid token" });
  }
  if (!req.user) {
    res.status(200).json({ success: false, message: "Invalid token" });
  }

  res
    .status(200)
    .json({ success: true, message: "Welcome " + req.user.name + "!" });
};

module.exports = Home;

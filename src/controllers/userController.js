const getAllUser = async (req, res) => {
  console.log(req.session);
  res.send('all users');
};

const getCurrentUser = (req, res) => {
  console.log(req.isAuthenticated());
  res.send('this is the current user');
};

module.exports = {
  getAllUser,
  getCurrentUser,
};

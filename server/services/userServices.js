const userController = require('../controller/userController')

exports.currentUser = (req, res) => {
userController
    .currentUser(req, res)
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

exports.signup = (req, res) => {
userController
    .signup(req, res)
    .catch((err) => res.status(400).json({ message: err.message }));
};

exports.loginUser = (req, res) => {
userController
    .loginUser(req, res)
    .catch((err) => res.status(400).json({ message: err.message }));
};

exports.verifyUserEmail = (req, res) => {
userController
    .verifyUserEmail(req, res)
    .catch((err) => res.status(400).json({ message: err.message }));
};


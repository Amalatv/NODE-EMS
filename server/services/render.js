exports.homeRoutes = (req,res) => {
    res.render('index')
};


// render view employee details page
exports.viewRoutes = (req,res) => {
    res.render('employeedetails')
};

// render signup page
exports.signupRoutes = (req, res) => {
    const notification = req.session.notification;
    delete req.session.notification;
    res.render('signup', { notification });
};


// render otp page
exports.otpRoutes = (req,res) => {
    res.render('otp');
}



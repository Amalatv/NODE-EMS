const userModels = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

let Email;
let HashPassword;
let Otp;
let token;
let ExpirationTime;
let Name;

//OTP generator function
const generateOTP = () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
  return OTP;
};

//Email sender function
function MailSender(mailId, html, title) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailDetails = {
    from: process.env.MAIL_SEND_ADDRESS,
    to: `${mailId}`,
    subject: title,
    html: html,
  };

  mailTransporter.sendMail(mailDetails, (err) => {
    if (err) {
      console.log("error while sending the mail", err);
    } else {
      console.log("mail sent successfully");
    }
  });
}

// Define controller functions
const currentUser = async (req, res) => {
  try {
    const userModel = await userModels.find();
    res.status(200).json({ userModel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let user;
  try {
    user = await userModels.findOne({ email });

    if (user) {
      req.session.notification = "User already exists. Please choose a different email.";
      return res.redirect("/signup");
    }


 
    if (email === "" || password === "" || name === "") {
      return res.redirect("/signup");
    }

    Email = email;
    const otp = generateOTP();
    const expirationTime = new Date().getTime() + 5 * 60 * 1000;
    ExpirationTime = expirationTime;

    const secretKey = process.env.JWT_TOKEN + otp;
    const payload = {
      password,
      Email,
    };

    token = jwt.sign(payload, secretKey, { expiresIn: "5m" });
    const hashPassword = await bcrypt.hash(password, 10);
    HashPassword = hashPassword;
    Otp = otp;
    Name = name;

    const html =  `Your otp for email verification is here ${otp}`
    const title = "Email verification ";
    MailSender(Email, html, title, { contentType: "text/html" });

    res.render("otp", {
      Email,
      err: "",
      ExpirationTime,
      title: "Email Verification ",
    });


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyUserEmail = async (req, res) => {
  const otpInput = req.body;
  const otpValue = otpInput.otpInput[0];
  const secretKey = process.env.JWT_TOKEN + otpValue;

  try {
    const verify = jwt.verify(token, secretKey);

    await userModels.create({
      name: Name,
      email: Email,
      password: HashPassword,
    });

    req.session.notification = "Email verified successfully.";
    res.redirect("/");
  } catch (error) {
    res.render("otp", {
      Email,
      err: "the OTP is invalid",
      ExpirationTime,
      title: "Email Verification",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModels.findOne({ email });

  let validation = true;

  

  if (!user || !(await bcrypt.compare(password, user.password))) {
    validation = false;
    req.session.notification = "Email or password incorrect. Please try again.";
    return res.redirect("/signup");
  }

  if (validation) {
    req.session.isAuth = true;
    return res.redirect("/home");
  } else {
    res.status(401);
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/");
    }
  });
};

// Export controller functions
module.exports = {
  currentUser,
  signup,
  loginUser,
  verifyUserEmail,
  logout,
};

// Export OTP generator function
module.exports.generateOTP = generateOTP;

// Export email sender function
module.exports.MailSender = MailSender;

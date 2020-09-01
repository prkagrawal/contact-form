require('dotenv').config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator')
const nodemailer = require('nodemailer');

const User = require('../../models/users');

router.get('/', (req,res) => res.send("form data route"));

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, pnumber } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'Already sent' })
      }
      user = new User({
        name,
        email,
        pnumber
      });
      await user.save();
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.username,
            pass: process.env.password
        }
      });
      
      let info = await transporter.sendMail({   
            from: `${email}`,
            to: `admin@gmail.com, ${email}`,
            subject: `${name} has contacted`, 
            html: `Your mail have been sent` 
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      
      res.send('Data saved and mails sent...')

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router; 
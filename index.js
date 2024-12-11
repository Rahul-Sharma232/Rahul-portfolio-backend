const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS/JS) from "public" directory
app.use(express.static('public'));

// Contact form route
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(req.body); // Log form data
  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use any email service of your choice
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'rahulbhardwaj98132@gmail.com', // Replace with your email
      pass: 'sjgtsxikqhytmdjo',  // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: email,
    to: 'rahulbhardwaj98132@gmail.com', // Replace with your email to receive messages
    subject: `Contact Form Message from ${name}`,
    text: `You received a message from: \n\nName: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Sent</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .container {
            text-align: center;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 400px;
          }
          h1 {
            color: #007bff;
          }
          p {
            font-size: 1.1rem;
            margin: 15px 0;
          }
          a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank You!</h1>
          <p>Your message has been successfully sent.</p>
          <p>I will get back to you shortly.</p>
          <a href="https://rahul-sharma232.netlify.app/">Return to Homepage</a>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .container {
            text-align: center;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 400px;
          }
          h1 {
            color: #dc3545;
          }
          p {
            font-size: 1.1rem;
            margin: 15px 0;
          }
          a {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Oops!</h1>
          <p>Something went wrong. Please try again later.</p>
          <a href="https://rahul-sharma232.netlify.app/">Return to Homepage</a>
        </div>
      </body>
      </html>
    `);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

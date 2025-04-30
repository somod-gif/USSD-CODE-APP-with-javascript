const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET route (for test)
app.get('/', (req, res) => {
  res.send("USSD app using JavaScript and Africa's Talking API");
});

// POST route (for USSD callback)
app.post('/ussd', (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = '';

  if (text === '') {
    response = `CON What would you want to check
1. My Account
2. My phone number`;
  } else if (text === '1') {
    response = `CON Choose account information you want to view
1. Account number
2. Account balance`;
  } else if (text === '2') {
    response = `END Your phone number is ${phoneNumber}`;
  } else if (text === '1*1') {
    const accountNumber = 'ACC1001';
    response = `END Your account number is ${accountNumber}`;
  } else if (text === '1*2') {
    const balance = 'NGN 10,000';
    response = `END Your balance is ${balance}`;
  } else {
    response = 'END Invalid input';
  }

  res.set('Content-Type', 'text/plain');
  res.send(response);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

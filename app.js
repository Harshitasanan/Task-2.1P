const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const https = require('https')
const app = express();

const port = process.env.PORT || 3000;

const api_key = '30a3ce8811b63c8db6f2d04bcbd2feec-28e9457d-fa886a70'; // Replace with your Mailgun API key
const domain = 'sandbox3e65c01713bc4a6c94f68a4bd652220d.mailgun.org'; // Replace with your Mailgun domain
const mg = mailgun({ apiKey: api_key, domain: domain });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const { email } = req.body;

  // Sending email using Mailgun
  const mailData = {
    from: 'Excited User <harshita4789.be22@chitkara.edu.in>',
    to: email,
    subject: 'Welcome Email Mailgun....!',
    text: 'Testing some Mailgun awesomeness!'
  };

  mg.messages().send(mailData, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });

  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  let currentUnix = new Date().getTime();
  let currentUtc = new Date().toUTCString();
  res.json({"unix": currentUnix, "utc": currentUtc});
});
/*
Extra Comments
*/
app.get("/api/:date_string", (req, res) => {
  let dateString = req.params.date_string;
  let unixPattern = /\d{5,}/;
    if (unixPattern.test(dateString)) {
      let dateNum = parseInt(dateString);
      res.json({"unix": dateNum, "utc": new Date(dateNum).toUTCString()});
    } else {
      let inputDate = new Date(dateString);
      if (inputDate.toString() === "Invalid Date") {
        res.json({error: "Invalid Date"});
      } else {
        res.json({"unix": inputDate.getTime(), "utc": inputDate.toUTCString()});
      };
    };
});
/* comments */

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

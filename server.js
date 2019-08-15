// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// 1. Set the API endpoint:
const endpoint = "/api/whoami/";

app.get(endpoint, (request, response) => {
  //console.log(request.headers);
  const result = {};
  result.ipaddress = request.headers["x-forwarded-for"].split(",")[0]; // IPv4 address
  result.language = request.headers["accept-language"];
  result.software = request.headers["user-agent"];
  response.send(result);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

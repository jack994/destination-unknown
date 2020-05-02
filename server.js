const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const fetch = require('node-fetch');
app.use(express.static(path.join(__dirname, "client", "build")));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/api/:query", (request, response) => {
  var apiKey = process.env.SKYSCANNER_API_KEY;
  var url = `https://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${request.params.query}&apiKey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(json => response.send(json))
    .catch(err => console.error(err)); //TODO: handle error
});

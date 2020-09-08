const path = require("path");

const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const fetch = require("node-fetch");

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get("/api/autosuggest/:query", (request, response) => {
  const endpoint = "https://www.skyscanner.net/g/autosuggest-flights/";
  const country = "UK";
  const locale = "en-GB";

  const url = `${endpoint}${country}/${locale}/${request.params.query}?isDestination=true&enable_general_search_v2=true`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        response.status(res.status);
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((json) => response.send(json))
    .catch((err) => {
      response.send(err);
    });
});

app.post("/api/search/", (request, response) => {
  const reqBody = request.body;
  reqBody.apiKey = process.env.SKYSCANNER_API_KEY;
  reqBody.locale = "en-GB";
  reqBody.country = "UK";
  reqBody.currency = "EUR";
  reqBody.locationSchema = "iata";

  let searchParams = new URLSearchParams();
  for (key in reqBody) {
    searchParams.append(key.toLowerCase(), reqBody[key]);
  }

  fetch("http://partners.api.skyscanner.net/apiservices/pricing/v1.0", {
    method: "post",
    body: searchParams,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => {
    // TODO: handle errors
    let session;
    for (var pair of response.headers.entries()) {
      if (pair[0].toLowerCase() === "location") {
        session = pair[1];
      }
    }
    if (session && typeof session === string) {
      const sessionUrl = `${session}?${reqBody.apiKey}`;
      // TODO: polling here
    }
    // TODO: return some error here
    return response.json();
  });
});
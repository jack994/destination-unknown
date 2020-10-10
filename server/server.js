const path = require("path");

const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const fetch = require("node-fetch");
const { requestPerMarket } = require("./utils");

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

app.post("/api/search/", async (request, response) => {
  try {
    const promises = [];
    request.body.borders.forEach(market => {
      const requestBody = {
        ...request.body.targeting,
        apiKey: process.env.SKYSCANNER_API_KEY,
        locale: "en-GB",
        country: market,
        currency: "EUR",
        locationSchema: "iata",
      };
      promises.push(requestPerMarket(requestBody));
    });
    const dataForAllMarkets = await Promise.all(promises);
    response.send(dataForAllMarkets);
  } catch(err){
    response.status(500);
    // TODO: need to structure error
    return response.send({
      message: err.message,
    });
  }
});

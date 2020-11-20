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

app.get("/api/autosuggest/:query", async (request, response) => {
  const endpoint = "https://www.skyscanner.net/g/autosuggest-flights/";
  const country = "UK";
  const locale = "en-GB";

  const url = `${endpoint}${country}/${locale}/${request.params.query}?enable_general_search_v2=true`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(resp.statusText || 'Error fetching autocomplete');
    }
    const jsonResp = await resp.json();
    return response.json(jsonResp);
  } catch (err){
    response.status(err.status || 500);
    return response.json({
      message: err.message,
    });
  }
});

app.post("/api/search/", async (request, response) => {
  try {
    const promises = [];
    request.body.borders.forEach(market => {
      const requestBody = {
        ...request.body.targeting,
        apiKey: process.env.SKYSCANNER_API_KEY,
        locale: "en-GB",
        currency: "EUR",
        groupPricing: true,
        locationSchema: "iata",
      };
      promises.push(requestPerMarket(market, requestBody));
    });
    const dataForAllMarkets = await Promise.all(promises);
    response.send(dataForAllMarkets);
  } catch(err){
    response.status(err.status || 500);
    return response.json({
      message: err.message,
    });
  }
});

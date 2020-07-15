const path = require('path');

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const fetch = require('node-fetch');

app.use(express.static(path.join(__dirname, 'client', 'build')));

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.get('/api/autosuggest/:query', (request, response) => {
  const endpoint = 'https://www.skyscanner.net/g/autosuggest-flights/';
  const country = 'UK';
  const locale = 'en-GB';
  //const apiKey = process.env.SKYSCANNER_API_KEY;

  const url = `${endpoint}${country}/${locale}/${request.params.query}?isDestination=true&enable_general_search_v2=true`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        response.status(res.status);
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(json => response.send(json))
    .catch(err => {
      response.send(err);
    });
});

app.get('/api/search/:originplace/:destinationplace/:outbounddate/:inbounddate/:adults/:children/:infants', (request, response) => {
  //TODO fetch and return session
});

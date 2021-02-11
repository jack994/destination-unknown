# destination-unknown

Node.js project to compare flights in different markets.

The project is live on Heroku at the following URL: [https://dest-u-markets.herokuapp.com/](https://dest-u-markets.herokuapp.com/)
Beware the project runs on a free heroku account, which means the page may take some time (~20 seconds) to load if thee app didn't receive any activity for more than 30 minutes.

## Run the project locally

To run the application, a Skyscanner API key is required. A temporary key can be generated on [THIS PAGE](https://skyscanner.github.io/slate/#flights-browse-prices) clicking on `Run in Postman` (The requests imported to postman will contain the temporary key). After obtaining the key, create a `.env` file in the server folder containing `SKYSCANNER_API_KEY=<your_key_here>`.

To run the application follow these steps:

- `cd destination-unknown`
- `cd server && npm i && cd ../client && npm i && cd ..`
- `npm run start:client` in one terminal tab/window
- `npm run start:server` in another terminal tab/window
- If it does not open automatically, navigate to [http://localhost:3000](http://localhost:3000)

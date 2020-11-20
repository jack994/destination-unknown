const fetch = require("node-fetch");

async function pollSession(sessionUrl) {
  let completed = false;

  while (!completed) {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    // Fetch only first page to check status
    const respFirstpage = await fetch(`${sessionUrl}&pageIndex=0`);

    if (!respFirstpage.ok) {
      throw new Error(respFirstpage.statusText);
    }
    const responseJson = await respFirstpage.json();
    if (responseJson.Status && responseJson.Status === "UpdatesComplete") {
      completed = true;
    }
  }

  // fetch all pages if finished polling
  const finalResponse = await fetch(`${sessionUrl}`);

  if (!finalResponse.ok) {
    throw new Error(finalResponse.statusText);
  }
  const responseJson = await finalResponse.json();
  if (responseJson.Status && responseJson.Status === "UpdatesComplete") {
    return responseJson;
  }
}

async function requestPerMarket(market, requestBody){
  const bodyWithMarket = {
    ...requestBody,
    country: market,
  }
  const searchParams = new URLSearchParams(bodyWithMarket);
  const endpoint =
    "http://partners.api.skyscanner.net/apiservices/pricing/v1.0";

  const response = await fetch(endpoint, {
    method: "post",
    body: searchParams,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if(!response.ok){
    return {market, response: {}};
  }

  let session;
  let resp = {};
  for (var pair of response.headers.entries()) {
    if (pair[0].toLowerCase() === "location") {
      session = pair[1];
    }
  }
  if (session) {
    const sessionUrl = `${session}?apiKey=${requestBody.apiKey}`;
    resp = await pollSession(sessionUrl);
  }
  return {market, response: resp};
}

module.exports = {
  requestPerMarket,
};

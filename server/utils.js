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

module.exports = {
  pollSession,
};

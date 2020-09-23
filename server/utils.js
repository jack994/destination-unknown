const fetch = require("node-fetch");

async function pollSession(sessionUrl) {
  let completed = false;

  while (!completed) {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    // Fetch only first page to check status
    await fetch(`${sessionUrl}&pageIndex=0`).then(async (res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const responseJson = await res.json();
      if (responseJson.Status && responseJson.Status === "UpdatesComplete") {
        completed = true;
      }
    });
  }

  // fetch all pages if finished polling
  await fetch(`${sessionUrl}`).then(async (res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const responseJson = await res.json();
    if (responseJson.Status && responseJson.Status === "UpdatesComplete") {
      return responseJson;
    }
  });
}

module.exports = {
  pollSession,
};

/**
 * Triggers an API call to /scheduler endpoint at defined clock intervals.
 * This regular polling ensures that different scheduled tasks are carried out by the API.
 */
async function apiTimer() {
  const url = process.env.API_URL + "/scheduler";

  try {
    const response = await fetch(url, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    console.log("API was hit successfully!");
  } catch (error) {
    console.error("Error", error);
  }
}

export default apiTimer;

import apiTimer from "./jobs/apiTimer.js";
import "dotenv/config";

/**
 * Run jobs
 */
function run() {
  apiTimer();
}

run();

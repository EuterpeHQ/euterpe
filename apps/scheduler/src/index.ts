import { Cron } from "croner";

const schedule = Cron("0 * * * * *").nextRun();
console.log(schedule);

Cron("0 * * * * *", () => {
  console.log("Running job every minute");
});

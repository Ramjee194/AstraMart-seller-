// jobs/payoutJob.js
import cron from "node-cron";
import Vendor from "../models/Vendor.js";
import Payout from "../models/Payout.js";

// cron pattern from env or default daily 2AM
const CRON_SCHEDULE = process.env.PAYOUT_CRON || "0 2 * * *";

export function schedulePayouts() {
  cron.schedule(
    CRON_SCHEDULE,
    async () => {
      try {
        console.log("Running payout job...");

        const vendors = await Vendor.find({ earnings: { $gt: 0 } });

        for (const v of vendors) {
          // create payout record
          const payout = new Payout({
            vendor: v._id,
            amount: v.earnings,
            status: "pending",
            orders: [], // collect order IDs if needed
          });
          await payout.save();

          // reset vendor earnings to 0 (after creating payout)
          v.earnings = 0;
          await v.save();
        }

        console.log("Payout job finished.");
      } catch (err) {
        console.error("Error in payout job:", err);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
}

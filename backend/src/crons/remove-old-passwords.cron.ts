import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldPasswordRepository } from "../repositories/odl-password.repository";

const handler = async () => {
  try {
    const date = timeHelper.subtractCurrentByParams(180, "days");

    const count = await oldPasswordRepository.deleteManyByParams({
      createdAt: { $lt: date },
    });
    console.log(`Deleted ${count} old passwords`);
  } catch (e) {
    console.error(e.message);
  }
};

export const removeOldPasswords = new CronJob("* * */24 * 9 *", handler);

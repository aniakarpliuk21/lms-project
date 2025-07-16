import { CronJob } from "cron";

import { configure } from "../configs/configure";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  try {
    const string = configure.jwtRefreshExpiresIn;
    const { value, unit } = timeHelper.parseConfigString(string);
    const date = timeHelper.subtractCurrentByParams(value, unit);
    await tokenRepository.deleteBeforeDate(date);
  } catch (e) {
    console.error(e.message);
  }
};

export const removeOldTokens = new CronJob("* * */24 * 9 *", handler);

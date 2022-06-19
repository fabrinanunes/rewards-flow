const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

module.exports = function setCheckinStreak({ data, dayStreak }) {
  dayjs.extend(utc);
  const records = [];
  const map = {};

  for (const item of data) {
    const actualDate = dayjs().utc(item["Visit date"]);
    if (!map[item.token]) {
      map[item.token] = [];
    }

    if (map[item.token].length > 0) {
      const lastDay = dayjs().utc(actualDate).subtract(1, "d");
      const size = map[item.token].length;
      if (!lastDay.isSame(map[item.token][size - 1], "day")) {
        map[item.token] = [];
      }
    }

    if (map[item.token].length === dayStreak) {
      records.push({ ...item, gymVisitComplete: "3dayStreakComplete" });
      map[item.token] = [];
    }
  }

  return records;
};

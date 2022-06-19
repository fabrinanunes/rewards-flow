const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

module.exports = async ({ data, date }) => {
  const elasticsearchData = [];
  dayjs.extend(utc);
  dayjs.extend(timezone);

  // console.log(`Input: ${date} `);

  const payload = data.reduce((acc, event) => {
    if (dayjs.utc(event.date).isSame(date, "day")) {
      return acc;
    }

    // Generate payload for ElasticSearch Integration
    elasticsearchData.push({
      name: `${event["first_name"]} ${event["last_name"]}`,
      personId: event["person_id"],
      token: event["token"],
      companyId: event["companyId"],
      datetime: dayjs(event["date"]).utcOffset(0).toISOString(),
    });

    // Generate payload
    acc.push({
      ...event,
    });

    return acc;
  }, []);

  console.log(
    `DT - output: length: ${payload.length}, content: ${JSON.stringify(
      payload
    )}`
  );

  return payload;
};

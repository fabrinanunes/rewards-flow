const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

const dtGetMetabaseParams = require("../data-transformation/get-metabase-params");
const metabaseRequest = require("../utils/metabase-request");
const dtRewardsTransform = require("../data-transformation/rewards-transform");
const setCheckinStreak = require("../utils/rewards-helper");

module.exports.handler = async (event) => {
  let { metabaseCard, substractDays, companyId, companyName } =
    event.queryStringParameters;
  const projectType = "REWARDS CHECKIN";

  console.log(event.queryStringParameters);

  try {
    dayjs.extend(utc);

    console.log(`Start ${projectType}`);

    // Get items from Metabase
    const eventsDate = dayjs.utc().subtract(substractDays || 1, "days");
    const metabaseParams = await dtGetMetabaseParams({
      cardId: metabaseCard,
      date: eventsDate,
      companyId: companyId,
      companyName,
    });

    console.log(
      `Metabase Params: cardID: ${metabaseCard}, date: ${eventsDate}, params: ${JSON.stringify(
        metabaseParams
      )}`
    );

    const metabaseData = await metabaseRequest({
      cardId: metabaseCard,
      params: JSON.stringify(metabaseParams),
    });

    console.log(
      `Metabase Data: length: ${metabaseData.length}, content: ${JSON.stringify(
        metabaseData
      )}`
    );

    // Transform Source Data
    const visitStreak = setCheckinStreak({ data: metabaseData, dayStreak: 3 });

    const payload = await dtRewardsTransform({
      data: [...metabaseData, ...visitStreak],
      date: eventsDate,
      activityTypeField: "gymVisitComplete",
      activityDateField: "Visit date",
      companyId,
    });

    if (!payload.length) {
      return `No new events: ${projectType}`;
    }

    return payload;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    console.log(`END: ${projectType}`);
  }
};

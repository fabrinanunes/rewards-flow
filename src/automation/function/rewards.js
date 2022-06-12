const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const dtGetMetabaseParams = require("../data-transformation/dt-get-metabase-params");
const metabaseRequest = require("../utils/metabase-request");
const dtRewardsTransform = require("../data-transformation/dt-rewards-transform");

// module.exports.handler = async (event) => {
  async function metabase({ cardId, params = ''}){
  dayjs.extend(utc);
  dayjs.extend(timezone);

  // const {outputDebug, skipOutput, companyId, metabaseCardId, substractDays, projectName } = event.queryStringParameters;
    const projectName = `oi`;
    const substractDays = 1;
    const companyId = 780160;
    const metabaseCardId =  "1869";
    const startDate = "2022-01-01"

  // variables to use
  const project = projectName;
  const uniqueKey = dayjs().tz("America/Sao_Paulo").format();
  const projectType = 'REWARDS';

  console.log(`Start: ${projectType} - ${project}`);

  try {
    // Get items from Metabase
    const eventsDate = dayjs.utc().subtract(substractDays || 1, 'day');
    const metabaseParams = dtGetMetabaseParams({ cardId: metabaseCardId, date: eventsDate });
    
    console.log(`Metabase - Params: cardId: ${cardId}, date: ${eventsDate}, params: ${metabaseParams}`);

    const metabaseData = metabaseRequest({cardId: metabaseCardId, params: JSON.stringify(metabaseParams)});

    console.log(`Metabase Data: data: ${metabaseData.length}, content: ${metabaseData}`);

    //transform source data
    const { payload, elasticseachData } = await dtRewardsTransform({data: metabaseData, date: eventsDate});

    if(!payload.length){
      console.log(`No events Rewards`)
    }

    console.log(`
      data: ${payload},
      ${metabaseCardId},
      ${companyId},
      ${uniqueKey},
    `)
  } catch (err) {
    console.log(`Error: ${err}`)
  }
};

console.log(metabase({ cardId: '1869'}))

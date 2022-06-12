const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

module.exports = async ({ data, date}) => {
   dayjs.extend(utc);
   dayjs.extend(timezone);

   const elasticseachData = [];
   
   console.log(`DT - Input: ${data}`);

   const payload = await data.reduce((acc, event) => {
      if(!dayjs.utc(event.date).isSame(date, 'day')){
         return acc
      }

      //generate payload for Elastic Search
      elasticseachData.push({
         name: `${event['first_name']} ${event['last_name']}`,
         personId: event['person_id'],
         token: event['token'],
         companyId: event['companyId'],
         datetime: dayjs(event['data']).utcOffset(0).toISOString(),
      })

      //generate payload to send to Rewards API
      acc.push({
         ...event
      })

      return acc
   }, [])

   console.log(`Data Transformation - Output: data: ${payload.length}, content: ${payload}`)

   return { payload, elasticseachData }
}


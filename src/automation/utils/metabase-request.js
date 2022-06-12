const axios = require("axios");
require('dotenv').config();

const enviroments = {
  baseURL: process.env.BASE_URL,
  token: process.env.METABASE_TOKEN,
};

module.exports = async ({ cardId, params }) => {
  try {
   const token = enviroments.token;
   let url = `${enviroments.baseURL}/card/${cardId}/query/json`

   if(params){
      url = url.concat(`?parameters[${params}]`)
   }

   const options = {
      method: 'POST',
      url,
      headers: {
         'x-metabase-session': '21b9cf77-3eb5-4191-92db-9d93e228593e'
      },
      retries: 5,
      json: true
   }

   const result = await axios(options)
   return result.data || result
  } catch (error) {
    console.log(error);
  }
}

const { default: axios } = require("axios");
const METABASE_SESSION = process.env.METABASE_SESSION

module.exports = async ({ cardId, params = "" }) => {
  try {
    let url = `https://metabase.us.gympass.cloud/api/card/${cardId}/query/json`;

    if (params) {
      url = url.concat(`?parameters=${params}`);
    }

    const options = {
      method: "POST",
      url,
      headers: {
        "x-metabase-session": METABASE_SESSION
      },
      retries: 5,
      json: true,
    };

    const result = await axios(options);

    return result.data || result;
  } catch (error) {
    if (error.body) {
      throw error.body;
    }

    throw error;
  }
};

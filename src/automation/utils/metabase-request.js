const { default: axios } = require("axios");

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
        "x-metabase-session": "21b9cf77-3eb5-4191-92db-9d93e228593e",
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

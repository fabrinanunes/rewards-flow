// // Kimco & NFP (virgin pulse)
// exports.virginpulse = async ({ date, companyId }) => {
//   const params = [
//     {
//       type: "category",
//       target: ["variable", ["template-tag", "createdAt"]],
//       value: date.format("YYYYMMDD"),
//     },
//     {
//       type: "category",
//       target: ["variable", ["template-tag", "companyId"]],
//       value: String(companyId),
//     },
//   ];

//   return params;
// };

// //Castlight
// exports.castlight = async ({ cardId, date }) => {
//   const cardMapping = {
//     5551: {
//       params: "date",
//       dateType: "Day",
//       dateParam: date.format("YYYY-MM-DD"),
//     },
//     1869: {
//       paramType: "number",
//       dateType: "Year",
//       dateParam: date.format("YYYY"),
//     },
//   };

//   if (!cardMapping[cardId]) {
//     throw new Error(`Metabase mapping not created for cardId ${cardId}`);
//   }

//   const cardValues = cardMapping[cardId];

//   const params = [
//     {
//       type: String(cardValues.paramType),
//       target: ["variable", ["template-tag", String(cardValues.dateType)]],
//       value: String(cardValues.dateParam),
//     },
//   ];

//   return params;
// };

// // Sami
// exports.sami = async ({ date, companyId }) => {
//   const params = [
//     {
//       type: "category",
//       target: ["variable", ["template-tag", "day"]],
//       value: date.format("YYYYMMDD"),
//     },
//     {
//       type: "category",
//       target: ["variable", ["template-tag", "companyId"]],
//       value: String(companyId),
//     },
//   ];

//   return params;
// };

module.exports = async ({ date, companyId, companyName, cardId }) => {
  let params = [];
  switch (companyName) {
    case "virginpulse":
      params = [
        {
          type: "category",
          target: ["variable", ["template-tag", "createdAt"]],
          value: date.format("YYYYMMDD"),
        },
        {
          type: "category",
          target: ["variable", ["template-tag", "companyId"]],
          value: String(companyId),
        },
      ];
      break;

    case "castlight":
      const cardMapping = {
        5551: {
          params: "date",
          dateType: "Day",
          dateParam: date.format("YYYY-MM-DD"),
        },
        1869: {
          paramType: "number",
          dateType: "Year",
          dateParam: date.format("YYYY"),
        },
      };

      if (!cardMapping[cardId]) {
        throw new Error(`Metabase mapping not created for cardId ${cardId}`);
      }

      const cardValues = cardMapping[cardId];

      params = [
        {
          type: String(cardValues.paramType),
          target: ["variable", ["template-tag", String(cardValues.dateType)]],
          value: String(cardValues.dateParam),
        },
      ];

      break;
    default:
      params = [
        {
          type: "date",
          target: ["variable", ["template-tag", "Day"]],
          value: date.format("YYYY-MM-DD"),
        },
      ];
  }

  return params;
};

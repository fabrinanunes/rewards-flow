module.exports = async ({ date }) => {
  const params = [
    {
      type: "date",
      target: ["variable", ["template-tag", "Day"]],
      value: date.format("YYYY-MM-DD"),
    },
  ];

  return params;
};

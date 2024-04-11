import { formatDate } from "./formatDate.js";

function aggregateDataByDate(graphData) {
  const groupedByDate = graphData.reduce((acc, item) => {
    const date = formatDate(item.createdAt);
    if (!acc[date]) {
      acc[date] = { amount: 0, dates: [] };
    }
    acc[date].amount += item.amount;
    acc[date].dates.push(item.createdAt);
    return acc;
  }, {});

  return Object.entries(groupedByDate).map(([createdAtFormatted, data]) => ({
    createdAtFormatted,
    amount: data.amount,
    dates: data.dates,
  }));
}

function dataProcessing(graphData) {
  const aggregatedByDate = aggregateDataByDate(graphData);

  const sortedByDate = aggregatedByDate.sort(
    (a, b) => new Date(a.dates[0]) - new Date(b.dates[0])
  );

  let totalExp = 0;
  const transformedData = sortedByDate.map((item) => {
    totalExp += item.amount;
    return {
      createdAtFormatted: item.createdAtFormatted,
      cumulativeExp: Number(Math.abs(totalExp / 1000)).toFixed(1),
      amount: item.amount,
    };
  });

  transformedData.unshift({
    cumulativeExp: 0,
    createdAtFormatted: "",
  });

  return transformedData;
}

export { dataProcessing };

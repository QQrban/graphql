function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function dataProcessing(graphData) {
  const sortedByDate = graphData.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  let totalExp = 0;
  const transformedData = sortedByDate.map((item) => {
    totalExp += item.amount;
    return {
      createdAtFormatted: formatDate(item.createdAt),
      cumulativeExp: Number(Math.abs(totalExp / 1000).toFixed(1)),
    };
  });

  let sampledData = [];
  let datesSet = new Set();

  if (transformedData.length <= 10) {
    sampledData = transformedData.filter((item) => {
      const isUnique = !datesSet.has(item.createdAtFormatted);
      datesSet.add(item.createdAtFormatted);
      return isUnique;
    });
  } else {
    const step = (transformedData.length - 1) / 9;
    for (let i = 0; i < 10; i++) {
      let index = Math.round(i * step);
      let currentItem = transformedData[index];
      while (
        datesSet.has(currentItem.createdAtFormatted) &&
        index < transformedData.length - 1
      ) {
        index++;
        currentItem = transformedData[index];
      }
      if (!datesSet.has(currentItem.createdAtFormatted)) {
        sampledData.push(currentItem);
        datesSet.add(currentItem.createdAtFormatted);
      }
    }
  }

  return sampledData;
}

export { dataProcessing };

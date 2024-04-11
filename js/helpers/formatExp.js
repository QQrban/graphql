function formatExp(cumulativeExp) {
  if (cumulativeExp > 1000) {
    return `${Math.abs(cumulativeExp / 1000).toFixed(2)} mB`;
  } else if (+cumulativeExp < 1) {
    return `${cumulativeExp * 1000}B `;
  } else {
    return `${cumulativeExp} kB`;
  }
}

export { formatExp };

function buildGraph(processedData) {
  const width = 1220;
  const height = 700;
  const padding = 30;
  let svgNS = "http://www.w3.org/2000/svg";

  let svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", 1220);
  svg.setAttribute("height", height);
  svg.classList.add("visible");
  svg.classList.add("svg_container");
  document.getElementById("graphContainer").appendChild(svg);

  function createSVGElement(type, attrs) {
    let el = document.createElementNS(svgNS, type);
    for (let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
    svg.appendChild(el);
    return el;
  }

  const horizontalLinesCount = Math.floor((height - 2 * padding) / 30);
  for (let i = 0; i <= horizontalLinesCount; i++) {
    let y =
      height - padding - (i * (height - 2 * padding)) / horizontalLinesCount;
    createSVGElement("line", {
      x1: padding,
      y1: y,
      x2: width,
      y2: y,
      stroke: "rgba(68, 68, 68, 0.14)",
    });
  }

  const verticalLinesCount = Math.floor((width - 2 * padding) / 30);
  for (let i = -1; i <= verticalLinesCount; i++) {
    let x = padding + (i * (width - 2 * padding)) / verticalLinesCount;
    createSVGElement("line", {
      x1: x + 30,
      y1: padding,
      x2: x + 30,
      y2: height - padding,
      stroke: "rgba(68, 68, 68, 0.14)",
    });
  }

  createSVGElement("line", {
    x1: padding,
    y1: height - padding,
    x2: width,
    y2: height - padding,
    stroke: "#444",
  });

  createSVGElement("line", {
    x1: padding,
    y1: padding,
    x2: padding,
    y2: height - padding,
    stroke: "#444",
  });

  let maxCumulativeExp = Math.max(
    ...processedData.map((item) => item.cumulativeExp)
  );

  let previousPoint = null;

  processedData.forEach((point, index) => {
    let DateSpaceBetween = (width - padding * 2) / processedData.length;
    let x = padding + index * DateSpaceBetween;
    let y =
      height -
      padding -
      (point.cumulativeExp / maxCumulativeExp) * (height - padding * 2);

    if (previousPoint) {
      createSVGElement("line", {
        x1: previousPoint.x,
        y1: previousPoint.y,
        x2: x,
        y2: y,
        stroke: "#444",
      });
    }

    previousPoint = { x, y };

    createSVGElement("text", {
      x: x,
      y: height - 5,
      "text-anchor": "middle",
      fill: "black",
    }).textContent = point.createdAtFormatted;

    function formatExp(cumulativeExp) {
      if (cumulativeExp > 1000) {
        return `${Math.abs(cumulativeExp / 1000).toFixed(2)} mB`;
      } else if (+cumulativeExp < 1) {
        return `${cumulativeExp * 1000}B `;
      } else {
        return `${cumulativeExp} kB`;
      }
    }

    createSVGElement("text", {
      x: -8,
      y: y,
      "text-anchor": "middle",
      fill: "black",
    }).textContent = formatExp(point.cumulativeExp);

    createSVGElement("circle", {
      cx: x,
      cy: y,
      r: 3,
      fill: "#444",
    });
  });
}

export { buildGraph };

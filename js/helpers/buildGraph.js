import { formatExp } from "./formatExp.js";

function buildGraph(processedData, width = 1220, height = 700) {
  if (window.innerWidth < 770) {
    width = 700;
  }

  if (window.innerWidth < 589) {
    width = 400;
  }

  let padding = 30;
  let svgNS = "http://www.w3.org/2000/svg";
  const svgContainer = document.querySelector(".svg_container");
  if (svgContainer) {
    svgContainer.remove();
  }
  let svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

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
      stroke: "rgba(68, 68, 68, 0.11)",
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
      stroke: "rgba(68, 68, 68, 0.11)",
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

  const totalLabels = 8;
  const interval = Math.floor((processedData.length - 2) / (totalLabels - 2));
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

    if (
      index === 1 ||
      index === processedData.length - 1 ||
      (index % interval === 0 && index !== processedData.length - 2)
    ) {
      createSVGElement("text", {
        x: x,
        y: height - 5,
        "text-anchor": "middle",
        fill: "black",
        class: "amount",
      }).textContent = point.createdAtFormatted.split(",")[0];
    }

    if (index !== 0) {
      const circle = createSVGElement("circle", {
        cx: x,
        cy: y,
        r: 4,
        class: "circles-with-data",
        fill: "#444",
        "data-amount": point.amount,
        "data-date": point.createdAtFormatted,
      });

      const label = createSVGElement("text", {
        x: x - 80,
        y: y - 10,
        "text-anchor": "middle",
        fill: "#209cee",
        class: "circle-label",
        "font-size": "10px",
        visibility: "hidden",
      });
      label.textContent = `${point.createdAtFormatted}; +${formatExp(
        Number(Math.abs(point.amount / 1000).toFixed(1))
      )}`;

      circle.addEventListener("mouseover", () => {
        label.setAttribute("visibility", "visible");
      });

      circle.addEventListener("mouseout", () => {
        label.setAttribute("visibility", "hidden");
      });
    }

    let yAxisInterval = maxCumulativeExp > 1000 ? 100 : 50;

    let yAxisLabelsCount = Math.floor(maxCumulativeExp / yAxisInterval);

    for (let i = 0; i <= yAxisLabelsCount; i++) {
      let labelValue = i * yAxisInterval;
      let y =
        height -
        padding -
        (labelValue / maxCumulativeExp) * (height - 2 * padding);

      createSVGElement("text", {
        x: padding - 10,
        y: y,
        "text-anchor": "end",
        fill: "black",
        class: "text",
      }).textContent = `${
        labelValue >= 1000 ? labelValue / 1000 + " mB" : labelValue + " kB"
      }`;
    }
  });
}

export { buildGraph };

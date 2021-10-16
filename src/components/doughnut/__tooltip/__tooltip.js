const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector(".doughnut__tooltip");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    // tooltipEl.style.opacity = 1;
    tooltipEl.classList.add("doughnut__tooltip");

    const text = document.createElement("p");
    text.classList.add("doughnut__tooltip-text");

    tooltipEl.appendChild(text);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const htmlTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }
  //set text
  if (tooltip.body) {
    const bodyLines = tooltip.body.map((b) => b.lines);

    while (tooltipEl.firstChild.firstChild) {
      tooltipEl.firstChild.firstChild.remove();
    }
    bodyLines.forEach((body, i) => {
      tooltipEl.firstChild.appendChild(document.createTextNode(body));
    });
  }

  // const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = tooltip.caretX + "px";
  tooltipEl.style.top = tooltip.caretY + "px";
};

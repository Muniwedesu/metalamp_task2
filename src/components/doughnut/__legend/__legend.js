function getOrCreateLegendList(chart, doughnutContainer) {
  const legendContainer = doughnutContainer;
  let list = doughnutContainer.querySelector(".doughnut__legend");
  if (!list) {
    list = document.createElement("ul");
    list.classList.add("doughnut__legend");
    legendContainer.appendChild(list);
  }
  return list;
}
export const htmlLegend = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.doughnutContainer);

    //I may need to rewrite this for existing html?
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    const items = chart.options.plugins.legend.labels.generateLabels(chart).reverse();
    items.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("doughnut__legend-item");
      li.onclick = () => {
        chart.toggleDataVisibility(item.index);
        chart.update();
      };

      // Icon
      const icon = document.createElement("div");
      icon.classList.add("doughnut__item-icon");

      icon.style.background = options.iconFillColors[item.index];
      // Text
      const textContainer = document.createElement("p");
      textContainer.classList.add("doughnut__item-text");
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(icon);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

function getOrCreateTitle() {
  // const container = document.createElement("div");
  const container = document.querySelector(".doughnut__title");
  return container;
}

export const htmlTitle = {
  id: "htmlTitle",
  afterDatasetUpdate(chart, args, options) {
    const title = getOrCreateTitle();
    while (title.firstChild) {
      title.firstChild.remove();
    }
    const valueContainer = document.createElement("p");
    valueContainer.classList.add("doughnut__title-value");
    const valueText = document.createTextNode(args.meta.total);
    const textContainer = document.createElement("p");
    textContainer.classList.add("doughnut__title-text");
    const ratesText = document.createTextNode("голосов");

    const {
      offsetLeft: positionX,
      offsetTop: positionY,
      width: canvasW,
      height: canvasH,
    } = chart.canvas;
    valueContainer.appendChild(valueText);
    textContainer.appendChild(ratesText);
    title.appendChild(valueContainer);
    title.appendChild(textContainer);
    //(width - width) * 0.5
    //(height - height) * 0.5
    const { offsetWidth: width, offsetHeight: height } = title;
    title.style.left = positionX + (canvasW - width) / 2 + "px";
    title.style.top = positionY + (canvasH - height) / 2 + "px";
    //position title.
  },
};

import Chart from "chart.js/auto";

import { htmlLegend } from "./__legend/__legend";
import { Gradients } from "./gradients";
import { htmlTooltipHandler } from "./__tooltip/__tooltip";
import { htmlTitle } from "./__title/__title";
export class DoughnutChart {
  /**
   *
   * @param {HTMLElement} element
   * @param {dataset} dataset
   */
  constructor(element, data) {
    this.$element = $(element);
    this.ctx = this.$element.find(".doughnut__chart")[0].getContext("2d");
    this.gradients = new Gradients(this.ctx);
    this.data = {
      labels: data.labels,
      datasets: [
        {
          label: data.title,
          data: data.values,
        },
      ],
    };
    //fix this (it depends on the canvas context)
    //pass fill colors into constructor as {start: #000, end: #000};
    this.data.datasets[0].backgroundColor = [...this.gradients.dataFillColor];

    this.chart = new Chart(this.ctx, {
      type: "doughnut",
      options: {
        responsive: true,
        cutout: "90%",
        plugins: {
          legend: { display: false },
          htmlLegend: {
            doughnutContainer: $(".doughnut")[0],
            iconFillColors: this.gradients.iconFillColors,
          },
          htmlTitle: {},
          tooltip: {
            enabled: false,
            position: "nearest",
            external: htmlTooltipHandler,
          },
        },
        aspectRatio: 1,
      },
      data: this.data,
      plugins: [htmlLegend, htmlTitle],
    });
  }
}

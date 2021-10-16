export class Gradients {
  constructor(ctx) {
    this.ctx = ctx;
    this.x0 = 0;
    this.y0 = 0;
    this.x1 = 0;
    this.dataFillColor = [
      this.perfect(),
      this.good(),
      this.adequate(),
      this.disappointed(),
    ].reverse();
    this.iconFillColors = [
      "linear-gradient(180deg, #FFE39C 0%, #FFBA9C 100%)",
      "linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%)",
      "linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%)",
      "linear-gradient(180deg, #919191 0%, #3D4975 100%)",
    ].reverse();
    //reverse order is needed because chart.js lacks direction setting (clockwise/counter-clockwise)
  }

  perfect() {
    const perfectGradient = this.ctx.createLinearGradient(
      this.x0,
      this.y0,
      this.x1,
      this.ctx.canvas.height
    );
    perfectGradient.addColorStop(0, "#FFE39C");
    perfectGradient.addColorStop(1, "#FFBA9C");
    return perfectGradient;
  }
  good() {
    const perfectGradient = this.ctx.createLinearGradient(
      this.x0,
      this.y0,
      this.x1,
      this.ctx.canvas.height
    );
    perfectGradient.addColorStop(0, "#6FCF97");
    perfectGradient.addColorStop(1, "#66D2EA");
    return perfectGradient;
  }
  adequate() {
    const perfectGradient = this.ctx.createLinearGradient(
      this.x0,
      this.y0,
      this.x1,
      this.ctx.canvas.height
    );
    perfectGradient.addColorStop(0, "#BC9CFF");
    perfectGradient.addColorStop(1, "#8BA4F9");
    return perfectGradient;
  }
  disappointed() {
    const perfectGradient = this.ctx.createLinearGradient(
      this.x0,
      this.y0,
      this.x1,
      this.ctx.canvas.height
    );
    perfectGradient.addColorStop(0, "#919191");
    perfectGradient.addColorStop(1, "#3D4975");
    return perfectGradient;
  }
}

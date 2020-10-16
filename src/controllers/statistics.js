import { Statistics } from "../components/statistics";
import { render } from "../components/utils";
import { pageBodyContainer } from "../main";

export class StatisticsController {
  constructor(days) {
    this._days = days;
    this._statistics = new Statistics();
  }

  init() {
    // this.show();
    render(pageBodyContainer, this._statistics.getElement());
    this.hide();
  }

  hide() {
    this._statistics.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._statistics.getElement().classList.remove(`visually-hidden`);
  }
}

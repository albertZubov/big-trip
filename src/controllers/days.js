import { Day } from "../components/day";
import { EventController } from "./events";

export class DaysController {
  constructor(days, onDataChange, onChangeView) {
    this._days = days;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
  }

  create() {
    const daysMarkup = document.createDocumentFragment();
    this._days.forEach((dayOfEventsData, id) => {
      const arrEvents = document.createDocumentFragment();
      dayOfEventsData.forEach((el) => {
        this._event = new EventController(
          el,
          this._onDataChange,
          this._onChangeView
        );
        const tripEvents = this._event.init();
        arrEvents.append(tripEvents);
      });
      const day = new Day(id, arrEvents).getElement();
      daysMarkup.append(day);
    });
    return daysMarkup;
  }
}

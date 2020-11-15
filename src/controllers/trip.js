import { render, renderWithChildren, copyArr } from "../components/utils";
import { DaysController } from "./days";
import { TripDay } from "../components/trip-days";
import { Sort } from "../components/sort";
import { getEvent } from "../components/data";

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export class TripController {
  constructor(days) {
    this._days = days;
    this._tripDays = renderWithChildren(
      new TripDay().getElement(),
      this._renderDays(this._days)
    );
    this._sort = new Sort();
    this._tripEventsDom = document.querySelector(`.trip-events`);
    this._creatingEvent = null;

    // this._onChangeView = this._onChangeView.bind(this);
    // this._onDataChange = this._onDataChange.bind(this);
    this._activeEvent = null;
  }

  init() {
    render(this._tripEventsDom, this._sort.getElement());
    render(this._tripEventsDom, this._tripDays);

    this._sort
      .getElement()
      .addEventListener(`click`, (evt) => this._onClickSort(evt));
  }

  _renderDays(days) {
    return new DaysController(
      days,
      this._onDataChange.bind(this),
      this._onChangeView.bind(this),
      Mode.DEFAULT
    ).create();
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    const defaultEvent = getEvent();

    this._creatingEvent = new DaysController(
      this._days,
      this._onDataChange.bind(this),
      this._onChangeView.bind(this),
      Mode.ADDING,
      defaultEvent
    );

    this._cleanContainer();
    render(this._tripDays, this._creatingEvent.create());
  }

  _onChangeView(event) {
    if (
      this._activeEvent &&
      event !== this._activeEvent &&
      this._activeEvent.domEventEdit.parentNode
    ) {
      this._activeEvent.closeEdit();
    }

    this._activeEvent = event;
  }

  _onDataChange(newData, oldData) {
    // ДОРАБОТАТЬ
    // console.log(newData.favorites);

    let indexEvent = null;
    const indexDay = this._days.findIndex((days) => {
      indexEvent = days.findIndex((event) => event === oldData);
      return days.find((event) => event === oldData);
    });

    if (oldData === null && newData === null) {
      this._days[0].splice(0, 1);
      this._creatingEvent = null;
    } else if (newData === null) {
      this._days[indexDay].splice(indexEvent, 1); 
    } else if (oldData === null) {
      this._creatingEvent = null;
      this._days[0] = [newData, ...this._days[0]];
    } else {
      this._days[indexDay][indexEvent] = newData;
    }

    // Если нету ни одного события в дне, то он удаляется
    this._days = this._days.filter((day) => day.length);

    this._cleanContainer();

    render(this._tripDays, this._renderDays(this._days));
  }

  _update(data) {
    this._tripDays.innerHTML = ``;
    render(this._tripDays, this._renderDays(data));
  }

  _cleanContainer() {
    this._tripDays.innerHTML = ``;
  }

  hide() {
    this._tripEventsDom.classList.add(`visually-hidden`);
  }

  show() {
    this._tripEventsDom.classList.remove(`visually-hidden`);
  }

  /* eslint-disable */
  _onClickSort(evt) {
    const daysArr = copyArr(this._days);
    const { sortType, sortDirection } = evt.target.dataset;

    if (!sortType) {
      return;
    }

    const direction = +sortDirection;
    evt.target.dataset.sortDirection = direction ? 0 : 1;

    switch (sortType) {
      case `time`:
        const sortedTime = daysArr.map((day) =>
          day.sort((first, last) =>
            direction
              ? first.randomTimeTransit - last.randomTimeTransit
              : last.randomTimeTransit - first.randomTimeTransit
          )
        );
        this._update(sortedTime);
        break;

      case `price`:
        const sortedPrice = daysArr.map((day) =>
          day.sort((first, last) =>
            direction ? last.price - first.price : first.price - last.price
          )
        );
        this._update(sortedPrice);
        break;

      case `default`:
        this._update(this._days);
        break;
    }
  }
}

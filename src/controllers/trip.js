import { createFilter } from "../components/filter";
import { createMenuInfo } from "../components/menu-info";
import { createMenu } from "../components/menu";
import { Sort } from "../components/sort";
import { getMenuData } from "../components/data";
import { render, renderWithChildren, copyArr } from "../components/utils";
import { DaysController } from "./days";

export class TripController {
  constructor(container, days) {
    this._container = container;
    this._days = days;
    this._tripDays - null;
    this._sort = new Sort();
    this._tripEventsDom = document.querySelector(`.trip-events`);

    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    const tripMain = document.querySelector(`.trip-main`);
    const tripMenu = tripMain.querySelector(`.trip-controls`);
    const tripMenuFirstTitle = tripMenu.querySelector(`.visually-hidden`);

    render(tripMain, createMenuInfo(this._days, getMenuData()), `afterBegin`);
    render(tripMenuFirstTitle, createMenu(), `afterEnd`);
    render(tripMenu, createFilter());
    render(this._tripEventsDom, this._sort.getElement());

    this._tripDays = renderWithChildren(
      this._container,
      this._renderDays(this._days)
    );

    render(this._tripEventsDom, this._tripDays);

    this._sort
      .getElement()
      .addEventListener(`click`, (evt) => this._onClickSort(evt));
  }

  _renderDays(data) {
    return new DaysController(
      this._container,
      data,
      this._onDataChange
    ).create();
  }

  _update(data) {
    this._tripDays.innerHTML = ``;
    render(this._tripDays, this._renderDays(data));
  }

  _cleanContainer() {
    this._container.innerHTML = ``;
  }

  _onDataChange(newData, oldData) {
    this._days.forEach((day) => {
      day[day.findIndex((item) => item === oldData)] = newData;
    });
    this._cleanContainer();
    render(this._container, this._renderDays(this._days));
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

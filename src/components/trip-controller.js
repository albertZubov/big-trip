import { Day } from "./day";
import { EventEdit } from "./event-edit";
import { Event } from "./event";
import { createFilter } from "./filter";
import { createMenuInfo } from "./menu-info";
import { createMenu } from "./menu";
import { Sort } from "./sort";
import { getMenuData } from "./data";
import { render, renderWithChildren, copyArr } from "./utils";
import { TripEvents } from "./trip-events";

export class TripController {
  constructor(container, days) {
    this._container = container;
    this._days = days;
    this._newDays = null;
    this._sort = new Sort();
    this._tripEventsDom = document.querySelector(`.trip-events`);
    this._flag = true;
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
    const daysMarkup = document.createDocumentFragment();
    data.forEach((dayOfEventsData, id) => {
      const arrEvents = document.createDocumentFragment();
      dayOfEventsData.forEach((el) => {
        if (!el.domEvent) {
          el.domEvent = new Event(el).getElement();
          el.domEventEdit = new EventEdit(el).getElement();
        }
        const { domEvent, domEventEdit } = el;

        const eventsContainer = renderWithChildren(
          new TripEvents().getElement(),
          domEvent
        );

        const btnEvent = domEvent.querySelector(".event__rollup-btn");
        const btnEventEdit = domEventEdit.querySelector(".event__rollup-btn");

        const onEscKeyDown = (evt) => {
          if (evt.key === `Escape` || evt.ket === `Esc`) {
            eventsContainer.replaceChild(domEvent, domEventEdit);
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        btnEvent.addEventListener("click", () => {
          eventsContainer.replaceChild(domEventEdit, domEvent);
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        btnEventEdit.addEventListener(`click`, () => {
          eventsContainer.replaceChild(domEvent, domEventEdit);
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

        arrEvents.append(eventsContainer);
      });
      const day = new Day(id, arrEvents).getElement();
      daysMarkup.append(day);
    });
    return daysMarkup;
  }

  _update(data) {
    this._tripDays.innerHTML = ``;
    render(this._tripDays, this._renderDays(data));
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

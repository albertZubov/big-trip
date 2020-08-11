import { Day } from "./day";
import { EventEdit } from "./event-edit";
import { Event } from "./event";
import { createFilter } from "./filter";
import { createMenuInfo } from "./menu-info";
import { createMenu } from "./menu";
import { createSort } from "./sort";
import { TripDay } from "./trip-days";
import { getMenuData } from "./data";
import { render, renderWithChildren } from "./utils";
import { TripEvents } from "./trip-events";

export class TripController {
  constructor(container, days) {
    this._container = container;
    this._days = days;
  }

  init() {
    const tripMain = document.querySelector(`.trip-main`);
    const tripMenu = tripMain.querySelector(`.trip-controls`);
    const tripMenuFirstTitle = tripMenu.querySelector(`.visually-hidden`);
    const tripEvents = document.querySelector(`.trip-events`);

    const daysMarkup = document.createDocumentFragment();
    this._days.forEach((dayOfEventsData, id) => {
      const arrEvents = document.createDocumentFragment();
      dayOfEventsData.forEach((el) => {
        const event = new Event(el).getElement();
        const eventEdit = new EventEdit(el).getElement();
        const eventsContainer = renderWithChildren(
          new TripEvents().getElement(),
          event
        );

        const btnEvent = event.querySelector(".event__rollup-btn");
        const btnEventEdit = eventEdit.querySelector(".event__rollup-btn");

        const onEscKeyDown = (evt) => {
          if (evt.key === `Escape` || evt.ket === `Esc`) {
            eventsContainer.replaceChild(event, eventEdit);
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        btnEvent.addEventListener("click", () => {
          eventsContainer.replaceChild(eventEdit, event);
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        btnEventEdit.addEventListener(`click`, () => {
          eventsContainer.replaceChild(event, eventEdit);
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

        arrEvents.append(eventsContainer);
      });
      const day = new Day(id, arrEvents).getElement();
      daysMarkup.append(day);
    });

    render(tripMain, createMenuInfo(this._days, getMenuData()), `afterBegin`);
    render(tripMenuFirstTitle, createMenu(), `afterEnd`);
    render(tripMenu, createFilter());
    render(tripEvents, createSort());
    render(
      tripEvents,
      renderWithChildren(new TripDay().getElement(), daysMarkup)
    );
  }
}

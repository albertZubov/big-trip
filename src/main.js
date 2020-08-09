import { Day } from "./components/day";
import { EventEdit } from "./components/event-edit";
import { Event } from "./components/event";
import { createFilter } from "./components/filter";
import { createMenuInfo } from "./components/menu-info";
import { createMenu } from "./components/menu";
import { createSort } from "./components/sort";
import { createTripDay } from "./components/trip-days";
import { getEvent, getMenuData } from "./components/data";
import { render, renderWithChildren } from "./components/utils";
import { createTripEvents } from "./components/trip-events";

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls`);
const tripMenuFirstTitle = tripMenu.querySelector(`.visually-hidden`);
const tripEvents = document.querySelector(`.trip-events`);
const EVENT_COUNT = 3;
const DAY_COUNT = 3;

const eventsArrData = () => new Array(EVENT_COUNT).fill(``).map(getEvent);
const daysArrData = new Array(DAY_COUNT).fill(``).map(eventsArrData);

const daysMarkup = document.createDocumentFragment();
daysArrData.forEach((dayOfEventsData, id) => {
  const arrEvents = document.createDocumentFragment();
  dayOfEventsData.forEach((el) => {
    const event = new Event(el).getElement();
    const eventEdit = new EventEdit(el).getElement();
    const eventsContainer = renderWithChildren(createTripEvents(), event);

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

render(tripMain, createMenuInfo(daysArrData, getMenuData()), `afterBegin`);
render(tripMenuFirstTitle, createMenu(), `afterEnd`);
render(tripMenu, createFilter());
render(tripEvents, createSort());
/* const tripEventEdit = tripEvents.querySelector(`.trip-events__list`);
render(
  tripEventEdit,
  createEventWrap(createEventEdit(getEvent())),
  `afterBegin`
); */
render(tripEvents, renderWithChildren(createTripDay(), daysMarkup));

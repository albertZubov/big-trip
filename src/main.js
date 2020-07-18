import { createDay } from "./components/day";
import { createEventEdit } from "./components/event-edit";
import { createEvent } from "./components/event";
import { createFilter } from "./components/filter";
import { createMenuInfo } from "./components/menu-info";
import { createMenu } from "./components/menu";
import { createSort } from "./components/sort";
import { createTripDay } from "./components/trip-days";
import { createEventWrap } from "./components/event-wrap";
import { getEvent, getMenuData } from "./components/data";

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls`);
const tripMenuFirstTitle = tripMenu.querySelector(`.visually-hidden`);
const tripEvents = document.querySelector(`.trip-events`);
const EVENT_COUNT = 3;
const DAY_COUNT = 3;

const render = (container, element, posititon = `beforeEnd`) => {
  const div = document.createElement(`div`);
  div.innerHTML = element;
  const node = div.firstElementChild;
  container.insertAdjacentHTML(posititon, element);

  return node;
};

const eventsArr = () => new Array(EVENT_COUNT).fill(``).map(getEvent);
const daysArr = new Array(DAY_COUNT).fill(``).map(eventsArr);

const getDayMarkup = (arr) =>
  arr.map(createEvent).map(createEventWrap).join(``);

const daysMarkup = daysArr.map((dayOfEvents, id) =>
  createDay(id, getDayMarkup(dayOfEvents))
);

render(tripMain, createMenuInfo(daysArr, getMenuData()), `afterBegin`);

render(tripMenuFirstTitle, createMenu(), `afterEnd`);
render(tripMenu, createFilter());
render(tripEvents, createSort());

render(tripEvents, createTripDay(daysMarkup));
const tripEventEdit = tripEvents.querySelector(`.trip-events__list`);
render(
  tripEventEdit,
  createEventWrap(createEventEdit(getEvent())),
  `afterBegin`
);

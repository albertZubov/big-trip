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
const DAY_COUNT = 1;

const render = (container, element, posititon = `beforeEnd`) => {
  const div = document.createElement(`div`);
  div.innerHTML = element;
  const node = div.firstElementChild;
  container.insertAdjacentHTML(posititon, element);

  return node;
};

render(tripMain, createMenuInfo(getMenuData()), `afterBegin`);

render(tripMenuFirstTitle, createMenu(), `afterEnd`);
render(tripMenu, createFilter());
render(tripEvents, createSort());

const getEventMarkup = () =>
  new Array(EVENT_COUNT)
    .fill(``)
    .map(getEvent)
    .map(createEvent)
    .map(createEventWrap)
    .join(``);

const days = new Array(DAY_COUNT)
  .fill(``)
  .map((_, id) => createDay(id, getEvent(), getEventMarkup()));

render(tripEvents, createTripDay(days));
const tripEventEdit = tripEvents.querySelector(`.trip-events__list`);
render(
  tripEventEdit,
  createEventWrap(createEventEdit(getEvent())),
  `afterBegin`
);

const arrPrice = tripEvents.querySelectorAll(`.event__price-value`);
const totalPrice = tripMain.querySelector(`.trip-info__cost-value`);
let totalAmountPrice = Number();
arrPrice.forEach((cb) => {
  totalAmountPrice += +cb.textContent;
});

totalPrice.textContent = totalAmountPrice;

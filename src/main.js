import { createDay } from "./components/day";
import { EventEdit } from "./components/event-edit";
import { Event } from "./components/event";
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
  let node = element;

  if (typeof element === `string`) {
    const div = document.createElement(`div`);
    div.innerHTML = element;
    node = div.firstElementChild;
    container.insertAdjacentHTML(posititon, element);
  } else {
    container.insertAdjacentHTML(posititon, element);
  }
  return node;
};

const renderEvents = (data) => {
  const event = new Event(data);
  // const eventEdit = new EventEdit(data);

  const setMarkup = createEventWrap(event.getElement().outerHTML);

  event
    .getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      console.log(`32131`);
      // eventsList.replaceChild(eventEdit.getElement(), event.getElement());
    });

  return setMarkup;
};

const eventsArrData = () => new Array(EVENT_COUNT).fill(``).map(getEvent);
const daysArr = new Array(DAY_COUNT).fill(``).map(eventsArrData);

/* const getDayMarkup = (dayOfEventsData) =>
  dayOfEventsData
    .map((dataEvent) => new CreateEvent(dataEvent).getElement())
    .map((event) => createEventWrap(event.outerHTML))
    .join(``); */

const daysMarkup = daysArr.map((dayOfEventsData, id) => {
  // return createDay(id, getDayMarkup(dayOfEventsData));

  const arrEvent = [];
  dayOfEventsData.forEach((data) => {
    arrEvent.push(renderEvents(data));
  });
  return createDay(id, arrEvent.join(``));
});

render(tripMain, createMenuInfo(daysArr, getMenuData()), `afterBegin`);
render(tripMenuFirstTitle, createMenu(), `afterEnd`);
render(tripMenu, createFilter());
render(tripEvents, createSort());
render(tripEvents, createTripDay(daysMarkup));
/* const tripEventEdit = tripEvents.querySelector(`.trip-events__list`);
render(
  tripEventEdit,
  createEventWrap(createEventEdit(getEvent())),
  `afterBegin`
); */

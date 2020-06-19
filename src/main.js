import { createDay } from "./components/day";
import { createEventEdit } from "./components/event-edit";
import { createEvent } from "./components/event";
import { createFilter } from "./components/filter";
import { createMenuInfo } from "./components/menu-info";
import { createMenu } from "./components/menu";
import { createSort } from "./components/sort";
import { createTripDay } from "./components/trip-days";
import { createEventWrap } from "./components/event-wrap";
import { getEvent } from "./components/data";

const tripMain = document.querySelector(`.trip-main`);
const tripMenu = tripMain.querySelector(`.trip-controls`);
const tripMenuFirstTitle = tripMenu.querySelector(`.visually-hidden`);
const tripEvents = document.querySelector(`.trip-events`);
const EVENT_COUNT = 3;
const DAY_COUNT = 2;

const render = (container, element, posititon = `beforeEnd`) => {
  const div = document.createElement(`div`);
  div.innerHTML = element;
  const node = div.firstElementChild;
  container.insertAdjacentHTML(posititon, element);

  return node;
};

render(
  tripMain,
  createMenuInfo(
    `Amsterdam — Chamonix — Geneva`,
    `Mar 18&nbsp;—&nbsp;20`,
    1230
  ),
  `afterBegin`
);

render(tripMenuFirstTitle, createMenu(), `afterEnd`);
render(tripMenu, createFilter());
render(tripEvents, createSort());

/* const createStringFromArray = (length, ...fns) => {
  getEvent(),
  new Array(3)
    // .fill(``)
    // .map(getEvent)
    // .map(createEvent)
    // .map(createEventWrap)
    .join(``)
}; 

createStringFromArray(3, createEventWrap, createEvent);
*/

const event = new Array(EVENT_COUNT)
  .fill(``)
  .map(getEvent)
  .map(createEvent)
  .map(createEventWrap)
  .join(``);

const day = new Array(DAY_COUNT).fill(``).map(getEvent, event).map(createDay);

render(
  tripEvents,
  createTripDay([
    createDay(getEvent(), event),
    /* createDay(
      getEvent(),
      `2019-03-19`,
      `MAR 19`,
      createEventWrap(
        createEvent(
          `taxi`,
          `Flight to Geneva`,
          `2019-03-19T14:20`,
          `14:20`,
          `2019-03-19T13:00`,
          `13:00`,
          `1H 20M`,
          50,
          `Book tickets`,
          40
        )
      ),
      createEventWrap(createEventEdit(getEvent()))
    ),

    createDay(
      getEvent(),
      `2019-03-19`,
      `MAR 19`,
      createEventWrap(
        createEvent(
          `flight`,
          `Check-in in Chamonix`,
          `2019-03-18T16:20`,
          `16:20`,
          `2019-03-18T17:00`,
          `17:00`,
          `40M`,
          600,
          `Add breakfast`,
          50
        )
      )
    ), */
  ])
);

import { getCountRandom } from "./data";

export const createEvent = ({
  typeEventTransfer,
  title,
  isDate,
  transitTime,
  eventOffer,
}) => {
  const randomTimeTransit = transitTime[getCountRandom(0, transitTime.length)];
  return `
<div class="event">
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${
      typeEventTransfer[getCountRandom(0, typeEventTransfer.length)]
    }.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${title[getCountRandom(0, title.length)]}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${isDate.getFullYear()}-${isDate.getMonth()}-${isDate.getDate()}T${isDate.getHours()}:${isDate.getMinutes()}">${isDate.getHours()}:${isDate.getMinutes()}</time>
      —
      <time class="event__end-time" datetime="${isDate.getFullYear()}-${isDate.getMonth()}-${isDate.getDate()}T${
    isDate.getHours() + randomTimeTransit
  }:${isDate.getMinutes()}">${
    isDate.getHours() + randomTimeTransit
  }:${isDate.getMinutes()}</time>
    </p>
    <p class="event__duration">${
      isDate.getHours() + randomTimeTransit - isDate.getHours()
    }H ${`00`}M</p>
  </div>
  <p class="event__price">
    €&nbsp;<span class="event__price-value">${
      Math.round(getCountRandom(40, 200) / 10) * 10
    }</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    <li class="event__offer">
      <span class="event__offer-title">${
        eventOffer[getCountRandom(0, eventOffer.length)].title
      }</span>
      +
      €&nbsp;<span class="event__offer-price">${
        eventOffer[getCountRandom(0, eventOffer.length)].price
      }</span>
     </li>
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
`;
};

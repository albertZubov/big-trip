import { getCountRandom } from "./data";
import { createElement } from "./utils.js";

export class CreateEvent {
  constructor({
    typeEventTransfer,
    title,
    isDate,
    transitTime,
    eventOffer,
    price,
  }) {
    this.typeEventTransfer = typeEventTransfer;
    this.title = title;
    this.isDate = isDate;
    this.transitTime = transitTime;
    this.eventOffer = eventOffer;
    this.price = price;
    this.element = null;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getTemplate() {
    const randomTimeTransit = this.transitTime[
      getCountRandom(0, this.transitTime.length)
    ];
    return `
<div class="event">
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${
      this.typeEventTransfer[getCountRandom(0, this.typeEventTransfer.length)]
    }.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${
    this.title[getCountRandom(0, this.title.length)]
  }</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${this.isDate.year}-${
      this.isDate.month
    }-${this.isDate.dayPresent}T${this.isDate.timePresent}">${
      this.isDate.timePresent
    }</time>
      —
      <time class="event__end-time" datetime="${this.isDate.year}-${
      this.isDate.month
    }-${this.isDate.dayPresent}T${this.isDate.hours + randomTimeTransit}:${
      this.isDate.minutes
    }">${this.isDate.hours + randomTimeTransit}:${this.isDate.minutes}</time>
    </p>
    <p class="event__duration">${
      this.isDate.hours + randomTimeTransit - this.isDate.hours
    }H ${`00`}M</p>
  </div>
  <p class="event__price">
    €&nbsp;<span class="event__price-value">${this.price}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    <li class="event__offer">
      <span class="event__offer-title">${
        this.eventOffer[getCountRandom(0, this.eventOffer.length)].title
      }</span>
      +
      €&nbsp;<span class="event__offer-price">${
        this.eventOffer[getCountRandom(0, this.eventOffer.length)].price
      }</span>
     </li>
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
`;
  }
}

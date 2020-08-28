import { getCountRandom } from "./data";
import { AbstractComponent } from "./abstract-component";

/* eslint-disable indent */
export class Event extends AbstractComponent {
  constructor({
    typeEventTransfer,
    title,
    isDateStart,
    isDateEnd,
    transitTime,
    eventOffer,
    price,
    randomTimeTransit,
  }) {
    super();
    this._typeEventTransfer = typeEventTransfer;
    this._title = title;
    this._isDateStart = isDateStart;
    this._isDateEnd = isDateEnd;
    this._transitTime = transitTime;
    this._eventOffer = eventOffer;
    this._price = price;
    this._randomTimeTransit = randomTimeTransit;
  }

  getTemplate() {
    return `
<div class="event">
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${
      this._typeEventTransfer[getCountRandom(0, this._typeEventTransfer.length)]
    }.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${
    this._title[getCountRandom(0, this._title.length)]
  }</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${this._isDateStart.year}-${
      this._isDateStart.month
    }-${this._isDateStart.dayPresent}T${this._isDateStart.timePresent}">${
      this._isDateStart.timePresent
    }</time>
      —
      <time class="event__end-time" datetime="${this._isDateEnd.year}-${
      this._isDateEnd.month
    }-${this._isDateEnd.dayPresent}T${
      this._isDateEnd.hours + this._randomTimeTransit
    }:${this._isDateEnd.minutes}">${
      this._isDateEnd.hours + this._randomTimeTransit
    }:${this._isDateEnd.minutes}</time>
    </p>
    <p class="event__duration">${
      this._isDateStart.hours + this._randomTimeTransit - this._isDateEnd.hours
    }H ${`00`}M</p>
  </div>
  <p class="event__price">
    €&nbsp;<span class="event__price-value">${this._price}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    <li class="event__offer">
      <span class="event__offer-title">${
        this._eventOffer[getCountRandom(0, this._eventOffer.length)].title
      }</span>
      +
      €&nbsp;<span class="event__offer-price">${
        this._eventOffer[getCountRandom(0, this._eventOffer.length)].price
      }</span>
     </li>
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>`;
  }
}

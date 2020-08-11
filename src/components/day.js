import { renderWithChildren } from "./utils.js";
import { AbstractComponent } from "./abstract-component.js";

export class Day extends AbstractComponent {
  constructor(counter, children) {
    super();
    this._counter = counter;
    this._children = children;
  }

  getElement() {
    if (!this._element) {
      this._element = renderWithChildren(this.getTemplate(), this._children);
    }
    return this._element;
  }

  getTemplate() {
    const isDate = new Date();
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${this._counter + 1}</span>
      <time class="day__date" datetime="${isDate.getDate()}-${isDate.getMonth()}-${isDate.getFullYear()}">${
      isDate.toString().split(` `)[1] +
      ` ` +
      (+isDate.toString().split(` `)[2] + this._counter)
    }</time>
    </div>
    <ul class="trip-events__list">
      <children />
    </ul>
  </li>`;
  }
}

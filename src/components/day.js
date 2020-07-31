import { renderWithChildren } from "./utils.js";

export class Day {
  constructor(counter, children) {
    this.counter = counter;
    this.children = children;
    this.element = null;
  }

  getElement() {
    if (!this.element) {
      this.element = renderWithChildren(this.getTemplate(), this.children);
    }
    return this.element;
  }

  getTemplate() {
    const isDate = new Date();
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${this.counter + 1}</span>
      <time class="day__date" datetime="${isDate.getDate()}-${isDate.getMonth()}-${isDate.getFullYear()}">${
      isDate.toString().split(` `)[1] +
      ` ` +
      (+isDate.toString().split(` `)[2] + this.counter)
    }</time>
    </div>
    <ul class="trip-events__list">
      <children />
    </ul>
  </li>`;
  }
}

import { AbstractComponent } from "./abstract-component";

export class TripEvents extends AbstractComponent {
  getTemplate() {
    return `
    <li class="trip-events__item">
      <children />
    </li>
    `;
  }
}

import { AbstractComponent } from "./abstract-component";

export class TripDay extends AbstractComponent {
  getTemplate() {
    return `
    <ul class="trip-days">
      <children/>
    </ul>
    `;
  }
}

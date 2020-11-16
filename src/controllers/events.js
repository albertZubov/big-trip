import { TripEvents } from "../components/trip-events";
import { EventEdit } from "../components/event-edit";
import { Event } from "../components/event";
import { renderWithChildren } from "../components/utils";
import { Mode } from "./trip";

export class EventController {
  constructor(event, onDataChange, onChangeView, mode) {
    this._event = event;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._mode = mode;
  }

  getObjDate(date) {
    const [dayPresent, monthNumber, year, hours, minutes] = date.split(
      /[\s:\/]/g
    );

    return {
      dayPresent,
      monthNumber,
      year,
      hours,
      minutes,
      timePresent: `${hours}:${minutes}`,
    };
  }

  _updateOffers(el, formData) {
    return el.eventOffer.map((offer) => {
      offer.checked = formData.get(`event-offer-${offer.value}`) === `on`;
      return offer;
    });
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        if (this._mode === Mode.DEFAULT) {
          this._event.closeEdit();
        } else if (this._mode === Mode.ADDING) {
          this._onDataChange(null, null);
        }

        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._event.domEvent = new Event(this._event).getElement();
    this._event.domEventEdit = new EventEdit(this._event).getElement();

    let currentEvent = this._event.domEvent;
    if (this._mode === Mode.ADDING) {
      currentEvent = this._event.domEventEdit;
      document.addEventListener(`keydown`, onEscKeyDown);
    }

    // if (this._event.domEvent) {
    this._event.showEdit = () =>
      this._event.domEvent.parentNode.replaceChild(
        this._event.domEventEdit,
        this._event.domEvent
      );

    this._event.closeEdit = () =>
      this._event.domEventEdit.parentNode.replaceChild(
        this._event.domEvent,
        this._event.domEventEdit
      );

    this._event.domEventEdit
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const formData = new FormData(this._event.domEventEdit);

        const dateChangeStart = formData.get(`event-start-time`);
        const dateChangeEnd = formData.get(`event-end-time`);

        const entry = {
          typeEventTransfer: formData.get(`event-type`),
          city: formData.get(`event-destination`),
          description: this._event.description,
          randomTimeTransit: this._event.randomTimeTransit,
          isDateStart: this.getObjDate(dateChangeStart),
          isDateEnd: this.getObjDate(dateChangeEnd),
          price: formData.get(`event-price`),
          favorites: formData.get(`event-favorite`) === `on`,
          eventOffer: this._updateOffers(this._event, formData),
        };

        this._onDataChange(
          entry,
          this._mode === Mode.DEFAULT ? this._event : null
        );

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._event.domEventEdit
      .querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        this._onDataChange(null, this._event);
      });

    const btnEvent = this._event.domEvent.querySelector(".event__rollup-btn");
    const btnEventEdit = this._event.domEventEdit.querySelector(
      ".event__rollup-btn"
    );

    btnEvent.addEventListener("click", () => {
      this._onChangeView(this._event);
      this._event.showEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    btnEventEdit.addEventListener(`click`, () => {
      if (this._mode === Mode.ADDING) {
        return;
      } else {
        this._event.closeEdit();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    });
    // }
    return renderWithChildren(new TripEvents().getElement(), currentEvent);
  }
}

import { TripEvents } from "../components/trip-events";
import { Day } from "../components/day";
import { EventEdit } from "../components/event-edit";
import { Event } from "../components/event";
import { renderWithChildren } from "../components/utils";

export class DaysController {
  constructor(data, onDataChange, onChangeView) {
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
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
      timePresent: `${hours}: ${minutes}`,
    };
  }

  updateOffers(el, formData) {
    return el.eventOffer.map((offer) => {
      offer.checked = formData.get(`event-offer-${offer.value}`) === `on`;
      return offer;
    });
  }

  create() {
    const daysMarkup = document.createDocumentFragment();
    this._data.forEach((dayOfEventsData, id) => {
      const arrEvents = document.createDocumentFragment();
      dayOfEventsData.forEach((el) => {
        if (!el.domEvent) {
          el.domEvent = new Event(el).getElement();
          el.domEventEdit = new EventEdit(el).getElement();

          el.showEdit = () =>
            el.domEvent.parentNode.replaceChild(el.domEventEdit, el.domEvent);

          el.closeEdit = () =>
            el.domEventEdit.parentNode.replaceChild(
              el.domEvent,
              el.domEventEdit
            );

          el.domEventEdit
            .querySelector(`.event__save-btn`)
            .addEventListener(`click`, (evt) => {
              evt.preventDefault();
              const formData = new FormData(el.domEventEdit);

              const dateChangeStart = formData.get(`event-start-time`);
              const dateChangeEnd = formData.get(`event-end-time`);

              const entry = {
                typeEventTransfer: formData.get(`event-type`),
                city: formData.get(`event-destination`),
                description: el.description,
                randomTimeTransit: el.randomTimeTransit,
                isDateStart: this.getObjDate(dateChangeStart),
                isDateEnd: this.getObjDate(dateChangeEnd),
                price: formData.get(`event-price`),
                favourites: formData.get(`event-favorite`) === `on`,
                eventOffer: this.updateOffers(el, formData),
              };

              this._onDataChange(entry, el);

              document.removeEventListener(`keydown`, onEscKeyDown);
            });

          const btnEvent = el.domEvent.querySelector(".event__rollup-btn");
          const btnEventEdit = el.domEventEdit.querySelector(
            ".event__rollup-btn"
          );

          const onEscKeyDown = (evt) => {
            if (evt.key === `Escape` || evt.ket === `Esc`) {
              // eventsContainer.replaceChild(domEvent, el.domEventEdit);
              el.closeEdit();
              document.removeEventListener(`keydown`, onEscKeyDown);
            }
          };

          btnEvent.addEventListener("click", () => {
            this._onChangeView(el);
            el.showEdit();
            // eventsContainer.replaceChild(el.domEventEdit, domEvent);
            document.addEventListener(`keydown`, onEscKeyDown);
          });

          btnEventEdit.addEventListener(`click`, () => {
            el.closeEdit();
            // eventsContainer.replaceChild(domEvent, el.domEventEdit);
            document.removeEventListener(`keydown`, onEscKeyDown);
          });
        }

        const eventsContainer = renderWithChildren(
          new TripEvents().getElement(),
          el.domEvent
        );

        arrEvents.append(eventsContainer);
      });
      const day = new Day(id, arrEvents).getElement();
      daysMarkup.append(day);
    });
    return daysMarkup;
  }
}

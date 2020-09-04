import { TripEvents } from "../components/trip-events";
import { Day } from "../components/day";
import { EventEdit } from "../components/event-edit";
import { Event } from "../components/event";
import { renderWithChildren } from "../components/utils";

export class DaysController {
  constructor(container, data, onDataChange) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
  }

  create() {
    const daysMarkup = document.createDocumentFragment();
    this._data.forEach((dayOfEventsData, id) => {
      const arrEvents = document.createDocumentFragment();
      dayOfEventsData.forEach((el) => {
        if (!el.domEvent) {
          el.domEvent = new Event(el).getElement();
          el.domEventEdit = new EventEdit(el).getElement();
        }
        const { domEvent, domEventEdit } = el;

        domEventEdit.querySelector(
          `.event__type-icon`
        ).src = domEvent.querySelector(`.event__type-icon`).src;

        const eventsContainer = renderWithChildren(
          new TripEvents().getElement(),
          domEvent
        );

        domEventEdit
          .querySelector(`.event__save-btn`)
          .addEventListener(`click`, (evt) => {
            evt.preventDefault();
            const formData = new FormData(domEventEdit);

            const getObjDate = (date) => ({
              dayPresent: +date.split(/[\s:\/]/g)[0],
              monthNumber: +date.split(/[\s:\/]/g)[1],
              year: +date.split(/[\s:\/]/g)[2],
              timePresent: `${date.split(/[\s:\/]/g)[3]}:${
                date.split(/[\s:\/]/g)[4]
              }`,
              hours: +date.split(/[\s:\/]/g)[3],
              minutes: +date.split(/[\s:\/]/g)[4],
            });

            const dateChangeStart = formData.get(`event-start-time`);
            const dateChangeEnd = formData.get(`event-end-time`);

            const entry = {
              typeEventTransfer: formData.get(`event-type`),
              city: formData.get(`event-destination`),

              description: el.description,
              photos: el.photos,
              randomTimeTransit: el.randomTimeTransit,
              isDateStart: getObjDate(dateChangeStart),
              isDateEnd: getObjDate(dateChangeEnd),
              price: formData.get(`event-price`),
              favourites:
                formData.get(`event-favorite`) === `on` ? true : false,
              eventOffer: el.eventOffer.map((offer) => {
                offer.checked =
                  formData.get(`event-offer-${offer.value}`) === `on`
                    ? true
                    : false;
                return offer;
              }),
            };

            console.log(entry);

            this._onDataChange(entry, el);

            document.removeEventListener(`keydown`, onEscKeyDown);
          });

        const btnEvent = domEvent.querySelector(".event__rollup-btn");
        const btnEventEdit = domEventEdit.querySelector(".event__rollup-btn");

        const onEscKeyDown = (evt) => {
          if (evt.key === `Escape` || evt.ket === `Esc`) {
            eventsContainer.replaceChild(domEvent, domEventEdit);
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        btnEvent.addEventListener("click", () => {
          eventsContainer.replaceChild(domEventEdit, domEvent);
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        btnEventEdit.addEventListener(`click`, () => {
          eventsContainer.replaceChild(domEvent, domEventEdit);
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

        arrEvents.append(eventsContainer);
      });
      const day = new Day(id, arrEvents).getElement();
      daysMarkup.append(day);
    });
    return daysMarkup;
  }
}

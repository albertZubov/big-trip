import { getEvent } from "../components/data";
import { TripController } from "../controllers/trip";
import { createFilter } from "../components/filter";
import { createMenuInfo } from "../components/menu-info";
import { createMenu } from "../components/menu";
import { getMenuData } from "../components/data";
import { render } from "../components/utils";
import { StatisticsController } from "./statistics";

const pageBody = document.querySelector(`.page-body`);
const tripMain = pageBody.querySelector(`.trip-main`);
const pageMain = pageBody.querySelector(`.page-main`);
export const pageBodyContainer = pageMain.querySelector(
  `.page-body__container`
);

const EVENT_COUNT = 4;
// const DAY_COUNT = 3;

// const renderEvents = () => new Array(EVENT_COUNT).fill(``).map(getEvent);
// const days = new Array(DAY_COUNT).fill(``).map(renderEvents);

export class MainController {
  constructor() {
    this._statisticsController = null;
    this._tripController = null;

    this._tripMenu = tripMain.querySelector(`.trip-controls`);
    this._days = null;
  }

  init(events) {
    this._renderDaysIsEvent(events);
    this._statisticsController = new StatisticsController(this._days);
    this._tripController = new TripController(this._days);
    this._renderPage();
  }

  _renderDaysIsEvent(events) {
    this._days = events.reduce(
      (a, b) => {
        if (a[a.length - 1].length === EVENT_COUNT) {
          a.push([]);
        }

        a[a.length - 1].push(b);
        return a;
      },
      [[]]
    );
  }

  _renderPage() {
    const tripMenuFirstTitle = this._tripMenu.querySelector(`.visually-hidden`);

    render(tripMain, createMenuInfo(this._days, getMenuData()), `afterBegin`);
    render(tripMenuFirstTitle, createMenu(), `afterEnd`);
    render(this._tripMenu, createFilter());
    this._tripController.init();
    this._statisticsController.init();

    /* eslint-disable */
    // Добавление обработчика события на кнопки - статистика/таблица
    const tripBtnTabs = tripMain.querySelector(`.trip-tabs`);
    tripMain.addEventListener(`click`, (evt) => {
      const { target } = evt;

      if (target.tagName !== `A` && target.tagName !== `BUTTON`) {
        return;
      }

      if (target.tagName === `A`) {
        if (Array.from(target.classList).includes(`trip-tabs__btn--active`)) {
          return;
        } else {
          Array.from(tripBtnTabs.children).forEach((btn) => {
            btn.classList.toggle(`trip-tabs__btn--active`);
          });
        }
      }

      switch (target.dataset.eventClick) {
        case "stats":
          this._tripController.hide();
          this._statisticsController.show();
          break;

        case "table":
          this._tripController.show();
          this._statisticsController.hide();
          break;

        case "addEvent":
          this._tripController.createEvent();
          break;
      }
    });
  }
}

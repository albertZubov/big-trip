import { TripDay } from "./components/trip-days";
import { getEvent } from "./components/data";
import { TripController } from "./components/trip-controller";

const EVENT_COUNT = 3;
const DAY_COUNT = 3;
const tripDays = new TripDay().getElement();

const eventsArrData = () => new Array(EVENT_COUNT).fill(``).map(getEvent);
const daysArrData = new Array(DAY_COUNT).fill(``).map(eventsArrData);

const tripController = new TripController(tripDays, daysArrData);
tripController.init();

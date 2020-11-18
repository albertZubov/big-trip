import { MainController } from "./controllers/main";
import { API } from "./components/api";
import { actionsEvent } from "./controllers/events";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;

/* eslint-disable */
const onDataChange = (actionType, updateEvent) => {
  switch (actionType) {
    case actionsEvent.update:
      api
        .updateEvent({
          id: updateEvent.id,
          event: updateEvent.toRAW(),
        })
        .then(() => api.getEvents())
        .then((events) => mainController.init(events));
      break;
  }
};

// Запуск контроллера MainController
const mainController = new MainController(onDataChange);
const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });

api.getEvents().then((events) => mainController.init(events));

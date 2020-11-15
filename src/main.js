import { MainController } from "./controllers/main";
import { API } from "./components/api";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;

// Запуск контроллера MainController
const mainController = new MainController();
const api = new API({ endPoint: END_POINT, authorization: AUTHORIZATION });

api.getEvents().then((events) => mainController.init(events));

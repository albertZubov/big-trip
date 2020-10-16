import { MainController } from "./controllers/main";

export const pageBody = document.querySelector(`.page-body`);
export const tripMain = pageBody.querySelector(`.trip-main`);
export const pageMain = pageBody.querySelector(`.page-main`);
export const pageBodyContainer = pageMain.querySelector(
  `.page-body__container`
);

// Запуск контроллера MainController
const mainController = new MainController();
mainController._init();

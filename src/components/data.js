import { getDate } from "./utils";

const getRandomNumber = (number) => getCountRandom(1, number);

export const getCountRandom = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const getEvent = () => ({
  typeEventTransfer: [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
  ],
  typeEventActivity: [`check-in`, `sightseeing`, `restaurant`],
  title: [
    `Sightseeing in Chamonix`,
    `Drive to Geneva`,
    `Sightseeing in Geneva`,
    `Drive to Chamonix`,
    `Flight to Chamonix`,
  ],
  transitTime: [1, 2, 3, 4, 5],
  cities: [
    `Orel - city hero`,
    `Amsterdam`,
    `Geneva`,
    `Chamonix`,
    `Saint Petersburg`,
    `New York`,
  ],
  photos: `${Math.random()}`,
  price: Math.round(getCountRandom(40, 200) / 10) * 10,
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ].slice(0, getRandomNumber(4)),
  isDate: getDate(new Date()),
  eventOffer: [
    { value: `luggage`, title: `Add luggage`, price: `30` },
    {
      value: `comfort`,
      title: `Switch to comfort class`,
      price: `50`,
      checked: `checked`,
    },
    { value: `meal`, title: `Add meal`, price: `70` },
    { value: `seats`, title: `Choose seats`, price: `80`, checked: `checked` },
    { value: `train`, title: `Travel by train`, price: `60` },
  ],
});

export const getMenuData = () => ({
  title: [`Amsterdam`, `Chamonix`, `Geneva`, `Washington`, `London`].sort(
    () => Math.random() - 0.5
  ),
  isDate: getDate(new Date()),
});

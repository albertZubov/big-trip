import { getDate } from "./utils";

export const getRandomNumber = (number) => getCountRandom(0, number);
export const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export const getCountRandom = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const types = [
  {
    sightseeing: `Sightseeing in`,
    drive: `Drive to`,
    flight: `Flight to`,
    train: `Train to`,
    bus: `Bus to`,
    taxi: `Taxi to`,
    ship: `Ship to`,
  },
  {
    "check-in": `Check-in in`,
    restaurant: `Restaurant in`,
    transport: `Transport to`,
  },
];

export const citiesArr = [
  `Orel - city hero`,
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`,
  `New York`,
];

export const getTitleByType = (type) => {
  const typesObj = types.find((obj) => Object.keys(obj).includes(type));
  return typesObj[type];
};

const getKey = (obj) => {
  const keys = Object.keys(obj);
  return keys[getRandomNumber(keys.length)];
};

export const getEvent = () => ({
  typeEventTransfer: getKey(types[getRandomNumber(types.length)]),
  transitTime: [1, 2, 3, 4, 5],
  randomTimeTransit: getCountRandom(0, 5),
  city: citiesArr[getRandomNumber(citiesArr.length)],
  photos: `${Math.random()}`,
  price: Math.round(getCountRandom(40, 200) / 10) * 10,
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ],
  isDateStart: getDate(new Date()),
  isDateEnd: getDate(new Date()),
  favorites: true,
  eventOffer: [
    {
      value: `luggage`,
      title: `Add luggage`,
      price: `30`,
      checked: getRandomBoolean(),
    },
    {
      value: `comfort`,
      title: `Switch to comfort class`,
      price: `50`,
      checked: getRandomBoolean(),
    },
    {
      value: `meal`,
      title: `Add meal`,
      price: `70`,
      checked: getRandomBoolean(),
    },
    {
      value: `seats`,
      title: `Choose seats`,
      price: `80`,
      checked: getRandomBoolean(),
    },
    {
      value: `train`,
      title: `Travel by train`,
      price: `60`,
      checked: getRandomBoolean(),
    },
  ],
});

export const getMenuData = () => ({
  title: [
    `Orel - city hero`,
    `Amsterdam`,
    `Geneva`,
    `Chamonix`,
    `Saint Petersburg`,
    `New York`,
  ].sort(() => Math.random() - 0.5),
  isDate: getDate(new Date()),
});

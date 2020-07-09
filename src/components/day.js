export const createDay = (counter, { isDate }, ...event) => {
  return `
<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${counter + 1}</span>
    <time class="day__date" datetime="${isDate.getDate()}-${isDate.getMonth()}-${isDate.getFullYear()}">${
    isDate.toString().slice(4, 8) + (+isDate.toString().slice(8, 10) + counter)
  }</time>
  </div>

  <ul class="trip-events__list">
    ${event}
  </ul>
</li>
`;
};

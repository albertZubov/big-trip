export const createDay = ({ counter, isDate }, ...event) => {
  return `
<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${counter}</span>
    <time class="day__date" datetime="${isDate.getDate()}-${isDate.getMonth()}-${isDate.getFullYear()}">${isDate
    .toString()
    .slice(4, 10)}</time>
  </div>

  <ul class="trip-events__list">
    ${event.join(``)}
  </ul>
</li>
`;
};

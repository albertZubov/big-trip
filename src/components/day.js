export const createDay = (counter, ...event) => {
  const isDate = new Date();
  return `
<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${counter + 1}</span>
    <time class="day__date" datetime="${isDate.getDate()}-${isDate.getMonth()}-${isDate.getFullYear()}">${
    isDate.toString().split(` `)[1] +
    ` ` +
    (+isDate.toString().split(` `)[2] + counter)
  }</time>
  </div>
  <ul class="trip-events__list">
    ${event}
  </ul>
</li>
`;
};

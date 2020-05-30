export const createDay = (numberDay, dateAttr, dateContent, ...eventWrap) => `
<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${numberDay}</span>
    <time class="day__date" datetime="${dateAttr}">${dateContent}</time>
  </div>

  <ul class="trip-events__list">
    ${eventWrap.join(``)}
  </ul>
</li>
`;

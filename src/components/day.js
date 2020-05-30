export const createDay = (numberDay, dateAttr, dateContent, event) => `
<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${numberDay}</span>
    <time class="day__date" datetime="${dateAttr}">${dateContent}</time>
  </div>

  <ul class="trip-events__list">
    <li class="trip-events__item">
    ${event}
    </li>
  </ul>
</li>
`;

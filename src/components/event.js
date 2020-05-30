export const createEvent = (
  image,
  title,
  dateAttrStart,
  dateAttrEnd,
  timeStart,
  timeEnd,
  duration,
  price,
  offerTitle,
  offerPrice
) => `
<div class="event">
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${image}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${title}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${dateAttrStart}">${timeStart}</time>
      —
      <time class="event__end-time" datetime="${dateAttrEnd}">${timeEnd}</time>
    </p>
    <p class="event__duration">${duration}</p>
  </div>
  <p class="event__price">
    €&nbsp;<span class="event__price-value">${price}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    <li class="event__offer">
      <span class="event__offer-title">${offerTitle}</span>
      +
      €&nbsp;<span class="event__offer-price">${offerPrice}</span>
     </li>
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
`;
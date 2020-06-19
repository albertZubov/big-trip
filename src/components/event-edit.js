/* eslint-disable indent */
const COUNT_PHOTO = 5;

export const createEventEdit = ({
  typeEventTransfer,
  typeEventActivity,
  cities,
  photos,
  description,
  isDate,
  eventOffer,
}) => {
  return `
<form class="event  event--edit" action="#" method="post">
 <header class="event__header">
   <div class="event__type-wrapper">
     <label class="event__type  event__type-btn" for="event-type-toggle-1">
       <span class="visually-hidden">Choose event type</span>
       <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
     </label>
     <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

     <div class="event__type-list">
       <fieldset class="event__type-group">
         <legend class="visually-hidden">Transfer</legend>
         ${typeEventTransfer
           .map(
             (elem) => `
        <div class="event__type-item">
          <input id="event-type-${elem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${elem}" ${
               elem === `flight` ? `checked` : ``
             }>
          <label class="event__type-label  event__type-label--${elem}" for="event-type-${elem}-1">
          ${elem[0].toUpperCase() + elem.slice(1)}</label>
        </div>
        `
           )
           .join(``)}
       </fieldset>

       <fieldset class="event__type-group">
         <legend class="visually-hidden">Activity</legend>
         ${typeEventActivity
           .map(
             (elem) => `
        <div class="event__type-item">
          <input id="event-type-${elem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${elem}">
           <label class="event__type-label  event__type-label--${elem}" for="event-type-${elem}-1">${
               elem[0].toUpperCase() + elem.slice(1)
             }</label>
        </div>
        `
           )
           .join(``)}
       </fieldset>
     </div>
   </div>

   <div class="event__field-group  event__field-group--destination">
     <label class="event__label  event__type-output" for="event-destination-1">
       Flight to
     </label>
     <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
     <datalist id="destination-list-1">
     ${cities.map(
       (city) => `
     <option value="${city}"></option>
     `
     )}
     </datalist>
   </div>

   <div class="event__field-group  event__field-group--time">
     <label class="visually-hidden" for="event-start-time-1">
       From
     </label>
     <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${isDate.getDate()}/${
    isDate.getMonth() + 1
  }/${isDate.getFullYear()} ${isDate.toTimeString().slice(0, 5)}"> 
     —
     <label class="visually-hidden" for="event-end-time-1">
       To
     </label>
     <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${
       isDate.getDate() + 1
     }/${
    isDate.getMonth() + 1
  }/${isDate.getFullYear()} ${isDate.toTimeString().slice(0, 5)}">
   </div>

   <div class="event__field-group  event__field-group--price">
     <label class="event__label" for="event-price-1">
       <span class="visually-hidden">Price</span>
       €
     </label>
     <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
   </div>

   <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
   <button class="event__reset-btn" type="reset">Cancel</button>
 </header>
 <section class="event__details">
   <section class="event__section  event__section--offers">
     <h3 class="event__section-title  event__section-title--offers">Offers</h3>

     <div class="event__available-offers">
             ${eventOffer
               .map(
                 (elem) => `
             <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${elem.value}-1" type="checkbox" name="event-offer-${elem.value}" ${elem.checked}>
              <label class="event__offer-label" for="event-offer-${elem.value}-1">
                <span class="event__offer-title">${elem.title}</span> + €&nbsp;<span class="event__offer-price">${elem.price}</span>
             </label>
           </div>
             `
               )
               .join(``)}
     </div>
   </section>
   <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
        ${description}
      </p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
                ${new Array(COUNT_PHOTO)
                  .fill(``)
                  .map(
                    () => `
                  <img class="event__photo" src="http://picsum.photos/300/150?r=${Math.random(
                    photos
                  )}" alt="Event photo">
                `
                  )
                  .join(``)}
        </div>
      </div>
      </section>
 </section>
</form>
`;
};

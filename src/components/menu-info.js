export const createMenuInfo = ({ title, isDate, totalAmount }) => `
<section class="trip-main__trip-info  trip-info">
   <div class="trip-info__main">
     <h1 class="trip-info__title">${title.slice(0, 3).join(` — `)}</h1>
     <p class="trip-info__dates">${
       isDate.toString().slice(4, 8) + isDate.toString().slice(8, 10)
     } — ${+isDate.toString().slice(8, 10) + 2}</p>
   </div>
   <p class="trip-info__cost">
     Total: €&nbsp;<span class="trip-info__cost-value">${totalAmount}</span>
   </p>
  </section>
`;

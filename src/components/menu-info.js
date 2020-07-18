export const createMenuInfo = (totalAmount, { title, isDate }) => {
  totalAmount = totalAmount
    .map((day) =>
      day.reduce((total, eventPrice) => total + eventPrice.price, 0)
    )
    .reduce((total, price) => total + price, 0);

  // [[{price: 123}, {}], [{}, {}], [{}, {}]] ==> 123

  return `
<section class="trip-main__trip-info  trip-info">
   <div class="trip-info__main">
     <h1 class="trip-info__title">${title.slice(0, 3).join(` — `)}</h1>
     <p class="trip-info__dates">${
       isDate.toString().split(` `)[1] + ` ` + isDate.toString().split(` `)[2]
     } — ${+isDate.toString().split(` `)[2] + 2}</p>
   </div>
   <p class="trip-info__cost">
     Total: €&nbsp;<span class="trip-info__cost-value">${totalAmount}</span>
   </p>
  </section>
`;
};

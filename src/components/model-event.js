import { getDate, setDate } from "./utils";

export class ModelEvent {
  constructor(data) {
    this.id = data[`id`];
    this.typeEventTransfer = data[`type`];
    this.isDateStart = getDate(new Date(data[`date_from`]));
    this.isDateEnd = getDate(new Date(data[`date_to`]));
    this.description = data[`destination`][`description`];
    this.city = data[`destination`][`name`];
    this.photos = data[`destination`][`pictures`];
    this.price = data[`base_price`];
    this.isFavorite = data[`is_favorite`];
    this.eventOffer = data[`offers`];
    this.destination = data[`destination`];
  }

  static parseEvent(data) {
    return new ModelEvent(data);
  }

  static parseEvents(data) {
    return data.map((event) => ModelEvent.parseEvent(event));
  }

  // prettier-ignore
  toRAW() {
    return {
      'id': this.id,
      'type': this.typeEventTransfer,
      'date_from': setDate(this.isDateStart),
      'date_to': setDate(this.isDateEnd),
      'base_price': +this.price,
      'is_favorite': this.isFavorite,
      'offers': this.eventOffer,
      'destination': {
        'name': this.city,
        'description': this.description,
        'pictures': this.photos
      }
    };
  }
}

// {
//   "id": "0",
//   "type": "flight",
//   "date_from": 1605208461585,
//   "date_to": 1605222717624,
//   "destination": {
//       "name": "Munich",
//       "description": "Munich, a true asian pearl, with crowded streets, in a middle of Europe, for those who value comfort and coziness.",
//       "pictures": [
//           {
//               "src": "http://picsum.photos/300/200?r=0.6544620116246753",
//               "description": "Munich biggest supermarket"
//           },
//           {
//               "src": "http://picsum.photos/300/200?r=0.4578805839690241",
//               "description": "Munich central station"
//           },
//           {
//               "src": "http://picsum.photos/300/200?r=0.329551455807531",
//               "description": "Munich street market"
//           },
//           {
//               "src": "http://picsum.photos/300/200?r=0.16397844011300733",
//               "description": "Munich park"
//           },
//           {
//               "src": "http://picsum.photos/300/200?r=0.1082997683956528",
//               "description": "Munich parliament building"
//           },
//           {
//               "src": "http://picsum.photos/300/200?r=0.6015809459847103",
//               "description": "Munich city centre"
//           },
//           {
//               "src": "http://picsum.photos/300/200?r=0.6225433254611605",
//               "description": "Munich street market"
//           },
//           {
//               "src": "http://picsum.photos/300/200?r=0.44912396693463896",
//               "description": "Munich city centre"
//           },
//           {
//               "src": "http://picsum.photos/300/200?r=0.8057526310760681",
//               "description": "Munich embankment"
//           }
//       ]
//   },
//   "base_price": 600,
//   "is_favorite": true,
//   "offers": [
//       {
//           "title": "Choose seats",
//           "price": 100,
//           "accepted": true
//       },
//       {
//           "title": "Upgrade to comfort class",
//           "price": 110,
//           "accepted": true
//       }
//   ]
// }

// {
//   "name": "Chamonix",
//   "description": "Chamonix, .",
//   "pictures": [
//       {
//           "src": "http://picsum.photos/300/200?r=0.11318082764617832",
//           "description": "Chamonix central station"
//       },
//       {
//           "src": "http://picsum.photos/300/200?r=0.5453760479557135",
//           "description": "Chamonix central station"
//       },
//       {
//           "src": "http://picsum.photos/300/200?r=0.9583464013497109",
//           "description": "Chamonix parliament building"
//       },
//       {
//           "src": "http://picsum.photos/300/200?r=0.32877316049055305",
//           "description": "Chamonix zoo"
//       }
//   ]
// }

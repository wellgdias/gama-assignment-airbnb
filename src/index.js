const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const placesElement = document.querySelector("#places");
let places = [];

let formatCurrency = new Intl.NumberFormat([], {
  style: "currency",
  currency: "BRL",
});

async function getPlaces() {
  return await fetch(url).then(async (data) => await data.json());
}

function renderPlaces(places) {
  placesElement.innerHTML = "";
  places.map(renderPlace);
}

function renderPlace(place) {
  const article = document.createElement("article");
  article.className = "place__details";
  article.innerHTML = `
    <div class="place__image">
        <img src="${place.photo}" alt="${place.name}" class="place__photo">
    </div>
    <div class="place__info">
        <p class="place__type">${place.property_type}</p>
        <h3 class="place__name">${place.name} </h3>
        <p class="place__price">${formatCurrency.format(place.price)}/noite</p>
        <p class="place__total-price">Total de ${formatCurrency.format(place.price)}</p>
    </div>
    `;
  placesElement.appendChild(article);
}

async function main() {
  places = await getPlaces();
  console.log(places);
  renderPlaces(places);
}

main();

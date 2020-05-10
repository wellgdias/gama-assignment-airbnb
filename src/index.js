const url = "https://api.jsonbin.io/b/5eb8061d47a2266b14760d60";
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
  // mudar tamanho da imagem do json

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

async function sortPlaces(sortBy) {
  places = await getPlaces();
  places.sort(compareValues(sortBy));
  console.log(places);
  renderPlaces(places);
}

function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

async function filterPlaces(filterBy) {
  places = await getPlaces();

  const placesfiltered = places.filter((place) => place[filterBy]); 
  
  console.log(placesfiltered);
  renderPlaces(placesfiltered);
}

async function main() {
  places = await getPlaces();
  console.log(places);
  renderPlaces(places);
}

main();

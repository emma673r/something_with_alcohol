import { url, headers } from "./config.js";

const f = document.querySelector("form");

console.log(f.elements.bitter.value);
console.log(f.elements);

// f.addEventListener("submit", (e) => {
//   e.preventDefault();
// });



async function getCocktails() {
  const options = {
    method: "GET",
    headers: headers,
  };

  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

function addCocktail(newCocktail) {
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newCocktail),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      //   showData();
      console.log(data);
    });
}
function updateCocktail() {}
function deleteCocktail(id) {
  const options = {
    method: "DELETE",
    headers: headers,
  };
  console.log(id);

  fetch(url + "?id=eq." + id, options)
    .then((response) => response.json())
    .then((response) => {
      //   showData();
      console.log(data);
    })
    .catch((err) => console.error(err));
}

async function init() {
  const button = document.getElementById("submit");
  button.addEventListener("click", addCocktail);
  //   showData();
}

// async function showData() {
//   const data = await getCocktails();
//   console.log(data);
//   document.querySelector("main").innerHTML = "";
//   data.forEach((item) => {
//     const template = document.querySelector("template").content;
//     const copy = template.cloneNode(true);
//     copy.querySelector("h2").textContent = item.name;
//     copy.querySelector(".seasons").textContent = item.seasons;
//     copy.querySelector(".director").textContent = item.director;
//     const button = copy.querySelector("button");
//     button.addEventListener("click", () => {
//       deleteCocktail(item.id);
//     });
//     document.querySelector("main").appendChild(copy);
//   });
// }

f.addEventListener("submit", (e) => {
  e.preventDefault();

  const cocktail = {
    cocktailName: f.elements.cocktailName.value,
    color: f.elements.color.value,
    glassType: f.elements.glassType.value,
    liquor: f.elements.liquor.value,
    ingredient: f.elements.ingredient.value,
    bitterness: f.elements.bitterness.value,
    method: f.elements.method.value.split("\n"),
    price: f.elements.price.value,
  };
  addCocktail(cocktail);
});

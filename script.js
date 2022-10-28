import { url, headers } from "./config.js";

const f = document.querySelector("form");

// console.log(f.elements.liquor);
// console.log(f.elements);

f.addEventListener("submit", (e) => {
  e.preventDefault();
});

let liquorList = [];
let ingredientList = [];

let extraLiquor = f.elements.liquor[5].value.split("\n");

let extraIngredient = f.elements.ingredient[8].value.split("\n");

if (extraLiquor !== "") {
  for (let i = 0; i < extraLiquor.length; i++) {
    liquorList.push(extraLiquor[i]);
    console.log(`extra liquors are `, extraLiquor[i]);
  }
}

if (extraIngredient !== "") {
  for (let i = 0; i < extraIngredient.length; i++) {
    ingredientList.push(extraIngredient[i]);
    console.log(`extra ingredients are `, extraIngredient[i]);
  }
}

f.elements.liquor.forEach((liquor) => {
  if (liquor.checked) {
    liquorList.push(liquor.value);
  }
});

f.elements.ingredient.forEach((ingredient) => {
  if (ingredient.checked) {
    ingredientList.push(ingredient.value);
  }
});

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

f.addEventListener("submit", (e) => {
  e.preventDefault();

  const cocktail = {
    cocktailName: f.elements.cocktailName.value,
    color: f.elements.color.value,
    glassType: f.elements.glassType.value,
    liquor: liquorList,
    ingredient: ingredientList,
    bitterness: f.elements.bitterness.value,
    method: f.elements.method.value.split("\n"),
    price: f.elements.price.value,
  };
  addCocktail(cocktail);
});

console.log(`liquorlist is `, liquorList);
console.log(`ingredientlist is `, ingredientList);

// todo show data on site

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

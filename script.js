const pokeContainer = document.querySelector(".pokeContainer");
const pokeCount = 600;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

async function fetchPokemons() {
  for (i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
}

async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  createPokeCard(data);
}

async function createPromisse(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
}

function resolveAllPromisses() {
  let promisses = [];

  /* Cria um vetor de varias promisses que são as 
    as requisições fetch a api dos pokemons */
  for (i = 1; i <= pokeCount; i++) {
    promisses.push(createPromisse(i));
  }

  /* Quando todas as promisses forem resolvidas, 
    o código em then eh executado */
  Promise.all(promisses)
    .then((valores) => {
      //console.log(valores);
      for (i = 1; i <= pokeCount; i++) {
        createPokeCard(valores[i]);
      }
    })
    .catch((erro) => {
      console.log(erro.message);
    });
}

function createPokeCard(poke) {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  let name = poke.name;
  let id = poke.id;
  let type = poke.types[0].type.name;
  let color = colors[type];

  card.style.backgroundColor = color;

  // console.log(name, id, type);
  const cardInnerHTML = `
      <div class="imageContainer">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
          alt=""
        />
      </div>
      <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
      </div>
    `;

  card.innerHTML = cardInnerHTML;
  pokeContainer.appendChild(card);
}

fetchPokemons();
// resolveAllPromisses();

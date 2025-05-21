//URL de la pokéAPI
const urlBase = 'https://pokeapi.co/api/v2/pokemon';

//manipular el DOM
const container = document.getElementById("conteinerPokemon");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

//Control de paginación
let startPage = 0;
const endPage = 20;

//Función asincrona para la petición a la Pokeapi y devuelva los personajes
//Uso de async/await y fetch

async function getPokemons(offset) {
    try {
        //solicitar los primeros 20 pokemons
        const response = await fetch(`${urlBase}?limit=${endPage}&offset=${offset}`);
        if (!response.ok){
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        //extraerDatos
        const data = await response.json();
        renderPokemons(data.results);
        
        
    } catch (error) {
        container.innerHTML = `<p> ❌ Error al obtener los pokemones: ${error.message}</p>`
    }
}

async function renderPokemons(pokemon) {
    //limpiar contenedor
    container.innerHTML = "";


    for(const element of pokemon){
        try {
            const urlPokemon = await fetch(element.url);
            if (!urlPokemon.ok) {
                throw new Error(`Error al obtener detalles de ${element.name}`);
            } 
            const card = document.createElement("div");
            card.className = "card";
            const specificData = await urlPokemon.json();
            // renderPokemons(specificData);
            // console.log(specificData);
            
            card.innerHTML = `
                <h3>${specificData.name}</h3>
                <img class = "poke-image" src = "${specificData.sprites.front_default}" alt="${specificData.name}">
                <p>Tipo: ${specificData.types.map(t => t.type.name).join(", ")}</p>
            `;

            container.appendChild(card);

        } catch (error) {
            container.innerHTML = `<p>❌ Error al obtener datos del pokemon ${element.name}: ${error.message} </p>`;
        }
    }
}


getPokemons(startPage);
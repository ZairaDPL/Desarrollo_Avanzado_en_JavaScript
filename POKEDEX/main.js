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
        console.log(data);
        
    } catch (error) {
        container.innerHTML = `<p> ❌ Error al obtener los pokemones: ${error.message}</p>`
    }
}

getPokemons(startPage);

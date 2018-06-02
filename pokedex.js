const https = require('https')

const {remote} = require('electron')

let searchBox = document.getElementById("input")
let searchBtn = document.getElementById("searchBtn")
let pokeImg = document.getElementById("pokeImg")
let pokeName = document.getElementById("pokeName")
let flavorText = document.getElementById("flavorText")

let exitButton = document.getElementById("exitButton")
let minimizeButton = document.getElementById("minimizeButton")
let maximizeButton = document.getElementById("maximizeButton")

function lookUp (resource, callback) {
    https.get(`https://pokeapi.co/api/v2/${resource}/`, (response) => {
        response.setEncoding("utf8")
        let data = ""
        response.on('data', (chunk) => {
            data += chunk
        })
        response.on('end', () => {
            callback(JSON.parse(data))
        })
    })
}

function lookUpPokemonSpecies(id, callback) {
    lookUp(`pokemon-species/${id}`, callback)
}

function lookUpPokemon(id, callback) {
    lookUp(`pokemon/${id}`, callback)
}

searchBtn.addEventListener('click', event => {
    let name = searchBox.value.trim().toLowerCase()
    
    lookUpPokemon(name, pokemon => {
        pokeImg.src = pokemon.sprites.front_default
    })

    lookUpPokemonSpecies(name, pokemon => {
        pokeName.textContent = pokemon.names.find(name => name.language.name == "en").name
        flavorText.textContent = pokemon.flavor_text_entries.find(entry => entry.version.name == "alpha-sapphire" && entry.language.name == "en").flavor_text
    })

})

exitButton.addEventListener('click', event => {
    remote.getCurrentWindow().close()
})

minimizeButton.addEventListener('click', event => {
    remote.getCurrentWindow().minimize()
})

maximizeButton.addEventListener('click', event => {
    remote.getCurrentWindow().maximize()
})
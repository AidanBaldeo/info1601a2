async function loadListing(){
    const response = await fetch('https://pokedextr.uwista.dev/pokemon');
    const data = await response.json();
    displayListing(data);
}

function displayListing(pokemon){
    const listing = document.getElementById('listing');
    listing.innerHTML = '';

    for (let p of pokemon){
        listing.innerHTML += `<a href="#${p.name}" id="${p.name}" onclick="getPokemon(${p.id})" class="collection-item">${p.name}</a>`;
    }
}

async function getPokemon(id){
   const response = await fetch(`https://pokedextr.uwista.dev/pokemon/${id}`);
   const data = await response.json();
   displayPokemon(data);

}

function displayPokemon(pokemon){
    const results = document.getElementById('result');
    results.innerHTML = `
        <div class="card">
                <div class="card-image">
                    <img class="teal" src="${pokemon.image}" alt="${pokemon.name} Image">  
                </div>
                <div class="card-content">
                    <span class="card-title"><p>${pokemon.name} #${pokemon.id}</p></span>
                    <p> Type1: ${pokemon.type1}</p>
                    <p> Weight: ${pokemon.weight}</p>
                    <p> Height: ${pokemon.height}</p>
                    <a onclick="catchPokemon(${pokemon.id})" id="catchBtn" style="position:absolute; right:15px; bottom:80px" class="btn-floating btn-large waves-effect waves-light red">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);font-size:40px; margin-top:8px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="iconify" data-icon="mdi-pokeball" data-inline="false"><path fill="currentColor" d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2c-4.08 0-7.45 3.05-7.94 7h4.07c.44-1.73 2.01-3 3.87-3c1.86 0 3.43 1.27 3.87 3h4.07c-.49-3.95-3.86-7-7.94-7m0 16c4.08 0 7.45-3.05 7.94-7h-4.07c-.44 1.73-2.01 3-3.87 3c-1.86 0-3.43-1.27-3.87-3H4.06c.49 3.95 3.86 7 7.94 7m0-10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2Z"></path></svg>
                    </a>
                </div>
            </div>
        `;
}

// Bonus Functions

async function catchPokemon(pokemon_id){
    const user_id = getId();//gets the userid from the text field or prompts the user
    const name = prompt('Please enter a name')//prompts the user to enter a name

    await fetch(`https://pokedextr.uwista.dev/mypokemon/${user_id}`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({pokemon_id, name})
    });

    getMyPokemon();
}

async function getMyPokemon(){
    //makes a request to the get captured pokemon API url
    //get the data from the request and sends it to displayMyPokemon()
    const user_id = getId();

    const response = await fetch(`https://pokedextr.uwista.dev/mypokemon/${user_id}`);
    const data = await response.json();
    displayMyPokemon(data);
}

function displayMyPokemon(mypokemon){
    const listing = document.getElementById('myPokeListing');
    listing.innerHTML = '';

    for (let p of mypokemon){
        listing.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.species}</td>
                <td>
                    <button onclick="releasePokemon(${p.user_pokemon_id})">Release</button>
                </td>
            </tr>
        `;
    }
}

async function releasePokemon(user_pokemon_id){
    const user_id = getId();//gets the userid from the text field or prompts the user
    //makes a request to the release pokemon API url then call getMyPokemon() to reload the table
    await fetch(`https://pokedextr.uwista.dev/mypokemon/${user_id}/${user_pokemon_id}`, {
        method: 'DELETE',
    });
    getMyPokemon();
}

loadListing();
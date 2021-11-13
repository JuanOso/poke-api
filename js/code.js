localStorage.clear()
let lugar_pokemones = document.getElementById('contenedor_pokemones')
let botones = document.getElementById('paginacion')
let bodys = document.getElementById('body')



function ejecutador (url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=24') {
    
    let urlApi = url
    let api = fetch(urlApi)
api.then(so => so.json())
    .then(data_pokemones => {
        console.log(data_pokemones.results)

        for (const pokemon of data_pokemones.results) {

            let urlApi2 = pokemon.url
            let api2 = fetch(urlApi2)
            let name_poke = pokemon.name
            /* console.log(urlApi2) */
            
           /*  console.log(image_poke) */

                api2.then(sow => sow.json())
                .then(each_pokemon => {
                    let image_poke = each_pokemon.sprites.other.dream_world.front_default
                    /* console.log(urlApi2) */

                    lugar_pokemones.innerHTML += `
                    <div class="pokemon-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="pokepoke('${urlApi2}')">
                        <img class="pokemon-item__img" src="${image_poke}" alt="pokemon">
                         <div class="pokemon-item__details">
                            <div>
                            <!-- <img src="https://img.icons8.com/flat_round/64/000000/play--v1.png"/>
                                <img src="https://img.icons8.com/flat_round/64/000000/plus.png"/>-->
                            </div> 
                            <p class="pokemon-item__details--title">${name_poke}</p>
                            <p class="pokemon-item__details--subtitle">${'Altura: ' + each_pokemon.height}</p>
                            <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Launch demo modal
                            </button> -->
                         </div>   
                    </div>
                        `
                  
                }).catch(error => console.log(error + 'Este pertenece al segundo consumo'))
        }

        let disableP = ''       
        let disableN = ''
      
        if (data_pokemones.previous == null)  {
            disableP = `disabled`
        } else if (data_pokemones.next == null) {
            disableN = `disabled`
        }
        botones.innerHTML = `
        <button class="btn btn-light" ${disableP} type="button" onclick="llamadaPaginaPrevia()">Pagina Previa</button>
        <button class="btn btn-light" ${disableN} type="button" onclick="llamadaPaginaSiguiente()">Pagina Siguiente</button>
        `
        localStorage.setItem("pagina_previous", data_pokemones.previous)
        localStorage.setItem("pagina_next", data_pokemones.next)

    }).catch(error => console.log(error))
}

ejecutador()

function llamadaPaginaSiguiente () {
    ejecutador(localStorage.getItem('pagina_next'))
    lugar_pokemones.innerHTML = ''
}

function llamadaPaginaPrevia () {
    ejecutador(localStorage.getItem('pagina_previous'))
    lugar_pokemones.innerHTML = ''
}

let tituloModal = document.getElementById('exampleModalLabel')
let contenidoModal = document.getElementById('contenido_modal')

function pokepoke (identificador) {
    let urlApi = identificador
    let api = fetch(urlApi)
    contenidoModal.innerHTML =  ''

    api.then(so => so.json())
        .then(info_pokemon => {
            console.log(info_pokemon.sprites.versions['generation-v'])
            for (const iter of info_pokemon.abilities) {
                    contenidoModal.innerHTML += `
                    <p class="text-light">${iter.ability.name}</p>
                    `
            
            }

             /* tituloModal.innerHTML =  */   
    }).catch(error => console.log(error + 'Este pertenece al consumo de pokepoke'))
}

console.log('ejecutado por node')

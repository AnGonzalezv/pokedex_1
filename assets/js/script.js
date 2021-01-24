window.onload = pkmRandom();
document.querySelector("#boton").addEventListener("click", function(){
    traerDatos();
});

function traerDatos(){
    //toma el dato ingresado para entregarselo a API
    let nombrePkm = document.getElementById("nombrePokemon").value;

     //si se ingresa en mayus, se pasa a minus para validacion de API
     if (nombrePkm === nombrePkm.toUpperCase()){
        nombrePkm = nombrePkm.toLowerCase()
    }
    //consultar API con pokemon ingresado anteriormente
    var request = $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${nombrePkm}`,
        method: "GET"
    });

    request.done(function( data ) {
        const POKEMON = {
            nombre: data.name,
            id: data.id,
            tipo: data.types[0].type.name,
            imagen: data.sprites.other.dream_world.front_default,
            altura: (data.height)/10,
            peso: (data.weight)/10,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            ataqueEspecial: data.stats[3].base_stat,
            defensaEspecial: data.stats[4].base_stat,
            velocidad: data.stats[5].base_stat,
        }
        imprimirPokemon(POKEMON);
        grafico(POKEMON);
    });
    request.fail(function( error ) {
        console.log( 'Error: ' , error );
    });
}

//pokemon aleatorio al cargar pagina
function pkmRandom(){
    pokeNumero= Math.floor(Math.random() * (810 - 1)) + 1;
    var request = $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${pokeNumero}`,
        method: "GET"
    });
    request.done(function( data ) {
        //guardar la informacion en un objeto con los datos que utilizaremos
        const POKEMON = {
            nombre: data.name,
            id: data.id,
            tipo: data.types[0].type.name,
            imagen: data.sprites.other.dream_world.front_default,
            altura: (data.height)/10,
            peso: (data.weight)/10,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            ataqueEspecial: data.stats[3].base_stat,
            defensaEspecial: data.stats[4].base_stat,
            velocidad: data.stats[5].base_stat,
        }
        imprimirPokemon(POKEMON);
        grafico(POKEMON);

    });
    request.fail(function( error ) {
        console.log( 'Error: ' , error ); 
    });
}

function imprimirPokemon(pokemon){
    var imprimirNombre = document.getElementById("nombreDePokemon");
    var imprimirImagen = document.getElementById("imagenPokemon");
    var imprimirNumero = document.getElementById("numeroPokedex");
    var imprimirTipo = document.getElementById("tipo");
    var imprimirAltura = document.getElementById("altura");
    var imprimirPeso = document.getElementById("peso");
    imprimirNombre.innerHTML = `${pokemon.nombre.toUpperCase()}`;
    imprimirImagen.src = `${pokemon.imagen}`;
    imprimirNumero.innerHTML = `${pokemon.id}`;
    imprimirTipo.innerHTML = `${pokemon.tipo}`;
    imprimirAltura.innerHTML = `${pokemon.altura} m.`;
    imprimirPeso.innerHTML = `${pokemon.peso} Kg.`;
}
 function grafico(pokemon) {

    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light2", "dark1", "dark2"
        animationEnabled: true, 	
        title:{
            text: "Estadísticas"
        },
        data: [
        {
            color: "#21209c",
            type: "column",
            legendText: "Puntos",
            dataPoints: [
                { label: "HP",  y: pokemon.hp  },
                { label: "Ataque", y: pokemon.ataque },
                { label: "Defensa", y: pokemon.defensa },
                { label: "Ataque Especial",  y: pokemon.ataqueEspecial },
                { label: "Defensa Especial",  y: pokemon.defensaEspecial }
            ]
        }
        ]
    });
    chart.render();
}


document.querySelector("#boton").addEventListener("click", function(){
    traerDatos();
});


function traerDatos(){
    console.log("dentro de la función");

    let valor = (document.getElementById("busqueda").value).toLowerCase();

     url=`https://pokeapi.co/api/v2/pokemon/${valor}`;


    const api = new XMLHttpRequest();

    api.open("GET", url, true);

    api.send();

     api.onreadystatechange = function(){
       if(this.readyState == 4 && this.status == 200){
            var datos = JSON.parse(this.responseText);

            //  var habilidades = [];
            //  for (ind of datos.abilities){
            //      habilidades.push(ind.ability.name);
            //  }

            //  var potencia = [];
            //  for (ind of datos.held_items){
            //      potencia.push(ind.item.name);
            //  }
           
            //  var movimientos = [];        
            // for (ind of datos.moves){
            //     movimientos.push(ind.move.name);
            // } 
             
             var imagen = datos.sprites.front_shiny
            //  console.log(imagen);
            
            let respImagen = document.querySelector("#respImagen");
            respImagen.innerHTML = "";
            respImagen.innerHTML += `<img src="${imagen}">`

            let respHab = document.querySelector("#respHab");
            respHab.innerHTML="";
            for (ind of datos.abilities){
                respHab.innerHTML += `
                    <tr>
                    <td>${ind.ability.name}</td>
                    </tr>
                `
            }

            let respPod = document.querySelector("#respPod");
            respPod.innerHTML="";
            for (ind of datos.held_items){
                respPod.innerHTML += `
                <tr>
                <td>${ind.item.name}</td>
                </tr>
            `
            }

            let respMov = document.querySelector("#respMov");
            respMov.innerHTML = "";
            for (ind of datos.moves){
                respMov.innerHTML += `
                    <tr>
                    <td>${ind.move.name}</td>
                    </tr>
                    `
            }
        }
      }
 }
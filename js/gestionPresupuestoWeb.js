"use strict"

import * as GesPresu from "./gestionPresupuesto.js";
//Botones
document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);

function mostrarDatoEnId(idElemento,valor){
    let datId = document.getElementById(idElemento);
    datId.innerHTML = `<p>${valor}</p>`
    
}
    function mostrarGastoWeb(idElemento,gastos){

        gastos.forEach((gasto) =>{
            let element = document.getElementById(idElemento);
            let elGasto = document.createElement("div");
            elGasto.className = "gasto";
            element.append(elGasto);
    
            elGasto.innerHTML +=`
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
            <div class="gasto-valor">${gasto.valor}</div>
             `
    
           let etiGasto = document.createElement("div")
           etiGasto.className = "gasto-etiquetas";
           elGasto.append(etiGasto);
    
           for(let etiqueta of gasto.etiquetas){
               let newEtiqueta = new BorrarEtiquetasHandle();
               newEtiqueta.gasto = gasto;
    
               let gastEtiqueta = document.createElement("span");
               gastEtiqueta.className = "gasto-etiquetas-etiqueta";
               gastEtiqueta.textContent = etiqueta + " ";
               newEtiqueta.etiqueta = etiqueta;
               etiGasto.append(gastEtiqueta);
               gastEtiqueta.addEventListener("click",newEtiqueta);
           }

           //Para que solo ponga el boton el listado de gastos
           if (idElemento === "listado-gastos-completo") {
            let btnEdit = document.createElement("button");
            btnEdit.className += 'gasto-editar'
            btnEdit.textContent = "Editar";
            btnEdit.type = 'button';
            
            let btnBorrar = document.createElement("button");
            btnBorrar.className += 'gasto-borrar'
            btnBorrar.textContent = "Borrar";
            btnBorrar.type = 'button';

            //Sepracion de gastos, me la ha enseñado un compañero

            let divSeparador = document.createElement('div');
            divSeparador.className = 'salto';
            divSeparador.textContent = "----------------------------------"
            
    
            let editar = new EditarHandle();
            let borrar = new BorrarHandle();
    
            editar.gasto = gasto;
            borrar.gasto = gasto;
    
            btnEdit.addEventListener('click',editar);
            btnBorrar.addEventListener('click',borrar);
            
            
            elGasto.append(btnEdit);
            elGasto.append(btnBorrar);
            elGasto.append(divSeparador);
           }
        
        })

       
    }
        //Funcion antigua q no funciona :(

        /*
    
        gastos.forEach((gasto) => {
            let etiquetas = "";

            let listDeEtiqueta = [];
            let etiquetaLista = [];

            gasto.etiquetas.forEach((etiqueta) => {
                etiquetas += 
                    `<span class="gasto-etiquetas-etiqueta" id="${gasto.id}-${etiqueta}">
                        ${etiqueta}
                    </span>`;

                        //Hace el push de las etiquetas
                    listDeEtiqueta.push(`${gasto.id}-${etiqueta}`);
                    etiquetaLista.push(`${etiqueta}`);

            });    
            


            element.innerHTML +=
                `<div class="gasto">
                    <div class="gasto-descripcion">${gasto.descripcion}</div>
                    <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
                    <div class="gasto-valor">${gasto.valor}</div> 
                    <div class="gasto-etiquetas">
                        ${etiquetas}
                    </div>
              
                <!--Creamos boton-->
                <button type="button" class="gasto-editar" id="editar-${gasto.id}">Editar</button>
                <button type="button" class="gasto-borrar" id="borrar-${gasto.id}">Eliminar</button>`;

                let objetoDel = new BorrarHandle()

                objetoDel.gasto = gasto;
                document.getElementById(`borrar-${gasto.id}`).addEventListener("click",objetoDel);//boton que borra

                let objetoEdit = new EditarHandle()

                objetoEdit.gasto = gasto;
                document.getElementById(`editar-${gasto.id}`).addEventListener("click",objetoEdit);//boton que edita

                    
                listDeEtiqueta.forEach((tags, search) => {
                    let etiHandle = new BorrarEtiquetasHandle();
                    etiHandle.gasto = gasto;                                                     //Evento que borra etiquetas
                    etiHandle.etiqueta = etiquetaLista[search];
                    document.getElementById(tags).addEventListener('click', etiHandle);
                });
        });*/
    
        function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
            let elemento = document.getElementById(idElemento);

            //bucle tocho
          let gastos ="";
            for(let prop in agrup){
                gastos +=
                "<div class='agrupacion-dato'>" +
                "<span class='agrupacion-dato-clave'>" + prop + ": </span>" +
                "<span class='agrupacion-dato-valor'>" + agrup[prop] + "</span>"+
                "</div>";
            }

            elemento.innerHTML += 
            `<div class='agrupacion'> 
            <h1>Gastos agrupados por ${periodo} </h1>
            ${gastos}`;
        }


        //Funcion repintar para actualizar la pagina
            function repintar(){
                mostrarDatoEnId("presupuesto",GesPresu.mostrarPresupuesto());
                mostrarDatoEnId("gastos-totales",GesPresu.calcularTotalGastos());
                mostrarDatoEnId("balance-total",GesPresu.calcularBalance());

                document.getElementById("listado-gastos-completo").innerHTML = " ";      //Bora el contenido sustituyendolo por un string ("")

                mostrarGastoWeb("listado-gastos-completo",GesPresu.listarGastos());
            }

            
        //Funcion que actualiza el presupuesto WEB
        function actualizarPresupuestoWeb(){
            GesPresu.actualizarPresupuesto(parseFloat(prompt("Introduce un presupuesto:")));

            repintar();
        }

        //Funcion nuevo gasto WEB

        function nuevoGastoWeb(){
            //datos del gasto
            let descripcion = prompt("Introduce la descripcion del gasto:");
            let valor = parseFloat(prompt("Introduce el valor del gasto:"));
            let fecha = Date.parse(prompt("Introduce la fecha del gasto:"));
            let etiquetas = prompt("Introduce las etiquetas:").split(',');

                //Creamos y añadimos el gasto
            GesPresu.anyadirGasto(new GesPresu.CrearGasto(descripcion,valor,fecha,etiquetas))

            //Actualizamos los datos
            repintar();
        }
        
        //Funcion editar Handle
        function EditarHandle(){
                this.handleEvent = function(ev){

                    this.gasto.actualizarDescripcion(prompt("Introduce la nueva descripcion"));

                    this.gasto.actualizarValor(parseFloat(prompt("Introduce el nuevo valor")));

                    this.gasto.actualizarFecha(Date.parse(prompt("Introduce la nueva fecha")));
                    
                    let etiqueta = prompt("Introduce las nuevas etiquetas:");

                    if(typeof etiqueta != "undefined"){
                        this.gasto.anyadirEtiquetas(etiqueta.split(','))
                    }
                   repintar();
                } 
        }

        // Borrar Handle

        function BorrarHandle(){
            this.handleEvent = function(ev){
                    GesPresu.borrarGasto(this.gasto.id);

                    repintar();
            }
        }


        //Borrar etiquetas del handle

        function BorrarEtiquetasHandle(){
            this.handleEvent = function(ev){
                this.gasto.borrarEtiquetas(this.etiqueta)

                repintar();
            }
        }

//El export de las funciones
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}
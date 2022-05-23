//Campo Formulario Modelos Automoviles
miformulario1 = document.querySelector('#form-modelo');
window.addEventListener("load", function() {
    cargarModelos();
    }, false);

//Funcion que carga el array de modelos de automoviles
function cargarModelos(){
    let modelos = selectModelos.map(function(model){
        return model.Nombre;
    });
    modelos.sort();
    addOptions("modelo", modelos);
        
}

//Funcion para agregar opciones a un <select>.
function addOptions(domElement, array) {
    let selector = document.getElementsByName(domElement)[0];
    //Recorremos el array.
    for (modelo in array) {
        let opcion = document.createElement("option");
        opcion.text = array[modelo];
        selector.add(opcion);
    }
}
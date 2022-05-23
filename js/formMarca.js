//Campo Formulario Marca Automoviles
miformulario = document.querySelector('#form-marca');
window.addEventListener("load", function() {
    cargarMarcas();
    }, false);

//Funcion que carga el array de marcas automovil
function cargarMarcas(){
    let marcas = selectMarcas.map(function(marc){
        return marc.Nombre;
    });
    marcas.sort();
    addOptions("marca", marcas);
    // console.log(marcas)
    
}

//Funcion para agregar opciones a un <select>.
function addOptions(domElement, array) {
    let selector = document.getElementsByName(domElement)[0];
    //Recorremos el array.
    for (marca in array) {
        let opcion = document.createElement("option");
        opcion.text = array[marca];
        selector.add(opcion);
    }
}







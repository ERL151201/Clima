const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () =>{
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e){
    e.preventDefault();

    

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        //Hubo un error 
        mostrarError('Ambos campos son obligatorios');
        return;
    }
    ;

    //Consultar la API 
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje){

    //Crear una alerta 
    const alerta = document.querySelector('.bg-red-100');
    if(!alerta){
       const alerta = document.createElement('div'); 
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
    'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>   
    `;

    container.appendChild(alerta);

    //Se elimina la alerta despues de 5 segundos 
    setTimeout(() => {
        alerta.remove();
    }, 5000);
    }

    
}

function consultarAPI(ciudad,pais){
    const appId = '5b58ab22861633ddae6dd1eb63d8c7db';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId} `;

    console.log(url);
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada')
                return;
            }
        })
}

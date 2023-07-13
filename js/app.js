// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// variables para campos

const para = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Evento
eventListeners();
function eventListeners() {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)

    // Campos del formulario
    para.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    // Reinicia el formulario

    btnReset.addEventListener('click', resetearFormulario)

    // Enviar email

    formulario.addEventListener('submit', enviarEmail)
}


// Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

// Valida el formulario
function validarFormulario() {
    console.log('validando...')
}

function validarFormulario(e) {
    if(e.target.value.length > 0) {

        // Elimina los errores...
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {

        if(er.test( e.target.value)) {
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500');
        mostrarError('Email No Valido');
        }
    }



    if(er.test( para.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
 }

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    // Añadir clases
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error')

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

}

// Envia el email
function enviarEmail(e) {
    e.preventDefault();

    // Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    // Despues de 3 segundoss ocultar el spinnet y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none'

        // Mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';

        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner)
        parrafo.classList.add('border', 'border-green-500', 'bg-green-500', 'text-white', 'p-3', 'my-10', 'text-center')

        setTimeout( () => {
            parrafo.remove()
            resetearFormulario();
        }, 5000)

    }, 3000)
}

// Funcion que resetea el formulario

function resetearFormulario() {
    formulario.reset();
    iniciarApp();
    btnReset();
}
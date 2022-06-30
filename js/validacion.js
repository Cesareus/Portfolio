var inputNombre = document.getElementById('nombre');
var inputEmail = document.getElementById('email');
var inputAsunto = document.getElementById('asunto');
var inputMensaje = document.getElementById('mensaje');
var btnEnviar = document.querySelector(".formcontacto__boton");
var faNombre = document.getElementById("faNombre");
var faEmail = document.getElementById("faEmail");
var faAsunto = document.getElementById("faAsunto");
var faMensaje = document.getElementById("faMensaje");
var estado = false;
var respuesta = "";
var txtNombre = "";
var txtAsunto = "";
var txtEmail = "";
var txtMensaje = "";

const validaCampo = (expresion, input, campo, fa) => {
    if(expresion.test(input)){
        campo.classList.remove('error');
        fa.classList.add('fa-check-double');
        estado = true;
    }else{
        campo.classList.add('error');
        estado = false;
    }
    return estado;
}
const expresiones = {
    /* SE CREAN EXPRESIONES REGULARES PARA VALIDAR CADA CAMPO */
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Se aceptan caracteres solo letras, minimo 3 y maximo 40
    email:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/, // Se aceptan letras, numeros, el arroba y el punto.
    asunto: /^[a-zA-ZÀ-ÿ0-9\s]{3,40}$/, // Se aceptan letras y numeros de entre 3 y 40 caracteres
    mensaje: /^[a-zA-ZÀ-ÿ0-9\s]{3,400}$/ // Se aceptan letras y numeros y un mensaje maximo de 400 caracteres
}
function enviarForm(){
    /* Funcion para enviar email */
    var templateParams = {
        to_name: txtAsunto,
        from_name: txtNombre,
        message: txtMensaje,
        reply_to: txtEmail
    };
     
    emailjs.send('default_service', 'portfolio', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           respuesta = "Su mensaje fue enviado exitosamente!!";
           inputNombre.value = "";
           inputAsunto.value = "";
           inputEmail.value = "";
           inputMensaje.value = "";
           faNombre.classList.remove('fa-check-double');
           faEmail.classList.remove('fa-check-double');
           faAsunto.classList.remove('fa-check-double');
           faMensaje.classList.remove('fa-check-double');
           alert(respuesta);           
        }, function(error) {
           console.log('FAILED...', error);
           respuesta = "No hemos podido enviar su mensaje";
           alert(respuesta);
    });    
}

function valida(event){
    event.preventDefault();
    txtNombre = inputNombre.value;
    txtAsunto = inputAsunto.value;
    txtEmail = inputEmail.value;
    txtMensaje = inputMensaje.value;
    validaCampo(expresiones.nombre,txtNombre,inputNombre, faNombre);
    if(estado){
        validaCampo(expresiones.asunto,txtAsunto,inputAsunto, faAsunto);
        if(estado){
            validaCampo(expresiones.email,txtEmail,inputEmail, faEmail);
            if(estado){
                validaCampo(expresiones.mensaje,txtMensaje,inputMensaje, faMensaje);
                if(estado){
                    console.log(txtNombre+txtAsunto+txtEmail+txtMensaje);
                    enviarForm();
                }else{
                    alert("Solo ingresar letras y numeros");
                    inputMensaje.focus();
                }
            }else{
                alert("Ingresar un correo valido");
                inputEmail.focus();
            }
        }else{
            alert("Solo ingresar letras y numeros");
            inputAsunto.focus();
        }
    }else{
        alert("Solo ingresar letras y numeros");
        inputNombre.focus();
    }
}


btnEnviar.addEventListener("click",valida);
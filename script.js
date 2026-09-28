// Banco de conceptos de Scratch (Mismo idMatch significa que son pareja)
const conceptosScratch = [
    { idMatch: 1, termino: "Al hacer clic en 🏁", definicion: "🟡 Bloque de Eventos obligatorio para que tu juego o animación comience a correr." },
    { idMatch: 2, termino: "Por siempre", definicion: "🟠 Bucle de Control que repite las acciones de su interior infinitamente sin detenerse." },
    { idMatch: 3, termino: "Mover (10) pasos", definicion: "🔵 Bloque de Movimiento que desplaza a tu objeto hacia adelante en la pantalla." },
    { idMatch: 4, termino: "Decir (Hola) por 2s", definicion: "🟣 Bloque de Apariencia que hace aparecer una nube de texto tipo cómic sobre tu personaje." },
    { idMatch: 5, termino: "Si (condición) entonces", definicion: "🟠 Bloque de Control condicional que solo ejecuta lo de adentro si pasa algo especial." }
];

let aciertos = 0;
let tarjetaTerminoSeleccionada = null;
let tarjetaDefinicionSeleccionada = null;

function iniciarJuego() {
    aciertos = 0;
    tarjetaTerminoSeleccionada = null;
    tarjetaDefinicionSeleccionada = null;
    document.getElementById("contador-puntos").innerText = aciertos;

    const colTerminos = document.getElementById("columna-terminos");
    const colDefiniciones = document.getElementById("columna-definiciones");

    // Barajar los términos y las definiciones para que cambien de lugar
    const terminosBarajados = [...conceptosScratch].sort(() => Math.random() - 0.5);
    const definicionesBarajados = [...conceptosScratch].sort(() => Math.random() - 0.5);

    colTerminos.innerHTML = "";
    colDefiniciones.innerHTML = "";

    // Crear tarjetas de bloques (Izquierda)
    terminosBarajados.forEach(item => {
        const div = document.createElement("div");
        // Agregamos clases personalizadas dinámicas para pintar el color del bloque original
        div.className = `tarjeta-juego tipo-termino id-${item.idMatch}`;
        div.innerText = item.termino;
        div.setAttribute("data-id", item.idMatch);
        div.onclick = () => clickTermino(div);
        colTerminos.appendChild(div);
    });

    // Crear tarjetas de significados (Derecha)
    definicionesBarajados.forEach(item => {
        const div = document.createElement("div");
        div.className = "tarjeta-juego";
        div.innerText = item.definicion;
        div.setAttribute("data-id", item.idMatch);
        div.onclick = () => clickDefinicion(div);
        colDefiniciones.appendChild(div);
    });
}

function clickTermino(elemento) {
    if (elemento.classList.contains("correcto")) return;

    // Remover la selección de cualquier otro bloque previo
    document.querySelectorAll(".tipo-termino").forEach(t => t.classList.remove("seleccionado"));
    
    elemento.classList.add("seleccionado");
    tarjetaTerminoSeleccionada = elemento;

    comprobarPareja();
}

function clickDefinicion(elemento) {
    if (elemento.classList.contains("correcto")) return;

    // Remover la selección de cualquier otra definición previa
    document.querySelectorAll(".tarjeta-juego:not(.tipo-termino)").forEach(t => t.classList.remove("seleccionado"));
    
    elemento.classList.add("seleccionado");
    tarjetaDefinicionSeleccionada = elemento;

    comprobarPareja();
}

function comprobarPareja() {
    if (tarjetaTerminoSeleccionada !== null && tarjetaDefinicionSeleccionada !== null) {
        const idTermino = tarjetaTerminoSeleccionada.getAttribute("data-id");
        const idDefinicion = tarjetaDefinicionSeleccionada.getAttribute("data-id");

        if (idTermino === idDefinicion) {
            // ¡Match correcto! Se bloquean en verde
            tarjetaTerminoSeleccionada.className = "tarjeta-juego correcto";
            tarjetaDefinicionSeleccionada.className = "tarjeta-juego correcto";
            
            aciertos++;
            document.getElementById("contador-puntos").innerText = aciertos;

            tarjetaTerminoSeleccionada = null;
            tarjetaDefinicionSeleccionada = null;

            if (aciertos === 5) {
                setTimeout(() => {
                    document.getElementById("modal-victoria").style.display = "flex";
                }, 500);
            }
        } else {
            // Error: pierden la selección tras un parpadeo para dar una segunda oportunidad
            const animTermino = tarjetaTerminoSeleccionada;
            const animDefinicion = tarjetaDefinicionSeleccionada;
            
            setTimeout(() => {
                animTermino.classList.remove("seleccionado");
                animDefinicion.classList.remove("seleccionado");
            }, 600);

            tarjetaTerminoSeleccionada = null;
            tarjetaDefinicionSeleccionada = null;
        }
    }
}

function reiniciarJuego() {
    document.getElementById("modal-victoria").style.display = "none";
    iniciarJuego();
}

window.onload = iniciarJuego;

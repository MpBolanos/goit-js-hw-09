const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId;

startBtn.addEventListener('click', startChangingColor);
stopBtn.addEventListener('click', stopChangingColor);

function startChangingColor() {
  startBtn.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopChangingColor() {
  startBtn.disabled = false;
  clearInterval(intervalId);
}

function changeBackgroundColor() {
  const body = document.querySelector('body');
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}



/*
Tarea 1 - Cambio de color
Ejecute esta tarea en los archivos 01-color-switcher.html y 01-color-switcher.js. 

Existen botones «Start» y «Stop» en HTML.

<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>

Escriba un script que, tras pulsar el botón "Start", cambie el color del 
fondo del <body> una vez por segundo usando un estilo inline. 
El color de fondo de <body> cambiará a un valor aleatorio usando 
el estilo inline. Al pulsar la tecla «Stop», el cambio de color 
de fondo debería detenerse.

ATENCIÓN
Tenga en cuenta que el botón «Start» puede ser pulsado un número 
infinito de veces. Asegúrese de que el botón «Start» esté desactivado 
mientras se ejecute el cambio de tema.

Use la función getRandomHexColor para generar un color aleatorio.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}



Añada una biblioteca SimpleLightbox como dependencia del proyecto 
usando npm (el enlace CDN de su último trabajo ya no es necesario).
Use el código JavaScript de su tarea anterior, pero refactorice 
teniendo en cuenta que la biblioteca fue instalada 
a través de npm. (sintaxis de import/export).
Para incluir el código CSS de la biblioteca en el proyecto, 
es necesario añadir otro import más, 
además de la descrita en la documentación.

// Descrito en la documentación
import SimpleLightbox from "simplelightbox";
// Importación adicional de estilos
import "simplelightbox/dist/simple-lightbox.min.css";

EXPLICACIÓN

Este código define una funcionalidad para cambiar el color de fondo 
de la página de forma aleatoria cuando se hace clic en el botón 
"Start" y se detiene cuando se hace clic en el botón "Stop".

1. Se seleccionan los elementos del DOM con los 
atributos [data-start] y [data-stop] utilizando document.querySelector(). 
Estos elementos corresponden a los botones "Start" y "Stop" respectivamente, 
y se almacenan en las variables startBtn y stopBtn.

2. Se declara la variable intervalId para almacenar el ID del 
intervalo que se creará más adelante.

3. Se agrega un event listener al botón 
"Start" (startBtn.addEventListener('click', startChangingColor)) 
que llama a la función startChangingColor() cuando se hace clic en él.

4. Se agrega un event listener al botón 
"Stop" (stopBtn.addEventListener('click', stopChangingColor)) 
que llama a la función stopChangingColor() cuando se hace clic en él.

5. La función startChangingColor() se ejecuta cuando se hace clic 
en el botón "Start". Deshabilita el botón "Start" (startBtn.disabled = true;)
para evitar múltiples clics mientras está activo. Luego, utiliza setInterval() 
para llamar a la función changeBackgroundColor() cada 1000 milisegundos (1 segundo) 
y almacena el ID del intervalo en la variable intervalId.

6. La función stopChangingColor() se ejecuta cuando se hace clic en el botón "Stop". 
Habilita nuevamente el botón "Start" (startBtn.disabled = false;) y utiliza 
clearInterval() para detener la ejecución de la función changeBackgroundColor() 
al eliminar el intervalo identificado por intervalId.

7. La función changeBackgroundColor() selecciona el elemento <body> del DOM 
utilizando document.querySelector('body'). Genera un color hexadecimal aleatorio 
utilizando la función getRandomHexColor() y establece ese color como el color 
de fondo del elemento <body> (body.style.backgroundColor = randomColor;).

8. La función getRandomHexColor() genera un número hexadecimal aleatorio y 
lo convierte en una cadena de 6 caracteres utilizando toString(16) y 
padStart(6, '0'). El número hexadecimal se genera utilizando Math.random() 
y se multiplica por 16777215, que es el número máximo posible para un 
color hexadecimal de 6 dígitos.

*/

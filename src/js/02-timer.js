// Descrito en la documentación
import flatpickr from "flatpickr";
// Importación adicional de estilos
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const date = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');
const spans = document.querySelectorAll('.value');

let timerId = null;

btn.disabled = true;

flatpickr(date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btn.disabled = true;
    } else {
      btn.disabled = false;

      Notiflix.Notify.success('Very good, is a date in the future');
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

/*

Tarea 2 - Cuenta regresiva
Ejecute esta tarea en los archivos 02-timer.html y 02-timer.js. 
Escriba un temporizador de script que cuente hasta una fecha determinada. 
Este temporizador podría usar en blogs y tiendas online, páginas de registro 
de eventos, durante trabajos de mantenimiento, etc.

Elementos de interconexión
El HTML tiene un diseño de temporizador predefinido, un campo de selección 
de la fecha de finalización y un botón que, al hacer clic, debe iniciar el 
temporizador, para activar el temporizador. Añada un diseño mínimo de elementos 
de la interfaz.

<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>

Biblioteca flatpickr
Use la biblioteca flatpickr para permitir al usuario multipliar la fecha y 
la hora de finalización en un solo elemento de interfaz. Para poder 
introducir el código CSS de la biblioteca en el proyecto, es necesario 
añadir otro importe además del descrito en la documentación.

// Descrito en la documentación
import flatpickr from "flatpickr";
// Importación adicional de estilos
import "flatpickr/dist/flatpickr.min.css";

La biblioteca espera ser inicializada en el elemento input[type="text"], 
por lo que hemos añadido un espacio input#datetime-picker al documento HTML.

<input type="text" id="datetime-picker" />

El segundo argumento de la función flatpickr(selector, options) se puede 
pasar un objeto parámetro opcional. Hemos preparado para usted el objeto 
que necesita para hacer el trabajo. Descubra qué hace cada propiedad en la 
Documentación «Options» y úselo en su código.

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

Selección de fecha
El método onClose() del objeto parámetro es llamado cada vez que el 
elemento de interfaz que crea el flatpickr. Aquí es donde debería 
manejar fecha seleccionada por el usuario. El parámetro selectedDates 
es un array de fechas seleccionadas, así que tomamos el primer elemento.

Si el usuario ha seleccionado una fecha en el pasado, window.alert() 
nos mostra junto el texto "Please choose a date in the future".
Si el usuario ha seleccionado una fecha válida (en el futuro), 
el botón «Start» se convierte en activo.
El botón «Start» no debe estar activo hasta que el usuario haya 
seleccionado la fecha en el futuro.
Al pulsar el botón «Start» se inicia la cuenta regresiva hasta 
la fecha seleccionada desde el momento en que se pulsa.
Cuenta regresiva del tiempo
Cuando se pulsa el botón «Start», el script debe calcular una 
vez por segundo cuánto tiempo queda hasta la fecha especificada 
y actualiza la interfaz del temporizador para mostrar cuatro 
dígitos: días, horas, minutos y segundos en el formato xx:xx:xx:xx.

El número de días puede constar de más de dos dígitos.
El temporizador debe detenerse cuando llegue a la fecha 
de finalización, es decir 00:00:00:00.
HAGÁMOSLO MÁS FÁCIL
Si el temporizador está en marcha, para seleccionar una 
nueva fecha y reiniciarlo, es necesario recargar la página.

Para calcular los valores, use la función preparada convertMs, 
donde ms es la diferencia entre la fecha de finalización y 
la fecha actual en milisegundos.

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

Formato de tiempo
La función convertMs() devuelve un objeto con el tiempo restante calculado 
hasta la fecha final. Tenga en cuenta que no formatea el resultado. Es decir, 
si hay 4 minutos o cualquier otro componente de tiempo, la función devolverá 4, no 04. En la interfaz del temporizador, debe añadirse 0 si el número tiene menos de dos personajes. Escriba una función addLeadingZero(value) que use el padStart() y formatee el valor antes de renderizar el interframe.

Biblioteca de notificaciones
ATENCIÓN
La siguiente funcionalidad no es obligatoria a la hora de entregar un trabajo, 
pero sería una buena práctica adicional.

Para mostrar notificaciones al usuario en lugar de window.alert() use la biblioteca notiflix.


EXPLICACIÓN

Este código implementa un temporizador que cuenta hacia atrás a partir de una fecha 
seleccionada en un selector de fecha y hora.

1. Se importa la biblioteca flatpickr para el selector de fecha y hora, y se importan 
los estilos correspondientes.

2. Se seleccionan y guardan en variables los elementos HTML relevantes, como el selector 
de fecha y hora, el botón y los elementos de visualización del temporizador.

3. Se define una variable timerId inicializada como null para almacenar el identificador 
del temporizador.

4. Se deshabilita el botón.

5. Se configura el selector de fecha y hora utilizando flatpickr, permitiendo la selección 
de tiempo, formato de 24 horas, fecha por defecto y incremento de minutos en 1.

6. Cuando se cierra el selector de fecha y hora, se ejecuta una función que verifica si la 
fecha seleccionada es en el futuro o no.
   - Si la fecha seleccionada es anterior o igual a la fecha actual, se muestra una notificación 
   de error y se deshabilita el botón.
   - Si la fecha seleccionada es en el futuro, se habilita el botón y se muestra una 
   notificación de éxito.

7. Se define una función convertMs que toma una cantidad de milisegundos y la 
convierte en días, horas, minutos y segundos.

8. Se define una función addLeadingZero que agrega un cero inicial a un número 
si es menor que 10.

9. El código está incompleto y no muestra cómo se activa el temporizador ni cómo 
se actualizan los valores visuales del temporizador.

*/
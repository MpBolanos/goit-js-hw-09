import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    Notiflix.Notify.warning(`❗ Please enter a positive number`);
  } else {
    for (let i = 0; i < amount.value; i++) {
      let position = i + 1;
      const delays = Number(delay.value) + step.value * i;

      createPromise(position, delays)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }

  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


/*

Tarea 3 - Generador de promises

Ejecute esta tarea en los archivos 03-promises.html y 03-promises.js.

El HTML tiene un diseño de formulario en el que el usuario introducirá 
el primer retraso en milisegundos, el paso de incremento de retraso 
para cada promise después de primero y el número de promises a crear.

<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>

Escriba un script que llame a la función cuando se envíe el formulario 
createPromise(position, delay) tantas veces como se haya introducido 
en el espacio amount. En cada vez que se llama, pasa el número del 
pagaré (posición) y el retraso considerando el primer retardo (delay) 
y el paso (step) introducidos por el usuario.

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

Complete el código de la función createPromise para que devuelva 
promise, que se ejecuta o se rechaza después de un "retraso" de tiempo. 
El valor de promise debe ser un objeto que tendrá las propiedades position 
y delay con valores de parámetros del mismo nombre. Use el código inicial 
de la función para seleccionar lo que se debe hacer con promise: ejecutarla 
o rechazarla.

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

Biblioteca de notificaciones
ATENCIÓN
La siguiente funcionalidad no es obligatoria a la hora de entregar un trabajo, 
pero sería una buena práctica adicional.

Para mostrar las notificaciones al usuario en lugar de console.log() use 
la biblioteca notiflix.

EXPLICACIÓN

1. Se importa la biblioteca Notiflix para mostrar notificaciones.

2. Se selecciona el formulario HTML con la clase "form".

3. Se agrega un event listener al formulario para el evento "submit" 
que llama a la función "onSubmitForm".

4. La función "onSubmitForm" se ejecuta cuando se envía el formulario.

5. Se obtienen los valores de los campos de entrada del formulario.

6. Si alguno de los valores es menor que cero, se muestra una notificación 
de advertencia.

7. Si todos los valores son positivos, se ejecuta un bucle que crea promesas 
y las maneja.

8. La función "createPromise" crea una nueva promesa que se resuelve o se 
rechaza después de un retraso determinado.

9. Cuando una promesa se resuelve, se muestra una notificación de éxito. 
Cuando una promesa se rechaza, se muestra una notificación de fallo.

10. Se restablecen los valores del formulario después de enviarlo.
*/


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

Este código implementa temporizador que utiliza la biblioteca "flatpickr" 
para seleccionar una fecha y hora. Una vez que se elige una fecha posterior 
a la actual, se activa un botón que al hacer clic inicia un temporizador que 
muestra el tiempo restante en días, horas, minutos y segundos.

1. Se importa la biblioteca "flatpickr" y sus estilos, así como la biblioteca 
"notiflix" para mostrar notificaciones.

2. Se obtienen referencias a los elementos del DOM necesarios para el 
funcionamiento del temporizador.

3. Se inicializa el componente "flatpickr" para el selector de fecha y hora, 
configurando diversas opciones.

4. Cuando se cierra el selector de fecha y hora, se verifica si la fecha 
seleccionada es posterior a la fecha actual. Si es así, se habilita el botón 
de inicio y se muestra una notificación de éxito. De lo contrario, se 
deshabilita el botón y se muestra una notificación de error.

5. Al hacer clic en el botón de inicio, se activa el temporizador. Se deshabilita 
el botón y el selector de fecha y hora para evitar cambios durante el temporizador.

6. En cada intervalo de 1 segundo, se calcula el tiempo restante en días, horas, 
minutos y segundos a partir de la fecha seleccionada. Estos valores se actualizan 
en los elementos del DOM correspondientes.

7. Cuando el tiempo restante es menor a 1 segundo, se detiene el temporizador, 
se habilita nuevamente el selector de fecha y hora y se aplican estilos visuales 
indicando que ha finalizado.

*/
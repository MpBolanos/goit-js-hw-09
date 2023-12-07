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



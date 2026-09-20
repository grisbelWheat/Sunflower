import { SELECTORS, TIMING } from './config.js';

function crearParticula(x, y) {
  for (let i = 0; i < 10; i++) {
    const particula = document.createElement('div');
    particula.className = 'particula';
    particula.style.left = `${x}px`;
    particula.style.top = `${y}px`;
    particula.style.setProperty('--rand', Math.random());

    document.body.appendChild(particula);

    setTimeout(() => {
      particula.remove();
    }, 800);
  }
}

function inicializarAlineacion(lista) {
  const multimedia = lista.querySelectorAll('.item-credito-media');

  multimedia.forEach((elemento, indice) => {
    if (!elemento.dataset.align) {
      elemento.dataset.align = indice % 2 === 0 ? 'left' : 'right';
    }
  });
}

let ultimoScrollCredito = 0;

function desplazarHaciaCredito(creditos, elemento) {
  const ahora = performance.now();
  if (ahora - ultimoScrollCredito < 220) return;

  const targetTop = Math.max(0, elemento.offsetTop - creditos.clientHeight * 0.42);
  const diferencia = Math.abs(creditos.scrollTop - targetTop);

  if (diferencia < 24) return;

  ultimoScrollCredito = ahora;
  window.setTimeout(() => {
    const topActual = creditos.scrollTop;
    const siguienteTop = Math.max(0, Math.min(targetTop, creditos.scrollHeight - creditos.clientHeight));

    if (Math.abs(topActual - siguienteTop) >= 20) {
      creditos.scrollTo({
        top: siguienteTop,
        behavior: 'smooth'
      });
    }
  }, 90);
}

export function inicializarCreditos() {
  const creditos = document.querySelector(SELECTORS.credits);
  const lista = document.querySelector(SELECTORS.creditList);

  if (!creditos || !lista) return;

  inicializarAlineacion(lista);

  creditos.querySelectorAll(SELECTORS.creditItems).forEach((elemento, indice) => {
    const delaySegundos = TIMING.creditBaseDelay + indice * TIMING.creditDelayStep;
    elemento.style.animationDelay = `${delaySegundos}s`;

    elemento.addEventListener('click', (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX || (rect.left + rect.width / 2);
      const y = event.clientY || (rect.top + rect.height / 2);

      crearParticula(x, y);
    });

    elemento.addEventListener('animationstart', () => {
      requestAnimationFrame(() => desplazarHaciaCredito(creditos, elemento));
    });
  });
}

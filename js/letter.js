import { LETTER_TEXT, SELECTORS, TIMING } from './config.js';

function crearPalabraAnimada(palabra, indice) {
  const span = document.createElement('span');
  span.textContent = palabra;
  span.style.animationDelay = `${TIMING.wordBaseDelay + indice * TIMING.wordDelayStep}s`;

  return span;
}

export function calcularDuracionCartaMs() {
  const totalPalabras = LETTER_TEXT.trim().split(/\s+/).filter(Boolean).length;

  return (TIMING.wordBaseDelay + totalPalabras * TIMING.wordDelayStep + TIMING.wordAnimationDuration) * 1000;
}

export function inicializarCarta() {
  const parrafo = document.querySelector(SELECTORS.letterText);
  if (!parrafo) return;

  const fragmento = document.createDocumentFragment();
  const palabras = LETTER_TEXT.trim().split(/\s+/).filter(Boolean);

  palabras.forEach((palabra, indice) => {
    fragmento.appendChild(crearPalabraAnimada(palabra, indice));

    if (indice < palabras.length - 1) {
      fragmento.append(' ');
    }
  });

  parrafo.replaceChildren(fragmento);
}

export function inicializarAutoScrollCarta() {
  const carta = document.querySelector(SELECTORS.card);
  const parrafo = document.querySelector(SELECTORS.letterText);
  if (!carta || !parrafo) return;

  parrafo.addEventListener('animationstart', (event) => {
    if (event.target.tagName !== 'SPAN') return;

    requestAnimationFrame(() => {
      carta.scrollTo({
        top: Math.max(0, event.target.offsetTop - carta.clientHeight * 0.45),
        behavior: 'smooth'
      });
    });
  });
}

import { SELECTORS, SCENE_ORDER, TIMING } from './config.js';
import { fundirAudio, obtenerDuracionAudioMs, reproducirDesdeInicio } from './audio.js';

let indiceActual = 0;
let timerGato = null;
let timerAutoAvance = null;
let transicionActiva = false;

function obtenerEscenaActual() {
  return document.querySelector(SELECTORS.activeScene);
}

function obtenerGatos(escena) {
  return {
    intermedio: escena?.querySelector('[data-cat-role="intermediate"]'),
    final: escena?.querySelector('[data-cat-role="final"]')
  };
}

function resetearGatos(escena) {
  const { intermedio, final } = obtenerGatos(escena);

  intermedio?.classList.remove('gato-visible', 'gato-oculto');
  intermedio?.setAttribute('aria-disabled', 'true');

  final?.classList.remove('gato-visible', 'gato-transicionando');
}

function activarGatoIntermedio(escena) {
  const { intermedio } = obtenerGatos(escena);
  if (!intermedio || !escena.classList.contains('activa')) return;

  intermedio.classList.add('gato-visible');
  intermedio.setAttribute('aria-disabled', 'false');
}

function obtenerDelayGato(escena, opciones) {
  const delayBase = TIMING.catRevealDelay[escena.id] ?? 0;

  if (escena.id !== 'escena-carta') return delayBase;

  return Math.max(delayBase, opciones.duracionCartaMs?.() ?? 0);
}

function programarGatoDeEscena(escena, opciones) {
  clearTimeout(timerGato);
  resetearGatos(escena);

  const { intermedio } = obtenerGatos(escena);
  if (!intermedio) return;

  timerGato = setTimeout(() => {
    activarGatoIntermedio(escena);
  }, obtenerDelayGato(escena, opciones));
}

function cambiarEscena(idEscenaNueva, opciones) {
  const actual = obtenerEscenaActual();
  const nueva = document.getElementById(idEscenaNueva);

  if (!actual || !nueva) return;

  actual.classList.remove('activa');
  resetearGatos(actual);
  nueva.classList.add('activa');
  programarGatoDeEscena(nueva, opciones);
}

function avanzarEscena(opciones) {
  if (indiceActual >= SCENE_ORDER.length - 1) return;

  indiceActual++;
  cambiarEscena(SCENE_ORDER[indiceActual], opciones);
}

function iniciarCreditos() {
  const bgAudio = document.querySelector(SELECTORS.backgroundAudio);
  const creditAudio = document.querySelector(SELECTORS.creditAudio);

  fundirAudio(bgAudio, 0, 2000);

  if (creditAudio) {
    reproducirDesdeInicio(creditAudio, 0);
    fundirAudio(creditAudio, 0.6, 2000);
  }
}

async function ejecutarTransicionConGato(escena, opciones) {
  if (transicionActiva) return;
  transicionActiva = true;
  clearTimeout(timerAutoAvance);

  const { intermedio, final } = obtenerGatos(escena);
  const audioGato = document.querySelector(SELECTORS.catAudio);
  const promesaDuracion = obtenerDuracionAudioMs(audioGato, TIMING.catTransitionFallback);

  intermedio?.classList.add('gato-oculto');
  reproducirDesdeInicio(audioGato, 0.75);

  const duracion = await promesaDuracion;

  final?.style.setProperty('--cat-transition-duration', `${duracion}ms`);
  final?.classList.add('gato-visible', 'gato-transicionando');

  if (escena.id === 'escena-carta') {
    document.querySelector(SELECTORS.card)?.classList.add('carta-desaparece');
  }

  setTimeout(() => {
    if (escena.id === 'escena-carta') iniciarCreditos();

    avanzarEscena(opciones);
    transicionActiva = false;
  }, duracion);
}

function escucharGatos(opciones) {
  document.querySelectorAll('[data-transition-cat]').forEach((gato) => {
    const activar = () => {
      if (gato.getAttribute('aria-disabled') === 'true') return;
      ejecutarTransicionConGato(gato.closest('.escena'), opciones);
    };

    gato.addEventListener('click', activar);
    gato.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      activar();
    });
  });
}

export function inicializarTransicionesDeEscena(opciones = {}) {
  escucharGatos(opciones);

  const escenaInicial = obtenerEscenaActual();
  if (escenaInicial) {
    indiceActual = Math.max(0, SCENE_ORDER.indexOf(escenaInicial.id));
    programarGatoDeEscena(escenaInicial, opciones);
  }

  timerAutoAvance = setTimeout(() => {
    cambiarEscena('escena-carta', opciones);
    indiceActual = SCENE_ORDER.indexOf('escena-carta');
  }, TIMING.autoAdvance);
}

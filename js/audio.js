import { SELECTORS } from './config.js';

const activeFades = new WeakMap();

export function fundirAudio(audio, destino, duracionMs = 1000) {
  if (!audio) return;

  const fadeAnterior = activeFades.get(audio);
  if (fadeAnterior) clearInterval(fadeAnterior);

  const pasos = 20;
  const inicio = audio.volume;
  const delta = (destino - inicio) / pasos;
  let paso = 0;

  const intervalo = setInterval(() => {
    paso++;
    audio.volume = Math.max(0, Math.min(1, inicio + delta * paso));

    if (paso >= pasos) {
      clearInterval(intervalo);
      activeFades.delete(audio);
    }
  }, duracionMs / pasos);

  activeFades.set(audio, intervalo);
}

export function reproducirDesdeInicio(audio, volumen = audio?.volume ?? 1) {
  if (!audio) return Promise.resolve();

  audio.pause();
  audio.currentTime = 0;
  audio.volume = volumen;

  return audio.play().catch((err) => {
    console.log('Audio bloqueado:', err);
  });
}

export function obtenerDuracionAudioMs(audio, fallbackMs) {
  if (!audio) return Promise.resolve(fallbackMs);

  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    return Promise.resolve(audio.duration * 1000);
  }

  return new Promise((resolve) => {
    const resolver = () => {
      const duracion = Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration * 1000
        : fallbackMs;

      cleanup();
      resolve(duracion);
    };

    const cleanup = () => {
      audio.removeEventListener('loadedmetadata', resolver);
      audio.removeEventListener('error', resolver);
    };

    audio.addEventListener('loadedmetadata', resolver, { once: true });
    audio.addEventListener('error', resolver, { once: true });
    audio.load();

    setTimeout(resolver, 600);
  });
}

export function inicializarAudio() {
  const audio = document.querySelector(SELECTORS.backgroundAudio);
  let audioIniciado = false;

  function iniciarAudio() {
    if (audioIniciado || !audio) return;

    audio.volume = 0.6;
    audio.play().catch((err) => console.log('Audio bloqueado:', err));
    audioIniciado = true;
  }

  document.addEventListener('click', iniciarAudio, { once: true });
  document.addEventListener('touchstart', iniciarAudio, { once: true });
}

import { inicializarAudio } from './audio.js';
import { inicializarFlores } from './climate.js';
import { inicializarCreditos } from './credits.js';
import { calcularDuracionCartaMs, inicializarAutoScrollCarta, inicializarCarta } from './letter.js';
import { inicializarTransicionesDeEscena } from './scenes.js';

inicializarCarta();
inicializarAutoScrollCarta();
inicializarCreditos();
inicializarAudio();
inicializarFlores();
inicializarTransicionesDeEscena({
  duracionCartaMs: calcularDuracionCartaMs
});

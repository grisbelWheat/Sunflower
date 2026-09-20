export const SELECTORS = {
  activeScene: '.escena.activa',
  card: '.carta',
  letterText: '.texto-carta',
  credits: '.creditos',
  creditList: '.lista-creditos',
  creditItems: '.titulo-creditos, .item-credito',
  flowerField: '#campo-flores',
  backgroundAudio: '#audio-fondo',
  creditAudio: '#audio-creditos',
  catAudio: '#audio-gato'
};

export const SCENE_ORDER = ['escena-inicio', 'escena-carta', 'escena-creditos'];

export const TIMING = {
  autoAdvance: 120000,
  wordBaseDelay: 1.5,
  wordDelayStep: 0.15,
  wordAnimationDuration: 0.5,
  creditBaseDelay: 1.5,
  creditDelayStep: 1.6,
  catTransitionFallback: 1800,
  catRevealDelay: {
    'escena-inicio': 3000,
    'escena-carta': 22000
  }
};

export const LETTER_TEXT = 'dugasu fasbf kjdfasjfh hshjasfjasfjk fhkasjfhkjsafh ';

export const FLOWER_OPTIONS = {
  imagen: 'assets/floramarilla.png',
  cantidad: 32,
  fuerzaViento: 20,
  layers: 4
};

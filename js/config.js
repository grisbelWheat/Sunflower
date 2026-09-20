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

export const LETTER_TEXT = 'Tal vez estas palabras no tengan sentido, estén mal escritas, carezcan de sentido, tal vez cambien y muten sin rumbo fijo, no serán palabras honestas porque son algo intentando expresar algo que por sí mismas no son. Son solo palabras escritas con un propósito vago. Expresar mi amor, algo tan variable que me confunde, no sé dónde está a veces, parece esconderse, muta en formas varias y entonces me pregunto, ¿qué estoy sintiendo? Sin duda algo es, y es único como tú, supongo que amarte tiene algo de especial. Tal vez no haya un te amo, tal vez sea un amándote. Y amarte es algo tan grande para mí, como un universo. Quizá sea algo que no pueda explicar, y quizá no deba buscar explicarlo. Debo confesar que me interesé por ti por cosas muy egoístas, bueno supongo que tener la posibilidad de conocer a alguien que pueda hablarte sobre las cosas que te interesan es cuanto menos algo deseable, normal hasta cierto punto. Platonto, fue la señal quizá, tal vez Louis Wain, pero has estado en mi mente por un gran tiempo por las razones equivocadas. Alguien, no tú. Una posición que llegué a pensar que podrías ocupar, alguien interesante. Y me demostraste no sé muy bien cuantas veces que eras más que eso. Claro cada persona es más que un alguien, más que un constructo de tu mente. Y tú pues … cada vez que te veía, me resultabas muy extraña, rara, pero también parecías ser tan familiar para mí, bueno no sé cuántas veces te dije que eres rara, y pues eres rara, raramente rara. Y quizá por eso me causabas cierta incomodidad. Y bueno si algo te incomoda quizá algo lógico sea evitarlo. Y así fue, y así hubiera sido. Pero bueno, tú impediste eso cuando te me acercaste para pintar una Miku. Aunque los primeros indicios fueron con lo de mi cumpleaños. En serio agradezco mucho ese gesto entre tú y Dyron. Ahí me di cuenta que puedo llegar a ser muy tonto. El universo es inmenso, cada estrella, imagínate si sus macroestructuras sean células y formemos parte de un ser vivo de magnitudes que no podemos imaginar, como matrioskas, pero con pequeños deslices en las proporciones. Un universo es muy grande, y como sabrás soy un poco lento, no puedo procesar un universo y no quiero quedarme pasivamente contemplando algo tan grande que me supera y que no puedo procesar del todo, pero puedo procesar el firmamento. Inmenso, precioso, e impredecible. Y no sé, pero cayendo de nuevo en cosas egoístas, eres mi cielo, y quiero verte, clara, en tormenta, vacía, en un atardecer, en un amanecer, en todo lo que quieras ser, amándote. Y… si por alguna razón no llego a verte más entonces estarás conmigo siempre como lo estás ya, en mis pensamientos y recuerdos, en las cosas que hice, en el cielo que vemos. Y quizá entonces al ver ese cielo podré sentir esa felicidad que me das, esperando que en donde sea que estes, tu también seas feliz mirando al cielo.';

export const FLOWER_OPTIONS = {
  imagen: 'assets/floramarilla.png',
  cantidad: 32,
  fuerzaViento: 20,
  layers: 4
};

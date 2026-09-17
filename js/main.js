const SELECTORS = {
  activeScene: '.escena.activa',
  card: '.carta',
  letterText: '.texto-carta',
  credits: '.creditos',
  creditItems: '.titulo-creditos, .item-credito',
  closeLetterButton: '#btn-cerrar-carta',
  continueButton: '#btn-continuar',
  flowerField: '#campo-flores',
  backgroundAudio: '#audio-fondo',
  // Duplicado de "credits" y sin uso actual. Antes de ampliar selectores, unificar este nombre
  // evitara que una futura variante de creditos se inicialice desde referencias distintas.
  creditos: '.creditos',
  creditAudio: '#audio-creditos'
};

// La ultima escena no existe en este documento: el boton final navega a otro HTML. Mantener
// ambas rutas sincronizadas si se incorpora una escena intermedia o se cambia la navegacion.
const ORDEN_ESCENAS = ['escena-inicio', 'escena-carta', 'escena-creditos', 'escena-ludovico'];

const TIMING = {
  // Estos tiempos son parte de la narracion. Al agregar multimedia, coordinar su carga y sus
  // entradas desde esta linea de tiempo, sin reemplazar las revelaciones individuales.
  autoAdvance: 120000,
  closeLetterAnimation: 1200,
  wordBaseDelay: 1.5,
  wordDelayStep: 0.15,
  creditBaseDelay: 1.5,
  creditDelayStep: 1.6
};

const BUTTON_ENABLE_DELAY = {
  continue: 2000,
  closeLetter: 2000
};

let indiceActual = 0;

const LETTER_TEXT = 'Tal vez estas palabras no tengan sentido, estén mal escritas, carezcan de sentido, tal vez cambien y muten sin rumbo fijo, no serán palabras honestas porque son algo intentando expresando algo que en per se no son. Son solo palabras escritas con un propósito vago. Expresar mi amor, mi amor que no es amor, el vacío de mis sentimientos, que parecen quemarme, que parecen abrazarme, helarme. Sin duda algo es, y es único como tú, supongo que amarte tiene algo de especial. Tal vez no haya un te amo, tal vez sea un amándote. Y amarte es algo tan grande para mí, como un universo. Quizá sea algo que no pueda explicar, y quizá no deba buscar explicarlo. Debo confesar que me interesé por ti por cosas muy egoístas, bueno supongo que tener la posibilidad de conocer a alguien que pueda hablarte sobre las cosas que te interesan es cuanto menos algo deseable, normal hasta cierto punto. Platonto, fue la señal quizá, tal vez Louis Wain, pero has estado en mi mente por un gran tiempo por las razones equivocadas. Alguien, no tú. Una posición que llegué a pensar que podrías ocupar, alguien interesante. Y me demostraste no sé muy bien cuantas veces que eras más que eso. Claro cada persona es más que un alguien, más que un constructo de tu mente. Y tú pues no sé, cada vez que te veía, me resultabas muy extraña, rara, bueno no sé cuántas veces te dije que eres rara, y sigues teniendo para mí esa rareza tan rara, bueno raramente raro. Y quizá por eso me causabas cierta incomodidad. Y bueno si algo te incomoda quizá algo lógico sea evitarlo. Y así fue, y así hubiera sido. Pero bueno, tú impediste eso. Hiciste tantas cosas, y supongo que ya lo dije antes, no me hace sentido. Pero eso ya dejó de importar. El universo es inmenso, cada estrella, imagínate si sus macroestructuras sean células y formemos parte de un ser vivo de magnitudes que no podemos imaginar, como matrioskas, pero con pequeños deslices en las proporciones. Un universo es muy grande, y no podría comparar amarte con algo de tal magnitud, porque bueno no puedo procesar un universo, pero puedo procesar el firmamento. Inmenso, precioso, e impredecible. Y no sé, pero cayendo de nuevo en cosas egoístas, eres mi cielo, y quiero verte, clara, en tormenta, vacía, en un atardecer, en un amanecer, en todo lo que quieras ser, amándote.';

const FLOWER_OPTIONS = {
  imagen: 'assets/floramarilla.png',
  cantidad: 90,
  fuerzaViento: 30,
  layers: 15
};

function cambiarEscena(idEscenaNueva) {
  const actual = document.querySelector(SELECTORS.activeScene);
  const nueva = document.getElementById(idEscenaNueva);

  if (!actual || !nueva) return;

  actual.classList.remove('activa');
  nueva.classList.add('activa');
}

function crearPalabraAnimada(palabra, indice) {
  const span = document.createElement('span');
  span.textContent = palabra;
  span.style.animationDelay = `${TIMING.wordBaseDelay + indice * TIMING.wordDelayStep}s`;

  return span;
}

function inicializarCarta() {
  const parrafo = document.querySelector(SELECTORS.letterText);
  if (!parrafo) return;

  const fragmento = document.createDocumentFragment();

  // DocumentFragment evita repintados durante la creacion. Con cartas mucho mas extensas,
  // cada palabra sigue siendo un nodo animado: conviene medir el coste antes de escalar texto.
  LETTER_TEXT.split(' ').forEach((palabra, indice, palabras) => {
    fragmento.appendChild(crearPalabraAnimada(palabra, indice));

    if (indice < palabras.length - 1) {
      fragmento.append(' ');
    }
  });

  parrafo.replaceChildren(fragmento);
}

function inicializarCreditos() {
  const creditos = document.querySelector(SELECTORS.credits);

  if (!creditos) return;
  creditos.querySelectorAll(SELECTORS.creditItems).forEach((elemento, indice) => {
    // El delay se calcula por item, por eso imagenes y enlaces deben vivir dentro de este mismo
    // elemento de credito. Si los datos llegan desde fuera, insertarlos como texto/atributos y
    // no como HTML crudo para no convertir un enlace externo en una via de inyeccion.
    elemento.style.animationDelay = `${TIMING.creditBaseDelay + indice * TIMING.creditDelayStep}s`;
    elemento.addEventListener('click', (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX || (rect.left + rect.width / 2);
      const y = e.clientY || (rect.top + rect.height / 2);
      // Un enlace navegara casi enseguida y puede ocultar este efecto. Decidir por tipo de
      // credito si el toque prioriza la particula, abre el enlace o combina ambos con demora.
      crearParticula(x, y);
    });
  });
}

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

function inicializarControlesDeEscena() {
  const btnContinuar = document.querySelector(SELECTORS.continueButton);
  const btnCerrarCarta = document.querySelector(SELECTORS.closeLetterButton);
  const carta = document.querySelector(SELECTORS.card);


  const timerAutoAvance = setTimeout(() => {
    // BUG DIFERIDO: SCENES no esta declarado, asi que tras dos minutos el avance automatico
    // lanza ReferenceError. Usar el id de la carta o centralizar los ids antes de habilitarlo.
    cambiarEscena(SCENES.letter);
  }, TIMING.autoAdvance);

  setTimeout(() => {
    // Estos temporizadores empiezan al cargar la pagina, no al entrar a cada escena. Con mas
    // transiciones o carga multimedia podrian habilitar controles antes de su momento visual.
    if (btnContinuar) btnContinuar.disabled = false,btnContinuar.style.animationDelay=`${BUTTON_ENABLE_DELAY.continue / 1000}s`;
  }, BUTTON_ENABLE_DELAY.continue);

  setTimeout(() => {
    if (btnCerrarCarta) btnCerrarCarta.disabled = false,btnCerrarCarta.style.animationDelay=`${BUTTON_ENABLE_DELAY.closeLetter / 1000}s`;
  }, BUTTON_ENABLE_DELAY.closeLetter);

  btnContinuar?.addEventListener('click', () => {
    clearTimeout(timerAutoAvance);
    avanzarEscena();
  });

  btnCerrarCarta?.addEventListener('click', () => {
    carta?.classList.add('carta-desaparece');

    setTimeout(() => {
      carta?.classList.remove('carta-desaparece');
      avanzarEscena();
      const bgAudio = document.querySelector(SELECTORS.backgroundAudio);
      fundirAudio(bgAudio, 0.0, 2000);
      const creditAudio = audioElregreso(document.querySelector(SELECTORS.creditAudio).src);
      fundirAudio(creditAudio, 0.6, 2000);
    }, TIMING.closeLetterAnimation);
  });
}

function avanzarEscena() {
  if (indiceActual>= ORDEN_ESCENAS.length - 1) return;

  indiceActual++;
  cambiarEscena(ORDEN_ESCENAS[indiceActual]);
}

function fundirAudio(audio, destino, duracionMs= 1000){
  // Si el elemento de audio falta o no llega a cargar, audio.volume lanzara un error. Tambien,
  // varias transiciones rapidas pueden solapar intervalos; al sumar pistas convendra cancelar
  // el fundido anterior de cada canal.
  const pasos = 20;
  const delta = (destino - audio.volume) / pasos;
  let paso = 0;
  
  const intervalo = setInterval(() => {
    paso++;
    audio.volume = Math.max(0, Math.min(1, audio.volume + delta));
    
    if (paso >= pasos) clearInterval(intervalo);
  }, duracionMs / pasos);
    
}

function inicializarAudio() {
  const audio = document.querySelector(SELECTORS.backgroundAudio);
  let audioIniciado = false;

  function iniciarAudio() {
    if (audioIniciado || !audio) return;

    audio.volume = 0.6;
    // Algunos navegadores rechazan play hasta un gesto valido. Al crecer el paisaje sonoro,
    // mostrar una alternativa silenciosa y no reintentar cada pista por separado evitara ruido.
    audio.play().catch((err) => console.log('Audio bloqueado:', err));
    audioIniciado = true;
  }

  document.addEventListener('click', iniciarAudio, { once: true });
  document.addEventListener('touchstart', iniciarAudio, { once: true });
}

function audioElregreso(source){
  // Cada cierre crea un Audio nuevo. Esta escena solo se abre una vez hoy; con reingresos o mas
  // pistas, reutilizar canales evitara audio duplicado y objetos pendientes en memoria.
  const sound = new Audio(source);
  sound.volume = 0.0;
  sound.play().catch((err) => console.log('Audio bloqueado:', err));
  return sound;
}

class GeneradorClima {
  constructor(contenedor, opciones) {
    this.contenedor = contenedor;
    this.opciones = opciones;
    this.layer = 1;
  }

  crearElemento() {

    // cantidad y layers deben mantenerse enteros y coherentes. Valores fraccionarios producirian
    // distribuciones inesperadas; cientos de elementos animados afectarian sobre todo a movil.
    const cantidadPorLayer = this.opciones.cantidad / this.opciones.layers;

    for (let i = 0; i < cantidadPorLayer; i++) {
      const elemento = document.createElement('img');
      const top = 65 + Math.random() * 5 + ((this.layer - 1) * 3);
      const left = Math.random() * 100;
      const escala = 0.6 + Math.random() * 0.7 + ((this.layer - 1) * 0.2);
      const rotacionBase = -this.opciones.fuerzaViento + Math.random() * (this.opciones.fuerzaViento * 2);
      const duracion = 3 + Math.random() * 3;
      const delay = -Math.random() * 5;

      elemento.src = this.opciones.imagen;
      elemento.className = 'clima-elemento';
      elemento.style.zIndex = this.layer;
      elemento.style.top = `${top}%`;
      elemento.style.left = `${left}%`;
      elemento.style.setProperty('--escala', escala);
      elemento.style.setProperty('--rot-base', `${rotacionBase}deg`);
      elemento.style.animationDuration = `${duracion}s`;
      elemento.style.animationDelay = `${delay}s`;

      this.contenedor.appendChild(elemento);
    }

    this.layer++;
  }

  generar() {
    if (!this.contenedor) return;

    for (let i = 0; i < this.opciones.layers; i++) {
      this.crearElemento();
    }
  }
}

function inicializarFlores() {
  const campo = document.querySelector(SELECTORS.flowerField);
  const viento = new GeneradorClima(campo, FLOWER_OPTIONS);

  viento.generar();
}

inicializarControlesDeEscena();
inicializarCarta();
inicializarCreditos();
inicializarAudio();
inicializarFlores();

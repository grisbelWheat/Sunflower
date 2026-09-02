//cambiar escena

function cambiarEscena(idEscenaNueva) {
  const actual = document.querySelector('.escena.activa');
  const nueva = document.getElementById(idEscenaNueva);

  actual.classList.remove('activa');
  nueva.classList.add('activa');
}

// Generador de viento(por ahora)
class GeneradorClima {
  constructor(contenedor, opciones) {
    this.contenedor = contenedor;   // dónde se van a meter los elementos
    this.opciones = opciones;  
    this.layer = 1;
    this.num = 0;     // config: cuántos, qué imagen, qué tan fuerte el viento
  }
  crearElemento() {
  for (let i = 0; i < (this.opciones.cantidad) / (this.opciones.layer); i++) {
    const el = document.createElement('img'); // ahora sí, uno nuevo por vuelta
    el.src = this.opciones.imagen;
    el.className = 'clima-elemento';

    //mas adelante podria llegar a implementarse la generacion de bandas por arrays para tener mas control sobre la distribucion de las flores
    //esto implica animacion mas personalizada como para tener un gato entre las flores
    const top      = 65 + Math.random() * 5 + ((this.layer - 1) * 3); // para que no se amontonen
    const left     = 0  + Math.random() * 100;
    const escala   = 0.6 + Math.random() * 0.7 + ((this.layer - 1) * 0.2); // para que no se amontonen
    const rotBase  = -this.opciones.fuerzaViento + Math.random() * (this.opciones.fuerzaViento * 2);
    const duracion = 3 + Math.random() * 3;
    const delay    = -Math.random() * 5;

    el.style.zIndex = this.layer;
    el.style.top = `${top}%`;
    el.style.left = `${left}%`;
    el.style.setProperty('--escala', escala);
    el.style.setProperty('--rot-base', `${rotBase}deg`);
    el.style.animationDuration = `${duracion}s`;
    el.style.animationDelay = `${delay}s`;

    this.contenedor.appendChild(el);
  }
  this.layer++;
}

  generar() {
    for (let i = 0; i < this.opciones.layer; i++) {
      this.crearElemento();
    }
  }
}

// sonido de fondo
const audio = document.getElementById('audio-fondo');
let audioIniciado = false;

function iniciarAudio() {
  if (audioIniciado) return; // evita que se ejecute más de una vez
  audio.volume = 0.6;
  audio.play().catch(err => console.log('Audio bloqueado:', err));
  audioIniciado = true;
}

document.addEventListener('click', iniciarAudio, { once: true });
document.addEventListener('touchstart', iniciarAudio, { once: true });

// Iniciar el generador de viento

const campo = document.getElementById('campo-flores');

const viento = new GeneradorClima(campo, {
  imagen: 'assets/floramarilla.png',
  cantidad: 90,
  fuerzaViento: 30, // grados máximos de balanceo — súbelo o bájalo a gusto
  layer: 15
});

viento.generar();

//miau
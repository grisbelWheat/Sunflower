import { FLOWER_OPTIONS, SELECTORS } from './config.js';

class GeneradorClima {
  constructor(contenedor, opciones) {
    this.contenedor = contenedor;
    this.opciones = opciones;
    this.layer = 1;
  }

  generarPosiciones(cantidadPorLayer) {
    const paso = 100 / cantidadPorLayer;
    const posiciones = [];

    for (let i = 0; i <= cantidadPorLayer; i++) {
      posiciones.push(i * paso);
    }

    return posiciones;
  }

  crearElemento() {
    const cantidadPorLayer = Math.max(1, Math.floor(this.opciones.cantidad / this.opciones.layers));
    const posiciones = this.generarPosiciones(cantidadPorLayer);

    for (let i = 0; i < cantidadPorLayer; i++) {
      const elemento = document.createElement('img');
      const top = 65 + Math.random() + (this.layer - 1) * 5;
      const left = posiciones[i] + Math.random() * (30 / cantidadPorLayer);
      const escala = 1 + Math.random() * 0.7 + (this.layer - 1) * 0.2;
      const rotacionBase = -this.opciones.fuerzaViento + Math.random() * (this.opciones.fuerzaViento * 2);
      const duracion = 3 + Math.random() * 3;
      const delay = -Math.random() * 5;

      elemento.src = this.opciones.imagen;
      elemento.className = 'clima-elemento';
      elemento.alt = '';
      elemento.dataset.layer = this.layer;
      elemento.dataset.position = i;
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

export function inicializarFlores() {
  const campo = document.querySelector(SELECTORS.flowerField);
  const viento = new GeneradorClima(campo, FLOWER_OPTIONS);

  viento.generar();
}

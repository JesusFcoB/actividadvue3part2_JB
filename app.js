const { createApp } = Vue;

const moneda = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
});

createApp({
  data() {
    return {
      busqueda: '',
      categoria: '',
      soloDisponibles: false,
      ordenPrecio: 'original',
      modoOscuro: false,
      productos: [
        { id: 1, nombre: 'Teclado mecánico', categoria: 'Periféricos',
          precio: 890, stock: 8 },
        { id: 2, nombre: 'Ratón inalámbrico', categoria: 'Periféricos',
          precio: 350, stock: 0 },
        { id: 3, nombre: 'Audífonos USB', categoria: 'Audio',
          precio: 520, stock: 5 },
        { id: 4, nombre: 'Bocina portátil', categoria: 'Audio',
          precio: 680, stock: 0 },
        { id: 5, nombre: 'Memoria USB 64 GB', categoria: 'Almacenamiento',
          precio: 180, stock: 14 },
        { id: 6, nombre: 'SSD portátil 1 TB', categoria: 'Almacenamiento',
          precio: 1490, stock: 3 },
        { id: 7, nombre: 'Teléfono inteligente', categoria: 'Telefonía',
          precio: 5790, stock: 4 },
        { id: 8, nombre: 'Webcam HD', categoria: 'Periféricos',
          precio: 740, stock: 6 },
        { id: 9, nombre: 'Cargador inalámbrico', categoria: 'Accesorios',
          precio: 430, stock: 0 }
      ]
    };
  },
  computed: {
    categorias() {
      return [...new Set(this.productos.map((producto) => producto.categoria))];
    },
    productosFiltrados() {
      const consulta = this.busqueda.trim().toLowerCase();

      const resultados = this.productos.filter((producto) => {
        const coincideNombre =
          producto.nombre.toLowerCase().includes(consulta);
        const coincideCategoria =
          this.categoria === '' || producto.categoria === this.categoria;
        const coincideDisponibilidad =
          !this.soloDisponibles || producto.stock > 0;

        return coincideNombre && coincideCategoria && coincideDisponibilidad;
      });

      if (this.ordenPrecio === 'ascendente') {
        return resultados.sort((a, b) => a.precio - b.precio);
      }
      if (this.ordenPrecio === 'descendente') {
        return resultados.sort((a, b) => b.precio - a.precio);
      }
      return resultados;
    }
  },
  methods: {
    alternarTema() {
      this.modoOscuro = !this.modoOscuro;
      document.body.classList.toggle('modo-oscuro', this.modoOscuro);
    },
    limpiarFiltros() {
      this.busqueda = '';
      this.categoria = '';
      this.soloDisponibles = false;
      this.ordenPrecio = 'original';
    },
    formatearPrecio(precio) {
      return moneda.format(precio);
    }
  }
}).mount('#app');

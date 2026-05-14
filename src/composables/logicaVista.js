import { onMounted } from "vue";

/**
 * Gestiona la logica comun de las vistas.
 * Centraliza la busqueda, paginacion y carga inicial de datos.
 *
 * @param {Object} almacen El almacen de Pinia
 * @param {String} mensajeError Mensaje a mostrar si falla la carga.
 */
export const logicaVista = (
  almacen,
  mensajeError = "Error al cargar los datos",
) => {
  /**
   * Actualiza el texto de filtro en el almacen.
   * @param {String} texto La palabra de busqueda.
   */
  const manejarBusqueda = (texto) => {
    almacen.textoFiltro = texto;
  };
 

  onMounted(async () => {
    almacen.textoFiltro = "";
    try {
      await almacen.cargar();
    } catch (error) {
      alert(mensajeError);
    }
  });

  return {
    manejarBusqueda,

  };
};

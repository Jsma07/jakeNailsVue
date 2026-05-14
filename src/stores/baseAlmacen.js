import { ref, computed } from "vue";

/**
 * Hook base para almacenes con lógica común de listado y filtrado.
 * @param {Function} funcionServicio La funcion del servicio que obtiene los datos.
 * @param {String} propiedadDatos La propiedad del objeto de respuesta que contiene la lista (opcional).
 * @returns {Object} Estado y acciones comunes.
 */
export const useBaseAlmacen = (funcionServicio, propiedadDatos = null) => {
  const lista = ref([]);
  const estaCargando = ref(false);
  const textoFiltro = ref("");

  const cargar = async () => {
    estaCargando.value = true;
    try {
      const respuesta = await funcionServicio();
      lista.value = propiedadDatos ? respuesta[propiedadDatos] : respuesta;
    } catch (error) {
      throw error;
    } finally {
      estaCargando.value = false;
    }
  };

  /**
   * filtra la lista segun la variable textoFiltro.
   */
  const filtrados = computed(() => {
    if (!textoFiltro.value) return lista.value;

    const filtro = textoFiltro.value.toLowerCase();

    return lista.value.filter((item) => {
      const nombre = (item.nombre || item.name || item.Nombre || "").toLowerCase();
      const apellido = (item.apellido || item.Apellido || "").toLowerCase();
      const documento = (item.documento || item.Documento || "").toString().toLowerCase();
      console.log(filtro);
      
      return nombre.includes(filtro) || apellido.includes(filtro) || documento.includes(filtro);
    });
  });

  return {
    lista,
    estaCargando,
    textoFiltro,
    cargar,
    filtrados,
  };
};

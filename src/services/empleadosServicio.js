import { obtenerDatosApi } from "./obtenerDatosApiServicio";

/**
 * @returns {Promise<Object>} Promesa con los empleados.
 */
export const obtenerEmpleados = async () => {
  return await obtenerDatosApi("empleados");
};

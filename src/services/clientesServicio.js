import { obtenerDatosApi } from "./obtenerDatosApiServicio";

/**
 * @returns {Promise<Object>} Promesa con los clientes.
 */
export const obtenerClientes = async () => {
  return await obtenerDatosApi("clientes");
};

import { obtenerDatosServicio } from "../obtenerDatosServicio";

/**
 * @returns {Promise<Object>} Promesa con los clientes.
 */
export const obtenerClientes = async () => {
  return await obtenerDatosServicio("clientes");
};

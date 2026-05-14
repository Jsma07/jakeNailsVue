import { obtenerDatosApi } from "./obtenerDatosApiServicio";

/**
 * @returns {Promise<Object>} Promesa con los administradores.
 */
export const obtenerUsuarios = async () => {
  return await obtenerDatosApi("users");
};

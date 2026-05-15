import { URL_API } from "../config/configuracioApi";
/**
 * Funcion generica para realizar peticiones GET a la API.
 * @param {String} recurso El recurso a consultar
 * @returns {Promise<Object>} Una promesa que resuelve con los datos de la API.
 */
export const obtenerDatosServicio = async (endpoint) => {
  try {
    const respuesta = await fetch(`${URL_API}${endpoint}`);
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status} al obtener ${endpoint}`);
    }

    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

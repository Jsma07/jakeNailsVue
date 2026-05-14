const URL_API = "http://localhost:5000/api/";

/**
 * Funcion generica para realizar peticiones GET a la API.
 * @param {String} recurso El recurso a consultar
 * @returns {Promise<Object>} Una promesa que resuelve con los datos de la API.
 */
export const obtenerDatosApi = async (recurso) => {
  try {
    const respuesta = await fetch(`${URL_API}${recurso}`);
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status} al obtener ${recurso}`);
    }

    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

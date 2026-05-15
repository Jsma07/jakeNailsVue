import { URL_API } from "../config/configuracioApi";
/**
 * @param {String} recurso El recurso a consultar
* @param {Object} data El dato a crear
*/
export const crearDatoServicio = async (endpoint, data) => {
  try {
    const respuesta = await fetch(`${URL_API}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status} al obtener ${endpoint}`);
    }

    return await respuesta.json();
  } catch (error) {
    throw error;
  }
};

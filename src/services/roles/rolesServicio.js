import { obtenerDatosServicio } from "../obtenerDatosServicio";

/**
 * @returns {Promise<Object>} promesa con los roles
 */

export const obtenerRoles = async() =>{
    return await obtenerDatosServicio("roles");
}
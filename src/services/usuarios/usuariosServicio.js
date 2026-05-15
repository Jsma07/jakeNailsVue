import { obtenerDatosServicio } from "../obtenerDatosServicio";

import { crearDatoServicio } from "../crearDatosServicio";
import { editarDatoServicio } from "../editarDatoServicio";

/**
 * @returns {Promise<Object>} Promesa con los administradores.
 */
export const obtenerUsuarios = async () => {
  try {
    return await obtenerDatosServicio("users");
  } catch (error) {
    throw error;
  }
};

/**
 * @param {Object} data Datos del nuevo administrador.
 * @returns {Promise<Object>} Promesa con la respuesta de la API.
 */
export const crearUsuario = async (data) => {
  try {
    return await crearDatoServicio("crearUsuario", data);
  } catch (error) {
    throw error;
  }
};

  /**
   * @param {Number} id ID del usuario a editar.
   * @param {Object} data Datos del usuario a editar.
   * @returns {Promise<Object>} Promesa con la respuesta de la API.
   */
  export const actualizarUsuario = async (id, data) => {
    try {
      return await editarDatoServicio("editarUsuario", id, data);
    } catch (error) {
      throw error;
    }
  };

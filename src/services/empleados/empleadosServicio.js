import { obtenerDatosServicio } from "../obtenerDatosServicio";
import { crearDatoServicio } from "../crearDatosServicio";
import { editarDatoServicio } from "../editarDatoServicio";


/**
 * @returns {Promise<Object>} Promesa con los empleados.
 */
export const obtenerEmpleados = async () => {
  try {
    return await obtenerDatosServicio("empleados");
  } catch (error) {
    throw error;
  }
};

/**
 * @param {Object} data Datos del nuevo empleado.
 * @returns {Promise<Object>} Promesa con la respuesta de la API.
 */

export const crearEmpleado = async (data) =>{

try {
  return await crearDatoServicio("empleados", data);
} catch (error) {
  throw error;
}
}

/**
 * @param {Number} id ID del empleado a editar
 * @param {Object} data Datos del empleado a editar
 * @returns { Promise<Object>} promesa con la respuesta de la API 
 */

export const actualizarEmpleado = async (id,data)=>{
  try {
    return await editarDatoServicio("editarEmpleado", id, data)
  } catch (error) {
    throw error;
  }
}

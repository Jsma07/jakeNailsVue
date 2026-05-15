import { URL_API } from "../config/configuracioApi";

/**
 * 
 * @param {Number} id ID del dato a editar
 * @param {Object} data Datos del dato a editar
 * 
 */

export const editarDatoServicio = async (endpoint, id, data) =>{
try {
    console.log(`${URL_API}${endpoint}/${id}`);
    
    const respuesta = await fetch(`${URL_API}${endpoint}/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if(!respuesta.ok){
    throw new Error(`Error HTTP: ${respuesta.status} al obtener ${endpoint}`);
    }
    return await respuesta.json()
} catch (error) {
    
}


}
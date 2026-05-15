import { defineStore } from "pinia";
import { actualizarUsuario, crearUsuario, obtenerUsuarios } from "../../services/usuarios/usuariosServicio";
import { useBaseAlmacen } from "../baseAlmacen";

export const useUsuariosAlmacen = defineStore("usuarios", () => {
  const base = useBaseAlmacen(obtenerUsuarios, "usuarios");
  const crearRegistro = async (data) =>{
    try {
      await crearUsuario(data);
      await base.cargar();
    } catch (error) {
      console.log("error al crear usuario:",error);
      
      throw error;
    }
  }

  const actualizarRegistro = async (id, data) => {
    try {
      await actualizarUsuario(id, data);
      await base.cargar();
    } catch (error) {      
      throw error;
    }
  };
  return {
    ...base,
    crearRegistro,
    actualizarRegistro,
  };

});




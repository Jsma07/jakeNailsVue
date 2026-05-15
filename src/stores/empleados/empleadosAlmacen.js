import { defineStore } from "pinia";
import { useBaseAlmacen } from "../baseAlmacen";
import {
  crearEmpleado,
  obtenerEmpleados,
  actualizarEmpleado
} from "../../services/empleados/empleadosServicio";

export const useEmpleadosAlmacen = defineStore("empleados", () => {
  const base = useBaseAlmacen(obtenerEmpleados);

  const crearRegistro = async (data) => {
    try {
      await crearEmpleado(data);
      await base.cargar();
    } catch (error) {
      throw error;
    }
  };

  const actualizarRegistro = async(id, data) =>{
    try {      
      await actualizarEmpleado(id, data)
      await base.cargar();
    } catch (error) {
      throw error
    }
  }

  return {
    ...base,
    crearRegistro,
    actualizarRegistro,
  };
});

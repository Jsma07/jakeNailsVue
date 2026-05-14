import { defineStore } from "pinia";
import { useBaseAlmacen } from "./baseAlmacen";
import { obtenerEmpleados } from "../services/empleadosServicio";


export const useEmpleadosAlmacen = defineStore("empleados", () => {
  const base = useBaseAlmacen(obtenerEmpleados);

  return {
    ...base,
  };
});

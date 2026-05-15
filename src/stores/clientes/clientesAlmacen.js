import { defineStore } from "pinia";
import { useBaseAlmacen } from "../baseAlmacen";
import { obtenerClientes } from "../../services/clientes/clientesServicio";


export const useClientesAlmacen = defineStore("clientes", () => {
  const base = useBaseAlmacen(obtenerClientes);

  return {
    ...base,
  };
});

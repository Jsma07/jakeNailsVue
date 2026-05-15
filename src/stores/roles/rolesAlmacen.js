import { defineStore } from "pinia";
import { obtenerRoles } from "../../services/roles/rolesServicio";
import { useBaseAlmacen } from "../baseAlmacen";

export const useRolesAlmacen = defineStore("roles", () => {
  const base = useBaseAlmacen(obtenerRoles);
  return {
    ...base,
  };
});

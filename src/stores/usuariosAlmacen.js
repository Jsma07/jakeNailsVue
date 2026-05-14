import { defineStore } from "pinia";
import { obtenerUsuarios } from "../services/usuariosServicio";
import { useBaseAlmacen } from "./baseAlmacen";

export const useUsuariosAlmacen = defineStore("usuarios", () => {
  const base = useBaseAlmacen(obtenerUsuarios, "usuarios");

  return {
    ...base,
  };
});

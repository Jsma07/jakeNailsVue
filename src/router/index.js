import { createRouter, createWebHistory } from "vue-router";
import Administradores from "../views/Usuarios/Administradores/Administradores.vue";
import Empleados from "../views/Usuarios/Empleados/Empleados.vue";
import Clientes from "../views/Usuarios/Clientes/Clientes.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/usuarios/administradores",
      name: "administradores",
      component: Administradores,
    },
     {
      path: "/usuarios/empleados",
      name: "empleados",
      component: Empleados,
    },
    {
      path: "/usuarios/clientes",
      name: "clientes",
      component: Clientes,
    },
  ],
});

export default router;

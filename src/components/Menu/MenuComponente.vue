<script setup>
import { ref } from "vue";

const emit = defineEmits(["alternar"]);

const subMenuAbierto = ref(false);
const menuColapsado = ref(false);

const toggleSubMenu = () => {
  if (menuColapsado.value) {
    toggleMenu();
  }
  subMenuAbierto.value = !subMenuAbierto.value;
};

const toggleMenu = () => {
  menuColapsado.value = !menuColapsado.value;
  emit("alternar", menuColapsado.value);
};
</script>

<template>
  <aside class="menu_lateral" :class="{ 'menu_lateral--colapsado': menuColapsado }">
    <div class="menu_lateral__cabecera">
      <h2 v-if="!menuColapsado" class="menu_lateral__marca">JK</h2>
      <button class="menu_lateral__alternador" @click="toggleMenu" title="Alternar menú">
        <i class="bi" :class="menuColapsado ? 'bi-list' : 'bi-text-indent-left'"></i>
      </button>
    </div>

    <nav class="menu_lateral__nav">
      <ul class="menu_lateral__lista">
        <!-- Ítem desplegable de Usuarios -->
        <li class="menu_lateral__item">
          <div 
            class="menu_lateral__enlace menu_lateral__enlace--desplegable" 
            :class="{ 'menu_lateral__enlace--abierto': subMenuAbierto && !menuColapsado }"
            @click="toggleSubMenu"
          >
            <i class="bi bi-people menu_lateral__icono"></i>
            <span v-if="!menuColapsado" class="menu_lateral__texto">Usuarios</span>
            <i v-if="!menuColapsado" class="bi bi-chevron-down menu_lateral__flecha"></i>
          </div>

          <!-- Submenú -->
          <ul v-show="subMenuAbierto && !menuColapsado" class="menu_lateral__submenu">
            <li class="menu_lateral__submenu-item">
              <router-link to="/usuarios/administradores" class="menu_lateral__submenu-enlace">
                <i class="bi bi-shield-lock menu_lateral__icono-mini"></i>
                Administradores
              </router-link>
            </li>
            <li class="menu_lateral__submenu-item">
              <router-link to="/usuarios/empleados" class="menu_lateral__submenu-enlace">
                <i class="bi bi-person-badge menu_lateral__icono-mini"></i>
                Empleados
              </router-link>
            </li>
            <li class="menu_lateral__submenu-item">
              <router-link to="/usuarios/clientes" class="menu_lateral__submenu-enlace">
                <i class="bi bi-person-heart menu_lateral__icono-mini"></i>
                Clientes
              </router-link>
            </li>
          </ul>
        </li>

        <!-- Otros ítems -->
        <li class="menu_lateral__item">
          <router-link to="/configuracion" class="menu_lateral__enlace">
            <i class="bi bi-gear menu_lateral__icono"></i>
            <span v-if="!menuColapsado" class="menu_lateral__texto">Configuración</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss">
@import "./MenuComponente.scss";
</style>

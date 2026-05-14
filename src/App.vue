<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import MenuComponente from './components/Menu/MenuComponente.vue';

const menuColapsado = ref(false);

const manejarAlternar = (estaColapsado) => {
  menuColapsado.value = estaColapsado;
};
</script>

<template>
  <div class="layout">
    <MenuComponente @alternar="manejarAlternar" />
    
    <main 
      class="layout__contenido" 
      :class="{ 'layout__contenido--expandido': menuColapsado }"
    >
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
  min-height: 100vh;

  &__contenido {
    flex: 1;
    margin-left: 280px; 
    transition: margin-left 0.3s ease;
    padding: 20px;
    background-color: #f8f9fa;

    &--expandido {
      margin-left: 80px; 
    }
  }
}

@media (max-width: 992px) {
  .layout__contenido {
    margin-left: 0 !important;
    padding: 10px;
    padding-top: 5rem;
  }
}
</style>

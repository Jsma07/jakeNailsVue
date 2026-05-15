<script setup>
import { computed } from "vue";
import { useToast } from "../../composables/useToast.js";

const { visible, mensaje, tipo, ocultar } = useToast();

const clasesTipo = computed(() => {
  const mapa = {
    exito: "toast_cuerpo--exito",
    error: "toast_cuerpo--error",
    advertencia: "toast_cuerpo--advertencia",
    info: "toast_cuerpo--info",
  };
  return mapa[tipo.value] ?? "toast_cuerpo--info";
});

const iconoTipo = computed(() => {
  const mapa = {
    exito: "bi-check-circle-fill",
    error: "bi-x-circle-fill",
    advertencia: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill",
  };
  return mapa[tipo.value] ?? "bi-bell-fill";
});
</script>

<template>
  <transition name="toast_transicion">
    <div v-if="visible" class="toast_contenedor">
      <div
        :class="['toast_cuerpo', clasesTipo]"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast_cuerpo__icono">
          <i :class="['bi', iconoTipo]"></i>
        </div>
        <p class="toast_cuerpo__mensaje">{{ mensaje }}</p>
        <button
          type="button"
          class="toast_cuerpo__cerrar"
          @click="ocultar"
          aria-label="Cerrar notificacion"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
@use './ToastComponente.scss';
</style>
<script setup>
import { ref, watch } from "vue";

const emits = defineEmits(["buscar"]);
const textoBusqueda = ref("");

const props = defineProps({
  placeholder: {
    type: String,
    required: true,
    default: "Buscar...",
  },
});

watch(textoBusqueda, (nuevoValor) => {
  emits("buscar", nuevoValor);
});
</script>

<template>
  <div class="busqueda">
    <i class="bi bi-search busqueda__icono"></i>
    <input
      class="busqueda__campo"
      type="text"
      :placeholder="placeholder"
      v-model="textoBusqueda"
    />
  </div>
</template>

<style lang="scss">
@use "./campoBusquedaComponente.scss";
</style>

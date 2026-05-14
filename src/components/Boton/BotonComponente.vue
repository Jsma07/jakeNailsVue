<script setup>
defineProps({
  texto: {
    type: String,
    default: ""
  },
  icono: {
    type: String,
    default: ""
  },
  tipo: {
    type: String,
    default: "primario" 
  }
});

defineEmits(["click"]);
</script>

<template>
  <button 
    class="boton" 
    :class="`boton--${tipo}`"
    @click="$emit('click')"
  >
    <i v-if="icono" :class="`bi bi-${icono} boton__icono`"></i>
    <span v-if="texto" class="boton__texto">{{ texto }}</span>
  </button>
</template>

<style lang="scss">
@import "./BotonComponente.scss";
</style>

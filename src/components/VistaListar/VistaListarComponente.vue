<script setup>
import CampoBusquedaComponente from "../CampoBusqueda/CampoBusquedaComponente.vue";
import BotonComponente from "../Boton/BotonComponente.vue";
import TablaComponente from "../Tabla/TablaComponente.vue";

defineProps({
  titulo: { type: String, required: true },
  subtitulo: { type: String, default: "" },
  icono: { type: String, default: "people-fill" },
  placeholderBusqueda: { type: String, default: "Buscar..." },
  textoBotonAccion: { type: String, default: "Agregar" },
  iconoBotonAccion: { type: String, default: "plus-lg" },
  estaCargando: { type: Boolean, default: false },
  columnas: { type: Array, required: true },
  datos: { type: Array, required: true }
});

defineEmits(["buscar", "accion"]);
</script>

<template>
  <div class="vista__listar">
    <header class="vista__listar__cabecera">
      <h1 class="vista__listar__titulo">
        <i :class="`bi bi-${icono} vista__listar__icono_titulo`"></i> 
        {{ titulo }}
      </h1>
      <p v-if="subtitulo" class="vista__listar__subtitulo">{{ subtitulo }}</p>
    </header>

    <main class="vista__listar__contenido">
      <div class="vista__listar__acciones">
        <CampoBusquedaComponente 
          :placeholder="placeholderBusqueda" 
          @buscar="$emit('buscar', $event)" 
        />
        <BotonComponente 
          :texto="textoBotonAccion" 
          :icono="iconoBotonAccion" 
          @click="$emit('accion')"
        />
      </div>

      <div v-if="estaCargando" class="vista__listar__cargando">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>

      <div v-else class="vista__listar__tabla">
        <TablaComponente :headers="columnas" :data="datos" />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@import "./VistaListarComponente.scss";
</style>

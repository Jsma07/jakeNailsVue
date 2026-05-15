<script setup>

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});
</script>
    
<template>

<div class="tabla">
    <table class=" table table-borderless table-hover">
    
        <thead class="tabla__encabezado">
            <tr>
                <th class="tabla__titulo" v-for="header in headers" :key="header.key">{{ header.columna }}</th>
                <th class="tabla__titulo">Acciones</th>
            </tr>
        </thead>
    
        <tbody>
            <tr v-for="(fila, indice) in data" :key="indice">
                <td v-for="(columna, index) in headers" :key="index">{{ fila[columna.key] }}</td>
                <td class="tabla__acciones">
                    <button class="tabla__accion tabla__accion--editar" @click="$emit('editar', fila)"><i class="bi bi-pencil-square"></i></button>
                    <!-- <button class="tabla__accion tabla__accion--eliminar" @click="$emit('eliminar', fila.id)"><i class="bi bi-trash"></i></button> -->
                </td>
            </tr>
        </tbody>
    </table>
</div>


</template>

<style lang="scss">
@use "./TablaComponente.scss";
</style>
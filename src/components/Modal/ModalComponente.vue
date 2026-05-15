<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  abierto: { type: Boolean, required: true },
  titulo: { type: String, default: "Formulario" },
  textoConfirmar: { type: String, default: "Guardar" },
  textoCancelar: { type: String, default: "Cancelar" }
});

const emit = defineEmits(["cerrar", "confirmar"]);

const cerrar = () => {  
  emit("cerrar");
};

const manejarScrollBody = (abrir) => {
  if (abrir) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

onMounted(() => {
  if (props.abierto) manejarScrollBody(true);
});

onUnmounted(() => {
  manejarScrollBody(false);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="abierto" class="modal__fondo" @click.self="cerrar">
        <div class="modal__contenedor">
          <header class="modal__cabecera">
            <h3 class="modal__titulo">{{ titulo }}</h3>
            <button class="modal__cerrar" @click="cerrar" title="Cerrar">
              <i class="bi bi-x-lg"></i>
            </button>
          </header>

          <main class="modal__cuerpo">
            <slot></slot>
          </main>

          <footer class="modal__pie">
            <button class="modal__boton modal__boton--cancelar" @click="cerrar">
              {{ textoCancelar }}
            </button>
            <button class="modal__boton modal__boton--confirmar" @click="$emit('confirmar')">
            <i class="bi bi-floppy"></i>  {{ textoConfirmar }}
            </button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@use "./ModalComponente.scss";
</style>

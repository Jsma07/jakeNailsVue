<script setup>
import { onMounted, computed } from "vue";
import { useClientesAlmacen } from "../../../stores/clientes/clientesAlmacen.js";
import VistaListarComponente from "../../../components/VistaListar/VistaListarComponente.vue";
import { logicaVista } from "../../../composables/logicaVista.js";
import ModalComponente from "../../../components/Modal/ModalComponente.vue";
import { useGestionUsuarios } from "../../../composables/useGestionUsuarios.js";

const clientesStore = useClientesAlmacen();

const { manejarBusqueda } = logicaVista(
  clientesStore,
  "Error al cargar clientes",
);

const { mostrarModal, formularioUsuario, abrirModalCrear, guardarUsuario } =
  useGestionUsuarios(clientesStore, 2);

const headersTabla = [
  { key: "documento_completo", columna: "Documento" },
  { key: "nombre_completo", columna: "Nombre Completo" },
  { key: "Correo", columna: "Correo Electrónico" },
  { key: "Telefono", columna: "Teléfono" },
  { key: "estado_texto", columna: "Estado" },
];

const clientesProcesados = computed(() => {
  return clientesStore.filtrados.map((cliente) => ({
    ...cliente,
    documento_completo: `${cliente.tipoDocumento} ${cliente.Documento}`,
    nombre_completo: `${cliente.Nombre} ${cliente.Apellido}`,
    estado_texto: cliente.Estado === 1 ? "Activo" : "Inactivo",
  }));
});

const manejarAccion = () => {
  console.log("Abrir modal de creación de cliente");
};

onMounted(async () => {
  try {
    await clientesStore.cargar();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <VistaListarComponente
    titulo="Gestión de clientes"
    subtitulo="Administra información de tus clientes y su historial de contacto"
    icono="people"
    placeholderBusqueda="Buscar cliente..."
    textoBotonAccion="Agregar"
    :estaCargando="clientesStore.estaCargando"
    :columnas="headersTabla"
    :datos="clientesProcesados"
    @buscar="manejarBusqueda"
    @accion="abrirModalCrear"
  />

  <ModalComponente
    :abierto="mostrarModal"
    titulo="Registrar Cliente"
    @cerrar="mostrarModal = false"
    @confirmar="guardarUsuario"
  >
    <div class="formulario">
      <div class="formulario__grupo">
        <label class="formulario__label">Tipo de Documento</label>
        <select
          class="formulario__select"
          v-model="formularioUsuario.tipoDocumento"
        >
          <option value="CC">CC</option>
          <option value="CE">CE</option>
          <option value="TI">TI</option>
        </select>
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Documento</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.Documento"
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Nombre</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.nombre"
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Apellido</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.apellido"
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Correo</label>
        <input
          class="formulario__input"
          type="email"
          v-model="formularioUsuario.correo"
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Teléfono</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.telefono"
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Dirección</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.direccion"
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Contraseña</label>
        <input
          class="formulario__input"
          type="password"
          v-model="formularioUsuario.contrasena"
        />
      </div>
    </div>
  </ModalComponente>
</template>

<style lang="scss"></style>

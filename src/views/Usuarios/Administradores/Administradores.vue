<script setup>
import { onMounted, computed } from "vue";
import { useUsuariosAlmacen } from "../../../stores/usuariosAlmacen";
import VistaListarComponente from "../../../components/VistaListar/VistaListarComponente.vue";
import ModalComponente from "../../../components/Modal/ModalComponente.vue";
import { logicaVista } from "../../../composables/logicaVista.js";
import { useGestionUsuarios } from "../../../composables/useGestionUsuarios.js";

const usuariosStore = useUsuariosAlmacen();

const { manejarBusqueda } = logicaVista(
  usuariosStore,
  "Error al cargar usuarios",
);

// Lógica de gestión 
const { 
  mostrarModal, 
  formularioUsuario, 
  abrirModalCrear, 
  guardarUsuario 
} = useGestionUsuarios(usuariosStore, 1); // ID Rol 1 para Administradores

const headersTabla = [
  { key: "documento_completo", columna: "Documento" },
  { key: "nombre_completo", columna: "Nombre Completo" },
  { key: "correo", columna: "Correo Electrónico" },
  { key: "telefono", columna: "Teléfono" },
  { key: "estado_texto", columna: "Estado" },
];

const usuariosProcesados = computed(() => {
  return usuariosStore.filtrados.map((usuario) => ({
    ...usuario,
    documento_completo: `${usuario.tipoDocumento} ${usuario.Documento}`,
    nombre_completo: `${usuario.nombre} ${usuario.apellido}`,
    estado_texto: usuario.estado === 1 ? "Activo" : "Inactivo",
  }));
});

onMounted(async () => {
  try {
    await usuariosStore.cargar();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <VistaListarComponente 
    titulo="Gestión de administradores"
    subtitulo="Administra usuarios con acceso de administrador y sus roles"
    icono="people-fill"
    placeholderBusqueda="Buscar administrador..."
    textoBotonAccion="Agregar"
    :estaCargando="usuariosStore.estaCargando"
    :columnas="headersTabla"
    :datos="usuariosProcesados"
    @buscar="manejarBusqueda"
    @accion="abrirModalCrear"
  />

  <ModalComponente
    :abierto="mostrarModal"
    titulo="Registrar Administrador"
    @cerrar="mostrarModal = false"
    @confirmar="guardarUsuario"
  >
    <div class="formulario">
      <div class="formulario__grupo">
        <label class="formulario__label">Tipo de Documento</label>
        <select class="formulario__select" v-model="formularioUsuario.tipoDocumento">
          <option value="CC">CC</option>
          <option value="CE">CE</option>
          <option value="TI">TI</option>
        </select>
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Rol</label>
        <select class="formulario__select" v-model="formularioUsuario.rolId">
          <option selected="true" value="1">Administrador</option>
          <option value="2">Usuario</option>
        </select>
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Documento</label>
        <input class="formulario__input" type="text" v-model="formularioUsuario.Documento">
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Nombre</label>
        <input class="formulario__input" type="text" v-model="formularioUsuario.nombre">
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Apellido</label>
        <input class="formulario__input" type="text" v-model="formularioUsuario.apellido">
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Correo</label>
        <input class="formulario__input" type="email" v-model="formularioUsuario.correo">
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Teléfono</label>
        <input class="formulario__input" type="text" v-model="formularioUsuario.telefono">
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Contraseña</label>
        <input class="formulario__input" type="password" v-model="formularioUsuario.contrasena">
      </div>

     
      
    </div>
  </ModalComponente>
</template>
<style lang="scss">
@import './Administradores.scss';
</style>

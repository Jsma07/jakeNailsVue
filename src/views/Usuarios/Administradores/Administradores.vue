<script setup>
import { onMounted, computed } from "vue";
import { useUsuariosAlmacen } from "../../../stores/usuarios/usuariosAlmacen.js";
import VistaListarComponente from "../../../components/VistaListar/VistaListarComponente.vue";
import ModalComponente from "../../../components/Modal/ModalComponente.vue";
import { logicaVista } from "../../../composables/logicaVista.js";
import { useGestionUsuarios } from "../../../composables/useGestionUsuarios.js";
// import { useRolesAlmacen } from "../../../stores/roles/rolesAlmacen.js";

const usuariosStore = useUsuariosAlmacen();
// const rolesStore = useRolesAlmacen();

const { manejarBusqueda } = logicaVista(
  usuariosStore,
  "Error al cargar usuarios",
);
const {
  mostrarModal,
  formularioUsuario,
  abrirModalCrear,
  abrirModalEditar,
  guardarUsuario,
  editando
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

// const rolesProcesados = computed(() => {
//   return rolesStore.lista.map((rol) => ({
//     ...rol,
//     estado_texto: rol.estadoRol === 1 ? "Activo" : "Inactivo",
//   }));
// });

onMounted(async () => {
  try {
    await Promise.all([usuariosStore.cargar()]);
  } catch (error) {
    console.error("Error al cargar datos:", error);
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
    @editar="abrirModalEditar"
  />

  <ModalComponente
    :abierto="mostrarModal"
    :titulo="editando ? 'Editar Administrador' : 'Registrar Administrador'"
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
          <option class="formulario__option" value="C.C">
            Cédula de Ciudadanía
          </option>
          <option class="formulario__option" value="C.E">
            Cédula de Extranjería
          </option>
          <option class="formulario__option" value="T.I">
            Tarjeta de Identidad
          </option>
        </select>
      </div>

      <div class="formulario__grupo formulario__grupo--oculto">
        <label class="formulario__label">Rol</label>
        <select
          class="formulario__select"
          v-model="formularioUsuario.idRol"
          disabled
        >
          <option class="formulario__option" :value="1">Administrador</option>
        </select>
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Documento</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.documento"
          placeholder="Escribe tu documento..."
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Nombre</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.nombre"
          placeholder="Escribe tu nombre..."
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Apellido</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.apellido"
          placeholder="Escribe tu apellido..."
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Correo</label>
        <input
          class="formulario__input"
          type="email"
          v-model="formularioUsuario.correo"
          placeholder="Escribe tu correo..."
        />
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Teléfono</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.telefono"
          placeholder="Escribe tu teléfono..."
        />
      </div>

      <div class="formulario__grupo"></div>
    </div>
  </ModalComponente>
</template>
<style lang="scss">
@use "./Administradores.scss";
</style>

<script setup>
import { onMounted, computed } from "vue";
import { useEmpleadosAlmacen } from "../../../stores/empleados/empleadosAlmacen.js";
import VistaListarComponente from "../../../components/VistaListar/VistaListarComponente.vue";
import { logicaVista } from "../../../composables/logicaVista.js";
import { useGestionUsuarios } from "../../../composables/useGestionUsuarios.js";
import ModalComponente from "../../../components/Modal/ModalComponente.vue";
import { useRolesAlmacen } from "../../../stores/roles/rolesAlmacen.js";

const empleadosStore = useEmpleadosAlmacen();
const rolesStore = useRolesAlmacen();

const { manejarBusqueda } = logicaVista(
  empleadosStore,
  "Error al cargar empleados",
);

const {
  mostrarModal,
  formularioUsuario,
  abrirModalCrear,
  abrirModalEditar,
  guardarUsuario,
  editando,
} = useGestionUsuarios(empleadosStore, 3);

const headersTabla = [
  { key: "documento_completo", columna: "Documento" },
  { key: "cargo", columna: "Cargo" },
  { key: "nombre_completo", columna: "Nombre Completo" },
  { key: "Correo", columna: "Correo Electrónico" },
  { key: "Telefono", columna: "Teléfono" },
  { key: "estado_texto", columna: "Estado" },
];

const empleadosProcesados = computed(() => {
  return empleadosStore.filtrados.map((empleado) => ({
    ...empleado,
    documento_completo: `${empleado.Tip_Documento} ${empleado.Documento}`,
    nombre_completo: `${empleado.Nombre} ${empleado.Apellido}`,
    cargo: empleado.role?.nombre || "N/A",
    estado_texto: empleado.Estado === 1 ? "Activo" : "Inactivo",
  }));
});

const rolesProcesados = computed(() => {
  return rolesStore.lista
    .filter((rol) => rol.idRol !== 1 && rol.idRol !== 2)
    .map((rol) => ({
      ...rol,
      estado_texto: rol.estadoRol === 1 ? "Activo" : "Inactivo",
    }));
});

onMounted(async () => {
  try {
    await empleadosStore.cargar();
    await rolesStore.cargar();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <VistaListarComponente
    titulo="Gestión de empleados"
    subtitulo="Administra la información del personal y sus cargos asignados"
    icono="person-badge"
    placeholderBusqueda="Buscar empleado..."
    textoBotonAccion="Agregar"
    :estaCargando="empleadosStore.estaCargando"
    :columnas="headersTabla"
    :datos="empleadosProcesados"
    @buscar="manejarBusqueda"
    @accion="abrirModalCrear"
    @editar="abrirModalEditar"
  />

  <ModalComponente
    :abierto="mostrarModal"
    :titulo="editando ? 'Editar Empleado' : 'Registrar Empleado'"
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
      <div class="formulario__grupo">
        <label class="formulario__label">Documento</label>
        <input
          class="formulario__input"
          type="text"
          v-model="formularioUsuario.documento"
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
      <div class="formulario__grupo ">
        <label class="formulario__label">Cargo</label>
        <select
          class="formulario__select"
          v-model="formularioUsuario.idRol"
          
        >
         <option 
         v-for="rol in rolesProcesados" 
         :key="rol.idRol" 
         :value="rol.idRol"
         >
        {{ rol.nombre }}  
        </option>
        </select>
      </div>

    </div>
  </ModalComponente>
</template>

<style lang="scss"></style>

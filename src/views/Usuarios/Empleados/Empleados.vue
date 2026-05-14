<script setup>
import { onMounted, computed } from "vue";
import { useEmpleadosAlmacen } from "../../../stores/empleadosAlmacen";
import VistaListarComponente from "../../../components/VistaListar/VistaListarComponente.vue";
import { logicaVista } from "../../../composables/logicaVista.js";
import { useGestionUsuarios } from "../../../composables/useGestionUsuarios.js";
import ModalComponente from "../../../components/Modal/ModalComponente.vue";


const empleadosStore = useEmpleadosAlmacen();

const { manejarBusqueda } = logicaVista(
  empleadosStore,
  "Error al cargar empleados",
);


const { 
  mostrarModal, 
  formularioUsuario, 
  abrirModalCrear, 
  guardarUsuario 
} = useGestionUsuarios(empleadosStore, 3); 



const headersTabla = [
  { key: "documento_completo", columna: "Documento" },
  { key: "nombre_completo", columna: "Nombre Completo" },
  { key: "cargo", columna: "Cargo" },
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

const manejarAccion = () => {
  console.log("Abrir modal de creación de empleado");
};

onMounted(async () => {
  try {
    await empleadosStore.cargar();
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
  />


  <ModalComponente
    :abierto="mostrarModal"
    titulo="Registrar Empleado"
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
        <label class="formulario__label">Dirección</label>
        <input class="formulario__input" type="text" v-model="formularioUsuario.direccion">
      </div>

      <div class="formulario__grupo">
        <label class="formulario__label">Contraseña</label>
        <input class="formulario__input" type="password" v-model="formularioUsuario.contrasena">
      </div>

     
      
    </div>
  </ModalComponente>
</template>

<style lang="scss">
</style>

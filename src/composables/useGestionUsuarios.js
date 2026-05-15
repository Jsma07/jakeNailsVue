import { ref } from "vue";
import { useToast } from "./useToast.js";
import {
  correoValido,
  campoVacio,
  telefonoValido,
  documentoValido,
  nombreCompletoValido,
} from "../utils/validaciones.js";

/**
 * Composable para gestionar la lógica de creación y edición de usuarios.
 * @param {Object} almacen El almacen de Pinia correspondiente (usuarios, empleados, clientes).
 * @param {Number} idRol El ID del rol por defecto para esta vista.
 */
export const useGestionUsuarios = (almacen, idRol) => {
  const { mostrarToast } = useToast();
  const mostrarModal = ref(false);
  const editando = ref(false);
  const usuarioId = ref(null);

  // Modelo reactivo para el formulario
  const formularioUsuario = ref({
    tipoDocumento: "C.C",
    documento: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    idRol: idRol,
    estado: 1,
  });

  const abrirModalCrear = () => {
    editando.value = false;
    usuarioId.value = null;
    formularioUsuario.value = {
      tipoDocumento: "C.C",
      documento: "",
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      direccion: "",
      idRol: idRol,
      estado: 1,
    };
    mostrarModal.value = true;
  };

  /**
   * Abre el modal en modo edición con los datos del usuario seleccionado.
   * @param {Object} usuario Datos del usuario a editar.
   */
  const abrirModalEditar = (usuario) => {
    
    editando.value = true;
    usuarioId.value = usuario.IdEmpleado || usuario.IdCliente || usuario.id;

    formularioUsuario.value = {
      tipoDocumento: usuario.tipoDocumento || usuario.Tip_Documento,
      documento: usuario.Documento || usuario.documento,
      nombre: usuario.Nombre || usuario.nombre,
      apellido: usuario.Apellido || usuario.apellido,
      correo: usuario.Correo || usuario.correo,
      telefono: usuario.Telefono || usuario.telefono,
      idRol: usuario.IdRol || usuario.idRol,
      estado: usuario.Estado || usuario.estado,
    };
        mostrarModal.value = true;
  };

  const guardarUsuario = async () => {
    try {
      const errorValidacion =
        campoVacio(
          formularioUsuario.value.tipoDocumento,
          "Tipo de documento",
        ) ||
        campoVacio(formularioUsuario.value.documento, "Documento") ||
        documentoValido(formularioUsuario.value.documento) ||
        campoVacio(formularioUsuario.value.nombre, "Nombre") ||
        nombreCompletoValido(formularioUsuario.value.nombre, "Nombre") ||
        campoVacio(formularioUsuario.value.apellido, "Apellido") ||
        nombreCompletoValido(formularioUsuario.value.apellido, "Apellido") ||
        campoVacio(formularioUsuario.value.correo, "Correo") ||
        correoValido(formularioUsuario.value.correo) ||
        campoVacio(formularioUsuario.value.telefono, "Teléfono") ||
        telefonoValido(formularioUsuario.value.telefono);

      if (errorValidacion) {
        mostrarToast(errorValidacion, "error");
        return;
      }
      if (editando.value) {
        try {
          await almacen.actualizarRegistro(
            usuarioId.value,
            formularioUsuario.value,
          );
          mostrarToast("Registro actualizado correctamente", "exito");
          mostrarModal.value = false;
        } catch (error) {
          mostrarToast("Error al actualizar el registro", "error");
          console.log(error);
        }
      } else {
        try {
          await almacen.crearRegistro(formularioUsuario.value);
          mostrarToast("Registro guardado correctamente", "exito");
          mostrarModal.value = false;
        } catch (error) {
          mostrarToast("Error al guardar el registro", "error");
          console.log(error);
        }
      }

      mostrarModal.value = false;
      await almacen.cargar();
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    mostrarModal,
    formularioUsuario,
    editando,
    abrirModalCrear,
    abrirModalEditar,
    guardarUsuario,
  };
};

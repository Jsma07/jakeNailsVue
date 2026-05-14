import { ref } from "vue";

/**
 * Composable para gestionar la lógica de creación y edición de usuarios.
 * @param {Object} almacen El almacen de Pinia correspondiente (usuarios, empleados, clientes).
 * @param {Number} idRol El ID del rol por defecto para esta vista.
 */
export const useGestionUsuarios = (almacen, idRol) => {
  const mostrarModal = ref(false);
  const editando = ref(false);
  const usuarioId = ref(null);

  // Modelo reactivo para el formulario
  const formularioUsuario = ref({
    tipoDocumento: "CC",
    Documento: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    idRol: idRol,
    Estado: 1,
    contrasena: ""
  });


  const abrirModalCrear = () => {
    editando.value = false;
    usuarioId.value = null;
    formularioUsuario.value = {
      tipoDocumento: "CC",
      Documento: "",
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      direccion: "",
      idRol: idRol,
      Estado: 1,
      contrasena: ""
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
      Documento: usuario.Documento,
      Nombre: usuario.Nombre || usuario.nombre,
      Apellido: usuario.Apellido || usuario.apellido,
      Correo: usuario.Correo || usuario.correo,
      Telefono: usuario.Telefono || usuario.telefono,
      IdRol: usuario.IdRol,
      Estado: usuario.Estado || usuario.estado,
      Contrasena: "" // La contraseña no se edita aquí por seguridad
    };
    
    mostrarModal.value = true;
  };


  const guardarUsuario = async () => {
    try {
      if (editando.value) {
        // console.log("Lógica para actualizar usuario", usuarioId.value);
        // await almacen.actualizar(usuarioId.value, formularioUsuario.value);
      } else {
        // console.log("Lógica para crear usuario", formularioUsuario.value);
        // await almacen.crear(formularioUsuario.value);
      }
      
      mostrarModal.value = false;
      await almacen.cargar(); 
      return true;
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      return false;
    }
  };

  return {
    mostrarModal,
    formularioUsuario,
    editando,
    abrirModalCrear,
    abrirModalEditar,
    guardarUsuario
  };
};

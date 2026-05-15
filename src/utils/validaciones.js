export const correoValido = (correo) => {
  const validacion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  if (!validacion) {
    return "Correo inválido: debe contener @ y .";
  }
};

export const campoVacio = (campo, nombreCampo = "El campo") => {
  if (
    campo === null ||
    campo === undefined ||
    String(campo).trim() === ""
  ) {
    return `${nombreCampo} es obligatorio`;
  }
};

export const telefonoValido = (telefono) => {
  const validacionTelefono = /^[0-9]{7,15}$/.test(telefono);
  if (!validacionTelefono) {
    return "Teléfono inválido: debe contener solo números y tener entre 7 y 15 dígitos";
  }
};

export const documentoValido = (documento) => {
  const validacionDocumento = /^\d{1,10}$/.test(documento);
  if (!validacionDocumento) {
    return "Documento inválido";
  }
};

export const nombreCompletoValido = (name, nombreCampo = "Nombre o apellido") => {
  const validacionNombreCompleto = /^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(name);
  if (!validacionNombreCompleto) {
    return `${nombreCampo} inválido: contiene caracteres especiales o números`;
  }
};

export const contrasenaValida = (contrasena) => {
  const validacionContrasena = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(contrasena);
  if (!validacionContrasena) {
    return "Contraseña inválida: debe contener al menos una mayúscula, un número y tener mínimo 8 carácteres";
  }
};


  export const iniciarSesion = async (correo, contrasena) => {
    try {
      const response = await axios.post("/iniciarSesion", {
        email,
        contrasena,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

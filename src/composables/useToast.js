import { ref } from "vue";

const visible = ref(false);
const mensaje = ref("");
const tipo = ref("exito"); // exito | error | advertencia | info

let temporizador = null;

/**
 * Composable para mostrar notificaciones tipo toast.
 * @returns {Object} Estado y acciones del toast.
 */
export const useToast = () => {
  /**
   * Muestra el toast con un mensaje y tipo específico.
   * @param {String} nuevoMensaje El texto a mostrar.
   * @param {String} nuevoTipo El tipo: 'exito' | 'error' | 'advertencia' | 'info'.
   * @param {Number} duracion Duración en ms antes de ocultarse .
   */
  const mostrarToast = (nuevoMensaje, nuevoTipo = "exito", duracion = 4000) => {
    if (temporizador) clearTimeout(temporizador);

    mensaje.value = nuevoMensaje;
    tipo.value = nuevoTipo;
    visible.value = true;

    temporizador = setTimeout(() => {
      visible.value = false;
      temporizador = null;
    }, duracion);
  };

  const ocultar = () => {
    visible.value = false;
    if (temporizador) {
      clearTimeout(temporizador);
      temporizador = null;
    }
  };

  return { visible, mensaje, tipo, mostrarToast, ocultar };
};

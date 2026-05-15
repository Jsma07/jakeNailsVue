# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

secuencia
Vista ➡️ Composable ➡️ Store (Almacén) ➡️ Servicio ➡️ Store ➡️ Vista.

Aquí te detallo el paso a paso de lo que ocurre cuando le das al botón de "Guardar":

La Vista (Administradores.vue):

Detecta que el usuario hizo clic en el botón de guardar.
Llama a la función guardarUsuario que le proporcionó el Composable.
El Composable (useGestionUsuarios):

Recibe la acción.
Se encarga de la lógica de interfaz: valida que los campos no estén vacíos y muestra errores si los hay.
Si todo está correcto, llama a la función de crear que está en el Store (Almacén) (ej. almacen.crearAdministrador(datos)).
El Store (usuariosAlmacen.js):

Recibe la orden de crear un administrador.
Llama a la función correspondiente en el Servicio (ej. crearUsuario(datos)).
El Servicio (usuariosServicio.js ➡️ crearDatosServicio.js):

Toma los datos, los convierte a JSON y hace la petición HTTP (POST) al backend.
Espera la respuesta del backend (ej. un 201 Created).
Le devuelve esa respuesta al Store.
El Store (de regreso):

Ve que la petición fue exitosa.
Como acaba de crearse un usuario nuevo en la base de datos real, el Store actualiza su propia lista en memoria (generalmente volviendo a consultar la lista con base.cargar() o agregando el nuevo usuario al array).
Le avisa al Composable que todo salió bien.
El Composable (de regreso al final):

Al saber que se guardó con éxito en el backend y en el Store, cierra el modal automáticamente y limpia los campos del formulario para que quede listo para la próxima vez.
Puede disparar una alerta (Toast) de "¡Usuario creado exitosamente!".

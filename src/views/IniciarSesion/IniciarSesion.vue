<script setup>
import BotonComponente from "../../components/Boton/BotonComponente.vue";
import CampoTextoComponente from "../../components/CampoTexto/CampoTextoComponente.vue";
</script>

<template>
  <div class="iniciar_sesion">
  <div class="iniciar_sesion__contenedor">
    
    <div class="iniciar_sesion__logo">

        <div class="iniciar_sesion__titulo">Iniciar Sesión</div>
    </div>

    <div class="iniciar_sesion__cuerpo"> 
      <form class="iniciar_sesion__formulario">
        
        <div class="iniciar_sesion__campo"> 
          <CampoTextoComponente type="email" label="Usuario:" placeholder="Escribe tu correo..." />
        </div>

        <div class="iniciar_sesion__campo">
          <CampoTextoComponente type="password" label="Contraseña:" placeholder="Escribe tu contraseña..." />
        </div>

        <BotonComponente texto="Iniciar Sesión" type="submit"></BotonComponente>
      </form>
    </div>

  </div>
</div>
</template>

<style lang="scss">
@use "./IniciarSesion.scss";
</style>

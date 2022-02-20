<template>
  <div class="container-block">
    <div class="block-a">
      <div class="block-a__title">
        Video Conferencias Premium.
        Ahora gratis para todos.
      </div>
      <div class="block-a__subtitle">
        Rediseñamos Google&nbsp;Meet, nuestro servicio de reuniones de negocios seguras, de modo que sea gratuito y esté
        disponible para todos.
      </div>
      <handlemeets class="block-a__buttons" />
    </div>
    <div class="block-b">
      <img
        alt=""
        class="full-width"
        src="https://static3.elcorreo.com/www/multimedia/202103/15/media/cortadas/videollamada-mejores-herramientas-kn5G-U1008916645849gE-1248x770@El%20Correo-krxC-U130834145514E0E-1248x770@El%20Correo.png"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Handlemeets from 'pages/home/components/handlemeets.vue'

export default defineComponent({
  name: 'PageHome',
  components: { Handlemeets }
})
</script>

<style lang="sass" scoped>

.container-block

  .block-a
    text-align: center
    padding: 5%

    &__title
      font-size: 4rem
      line-height: 4.3rem
      padding-bottom: 2rem

    &__subtitle
      font-size: 2rem
      line-height: 2.2rem
      padding-bottom: 2.5rem
      color: gray

  .block-b
    padding: 5%

@media only screen and (min-width: 600px) and (max-width: 960px)
  .container-block
    padding-left: 12%
    padding-right: 12%

    .block-b
      padding: 2% 10% 2% 10%

@media only screen and (min-width: 960px)
  .container-block
    display: flex
    flex-direction: row
    height: 100%
    min-height: 93vh
    justify-content: space-around

    .block-a, .block-b
      width: 45%
      text-align: left
      display: flex
      flex-direction: column
      justify-content: center
      padding: 3%
</style>

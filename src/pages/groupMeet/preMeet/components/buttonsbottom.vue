<template>
  <div class="container-buttons">
    <micro class="container-buttons__button" />
    <camera class="container-buttons__button" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Micro from 'pages/groupMeet/shared/components/buttonMicro.vue'
import Camera from 'pages/groupMeet/shared/components/buttonCamera.vue'

export default defineComponent({
  name: 'PreMeetButtonsBottom',
  components: {
    Camera,
    Micro
  }
})
</script>

<style lang="sass" scoped>
.container-buttons
  padding: 15px 2%
  display: flex
  flex-direction: row
  justify-content: center

  &__button
    margin-left: 10px
    margin-right: 10px

</style>

<template>
  <div
    :class="{'class-item':true, 'class-item--active':isActive, 'class-item--inactive':!isActive}"
    @click.prevent="isActive=!isActive"
  >
    <q-icon
      name="screen_share"
      color="white"
      size="sm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ButtonSharePantalla',
  setup () {
    const isActive = ref(false)

    return {
      isActive
    }
  }
})
</script>

<style lang="sass" scoped>
.class-item
  border-radius: 50%
  display: inline-flex
  padding: 1.4rem
  cursor: pointer
  transition: ease-in all 0.2s

  &--active
    border: 2px solid white

  &--inactive
    background: #d93025
    border: 2px solid #d93025

  &:hover
    opacity: 0.8
</style>

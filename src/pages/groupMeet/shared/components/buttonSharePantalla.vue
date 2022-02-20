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
import { defineComponent, ref, watch, nextTick } from 'vue'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'ButtonSharePantalla',
  setup () {
    const isActive = ref(false)
    const $store = useStore()

    watch(isActive, async (newVal) => {
      if (newVal) {
        await $store.dispatch('groupMeetModule/openMonitor')
        void nextTick(() => {
          if ($store.state.groupMeetModule.myStream.streamMonitor) {
            $store.state.groupMeetModule.myStream.streamMonitor.getVideoTracks()[0].onended = () => {
              void $store.dispatch('groupMeetModule/closeMonitor').then(() => 1 + 2)
              isActive.value = false
            }
          }
        })
      } else {
        void await $store.dispatch('groupMeetModule/closeMonitor')
      }
    }, {
      immediate: true
    })

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

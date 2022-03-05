<template>
  <icon-microphone
    @click.prevent="$emit('update:isAudioActive', !isAudioActive)"
    :is-active="isAudioActive"
    style="cursor:pointer;"
    type="control"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconMicrophone from 'components/icons/iconMicrophone.vue'

export default defineComponent({
  name: 'ButtonMicro',
  components: { IconMicrophone },
  props: {
    isAudioActive: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: {
    'update:isAudioActive' (payload: any) {
      return typeof payload === 'boolean'
    }
  }
})
</script>

<style lang="sass" scoped>

</style>

<template>
  <div
    :class="{'microphone':true, 'microphone--active':isActive, 'microphone--inactive':!isActive}"
  >
    <svg
      v-show="isActive"
      fill="white"
      focusable="false"
      :height="heightIcon"
      :viewBox="`0 0 ${heightIcon} ${heightIcon}`"
      :width="heightIcon"
    >
      <path
        d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"
      />
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
    <svg
      v-show="!isActive"
      fill="white"
      focusable="false"
      :height="heightIcon"
      :viewBox="`0 0 ${heightIcon} ${heightIcon}`"
      :width="heightIcon"
    >
      <path
        d="M11 5c0-.55.45-1 1-1s1 .45 1 1v5.17l1.82 1.82c.11-.31.18-.64.18-.99V5c0-1.66-1.34-3-3-3S9 3.34 9 5v1.17l2 2V5zM2.81 2.81L1.39 4.22l11.65 11.65c-.33.08-.68.13-1.04.13-2.76 0-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c.57-.08 1.12-.24 1.64-.46l5.14 5.14 1.41-1.41L2.81 2.81zM19 11h-2c0 .91-.26 1.75-.69 2.48l1.46 1.46A6.921 6.921 0 0 0 19 11z"
      />
    </svg>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'IconMicrophone',
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false
    },
    type: {
      type: String as PropType<'control'|'icon'>,
      required: true,
      validator: (val:string) => ['control', 'icon'].includes(val)
    }
  },
  data () {
    return {
      padding: this.type === 'control' ? '14px' : '0px',
      heightIcon: '24',
      borderRadius: this.type === 'control' ? '50%' : '50%'
    }
  },
  methods: {

  }
})
</script>

<style lang="sass" scoped>
.microphone
  border-radius: v-bind(borderRadius)
  display: inline-flex
  padding: v-bind(padding)
  transition: ease-in all 0.2s
  &--active
    border: 2px solid white
  &--inactive
    background: #d93025
    border: 2px solid #d93025
  &:hover
    opacity: 0.8
</style>

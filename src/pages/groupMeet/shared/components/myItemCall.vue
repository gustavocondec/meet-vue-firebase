<template>
  <div class="my-item-call">
    <div class="container">
      <video
        class="container__video"
        ref="videoDoc"
        autoplay
        :controls="false"
        playsinline
      />
      <div
        v-show="!
          videoIsActive"
        class="container__video--inactive"
      >
        Sin video
      </div>
      <audio
        v-if="type==='remote'"
        v-show="false"
        ref="audioDoc"
        autoplay
        :controls="false"
      />
      <icon-microphone
        class="container__icon-microphone"
        :is-active="audioIsActive"
        type="icon"
      />
      <p
        class="container__name"
        v-show="name"
      >
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch, onMounted } from 'vue'
import IconMicrophone from 'components/icons/iconMicrophone.vue'
export default defineComponent({
  components: { IconMicrophone },
  inheritAttrs: false,
  name: 'MyItemCall',
  props: {
    streamAudio: {
      type: [Object, null] as PropType<MediaStream| null>,
      required: false,
      default: null
    },
    streamVideo: {
      type: [Object, null] as PropType<MediaStream| null>,
      required: true,
      default: null
    },
    name: {
      type: String,
      required: true,
      default: 'Tú'
    },
    type: {
      type: String as PropType<'local|remote'>,
      default: 'remote',
      required: true,
      validator: (val:string) => ['remote', 'local'].includes(val)
    }
  },
  setup (props) {
    const videoDoc = ref<HTMLVideoElement | null>(null)
    const audioDoc = ref<HTMLAudioElement | null>(null)
    const audioIsActive = ref(false)
    const videoIsActive = ref(false)
    const { streamVideo, streamAudio } = toRefs(props)
    onMounted(() => {
      if (videoDoc.value && audioDoc.value) {
        console.log('onMounter myItemCall', streamVideo.value)
        videoDoc.value.srcObject = streamVideo.value
        audioDoc.value.srcObject = streamAudio.value
        videoIsActive.value = !!streamVideo.value
        audioIsActive.value = !!streamAudio.value
      }
    })
    watch(streamVideo, (newVal) => {
      console.log('Cambia streamVideo', newVal)
      videoIsActive.value = !!newVal
      if (videoDoc.value) {
        videoDoc.value.srcObject = streamVideo.value
      }
    }, {
      deep: true,
      immediate: true
    })

    watch(streamAudio, (newVal) => {
      console.log('Cambia streamAudio', newVal)
      audioIsActive.value = !!streamAudio.value
      if (audioDoc.value) {
        audioDoc.value.srcObject = streamAudio.value
      }
    },
    {
      deep: true,
      immediate: true
    })

    return {
      videoIsActive,
      audioIsActive,
      videoDoc,
      audioDoc
    }
  }
})
</script>

<style lang="sass" scoped>
.my-item-call
  width: 100%
  height: 100%
  max-height: 80vh
  overflow: hidden
.container
  display: block
  height: 100%
  width: 100%
  position: relative
  &__video
    width: 100% !important
    height: auto !important
    max-height: 100%
    border-radius: 10px
  &__icon-microphone
    position: absolute
    top: 1.5%
    right: 1.5%
  &__video--inactive
    position: absolute
    top: 0
    left: 0
    background: #4a4e51
    color: white
    width: 100%
    height: 100%
    border-radius: 10px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    font-size: 20px
  &__name
    color: white
    font-weight: bold
    padding-bottom: 0
    margin-bottom: 0
    position: absolute
    left: 1.5%
    bottom: 1.5%
</style>

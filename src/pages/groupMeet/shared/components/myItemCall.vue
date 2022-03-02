<template>
  <div class="my-item-call">
    <p
      class="name"
      v-show="name"
    >
      {{ name }}
    </p>
    <div class="container">
      <video
        class="container__video"
        ref="videoDoc"
        autoplay
        :controls="false"
        playsinline
        style="width: 100%;"
      />
      <audio
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
      required: true,
      default: null
    },
    streamVideo: {
      type: [Object, null] as PropType<MediaStream| null>,
      required: true,
      default: null
    },
    name: {
      type: String,
      default: 'Tú'
    }
  },
  setup (props) {
    const videoDoc = ref<HTMLVideoElement | null>(null)
    const audioDoc = ref<HTMLAudioElement | null>(null)
    const audioIsActive = ref(false)
    const { streamVideo } = toRefs(props)

    onMounted(() => {
      if (videoDoc.value) {
        videoDoc.value.srcObject = streamVideo.value
      }
    })
    watch(streamVideo, (newVal) => {
      console.log('Cambia streamVideo', newVal)
      if (videoDoc.value) {
        videoDoc.value.srcObject = streamVideo.value
      }
    }, {
      deep: true,
      immediate: true
    })

    // watch(() => props.streamAudio, () => {
    //   if (audioDoc.value) {
    //     if (props.streamAudio) {
    //       audioDoc.value.srcObject = props.streamAudio
    //     }
    //   }
    // },
    // {
    //   deep: true,
    //   immediate: true
    // })

    return {
      audioIsActive,
      videoDoc,
      audioDoc
    }
  }
})
</script>

<style lang="sass" scoped>
.my-item-call
  .name
    color: white
    padding-bottom: 0
    margin-bottom: 0
  .container
    position: relative
    &__video
      border-radius: 10px
    &__icon-microphone
      position: absolute
      top: 1%
      right: 1%
</style>

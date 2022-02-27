<template>
  <div>
    <p
      v-show="name"
      style="background: white"
    >
      {{ name }}
    </p>
    <video
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, watch, nextTick } from 'vue'
export default defineComponent({
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
      default: ''
    }
  },
  setup (props) {
    const videoDoc = ref<HTMLVideoElement | null>(null)
    const audioDoc = ref<HTMLAudioElement | null>(null)

    onMounted(() => {
      if (videoDoc.value) {
        console.log('setea en onmounted')
        videoDoc.value.srcObject = props.streamVideo
      }
    })

    watch(() => props.streamVideo, () => {
      if (videoDoc.value) {
        if (props.streamVideo) {
          console.log('Cambia en mi item call', props.streamVideo)
          videoDoc.value.srcObject = props.streamVideo
          void nextTick(() => {
            void videoDoc?.value?.play()
          })
        }
      }
    }, {
      deep: true,
      immediate: true
    })

    watch(() => props.streamAudio, () => {
      if (audioDoc.value) {
        if (props.streamAudio) {
          audioDoc.value.srcObject = props.streamAudio
        }
      }
    },
    {
      deep: true,
      immediate: true
    })

    return {
      videoDoc,
      audioDoc
    }
  }
})
</script>

<style scoped/>

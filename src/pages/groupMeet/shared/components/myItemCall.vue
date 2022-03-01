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
    {{ streamVideo?.getVideoTracks() }}

    <audio
      v-show="false"
      ref="audioDoc"
      autoplay
      :controls="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch, onMounted } from 'vue'
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
    const { streamVideo } = toRefs(props)

    onMounted(() => {
      if (videoDoc.value) {
        videoDoc.value.srcObject = streamVideo.value
      }
    })
    watch(streamVideo, (newVal) => {
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
      videoDoc,
      audioDoc
    }
  }
})
</script>

<style scoped/>

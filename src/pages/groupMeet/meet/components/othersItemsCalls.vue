<template>
  <div>
    <p style="background: green">
      {{ items }}
    </p>
    <my-item-call
      v-for="(item, index) in items"
      :key="index"
      :stream-audio="item.streamAudio"
      :stream-video="item.streamVideo"
      :name="item.name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MyItemCall from 'pages/groupMeet/shared/components/myItemCall.vue'
import { IItemCall } from 'pages/groupMeet/shared/IGroupMeet'

export default defineComponent({
  name: 'OthersItemsCalls',
  components: { MyItemCall },
  props: {
    items: {
      type: Array as PropType<Array<IItemCall>>,
      required: true,
      default: () => []
    }
  }
})
</script>

<style scoped>

</style>

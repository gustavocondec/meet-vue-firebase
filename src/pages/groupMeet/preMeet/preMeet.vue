<template>
  <div class="container-premeet">
    <div class="container-premeet__video">
      <containervideo />
    </div>
    <div class="container-premeet__buttons">
      <p class="title">
        ¿Listo para unirte?
      </p>
      <div>
        <q-btn
          color="primary"
          label="Solicitar unirse"
          rounded
          style="padding: 10px 15px"
          @click="joinCode"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import Containervideo from 'pages/groupMeet/preMeet/components/containervideo.vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { groupMeetApi } from 'pages/groupMeet/shared/api-composition'
import { existCallId } from 'pages/groupMeet/groupMeet-services'

export default defineComponent({
  name: 'PreMeet',
  components: { Containervideo },
  setup () {
    const $route = useRoute()
    const $quasar = useQuasar()
    const { callId, setupMediaLocal, setupMediaRemote, answerButton } = groupMeetApi()

    const joinCode = async () => {
      await setupMediaLocal()
      setupMediaRemote()
      await answerButton()
    }

    onBeforeMount(async () => {
      console.log('onMounted premeet')
      callId.value = String($route.query.callId)
      if (!await existCallId(callId.value)) return $quasar.notify({ type: 'negative', message: 'No existe un Meet con ese Id' })
    })

    return {
      joinCode
    }
  }
})
</script>

<style lang="sass" scoped>
.container-premeet
  padding: 1% 5% 2% 5%

  &__video
    margin-bottom: 5%
    border-radius: 15px
    overflow: hidden

  &__buttons
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    .title
      font-size: 3rem

@media only screen and (min-width: 600px) and (max-width: 700px)
  .container-premeet
    padding-left: 10%
    padding-right: 10%

@media only screen and (min-width: 700px) and (max-width: 800px)
  .container-premeet
    padding-left: 15%
    padding-right: 15%

@media only screen and (min-width: 800px) and (max-width: 940px)
  .container-premeet
    padding-left: 20%
    padding-right: 20%

@media only screen and (min-width: 940px)
  .container-premeet
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    min-height: 93vh

    &__video
      width: 52.5%

    &__buttons
      width: 30%

</style>

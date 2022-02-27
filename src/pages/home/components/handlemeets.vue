<template>
  <div class="container-handlemeets">
    <q-btn
      class="container-handlemeets__btn-new"
      color="primary"
      icon="videocam"
      label="Reunión nueva"
      @click="createRoom"
    />
    <div class="container-handlemeets__container-codigo">
      <q-input
        v-model="callId"
        dense
        label="Ingresa un código o vinculo"
        outlined
      >
        <template #prepend>
          <q-icon name="keyboard" />
        </template>
      </q-input>
      <q-btn
        :color="callId? 'primary':'gray'"
        :disable="!callId"
        flat
        label="Unirse"
        @click="joinCode()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { groupMeetApi } from 'pages/groupMeet/api-composition'

export default defineComponent({
  name: 'HandleMeets',
  setup () {
    const $router = useRouter()
    const q = useQuasar()
    const { createOffer, answerButton, callId, setupMediaRemote, setupMediaLocal } = groupMeetApi()
    /**
     * @description Create a offer
     * */
    const createRoom = async () => {
      await setupMediaLocal()
      setupMediaRemote()
      await createOffer()
      await $router.push('/meet')
    }

    const joinCode = async () => {
      try {
        await setupMediaLocal()
        setupMediaRemote()
        await answerButton()
        await $router.push('/meet')
      } catch (e) {
        q.notify({ color: 'red', message: `Ocurrio un error: ${String(e)}` })
      }
    }

    return {
      callId,
      createRoom,
      joinCode
    }
  }
})
</script>

<style lang="sass" scoped>
.container-handlemeets
  display: flex
  align-items: center
  justify-content: left
  flex-wrap: wrap

  &__btn-new
    margin-bottom: 2rem
    margin-right: 5%

  &__container-codigo
    margin-bottom: 2rem
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
</style>

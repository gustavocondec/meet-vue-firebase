<template>
  <div class="container-handlemeets">
    <q-btn
      class="container-handlemeets__btn-new"
      color="primary"
      icon="videocam"
      label="Reunión nueva"
      :loading="isLoadingCreate"
      :disable="isLoadingJoin"
      @click="createRoom"
    />
    <div class="container-handlemeets__container-codigo">
      <q-input
        :readonly="isLoadingCreate || isLoadingJoin"
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
        :disable="!callId||isLoadingCreate"
        :loading="isLoadingJoin"
        flat
        label="Unirse"
        @click="joinCode()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { groupMeetApi } from 'pages/groupMeet/shared/components/api-composition'
import { existCallId } from 'pages/groupMeet/groupMeet-services'
import { useStore } from 'src/store'

export default defineComponent({
  name: 'HandleMeets',
  setup () {
    const $router = useRouter()
    const q = useQuasar()
    const $store = useStore()
    const isLoadingCreate = ref(false)
    const isLoadingJoin = ref(false)
    const { createOffer, answerButton, callId, setupMediaLocal, setupMediaRemote } = groupMeetApi()
    /**
     * @description Create a offer
     * */
    const createRoom = async () => {
      try {
        isLoadingCreate.value = true
        await setupMediaLocal()
        setupMediaRemote()
        await createOffer()
        $store.commit('groupMeetModule/setRole', 'offer')
        await $router.push('/' + callId.value)
      } catch (e) {
        q.notify({ type: 'negative', message: String(e) })
      } finally {
        isLoadingCreate.value = false
        q.notify({ type: 'positive', message: 'Se creo sala.' })
      }
    }

    const joinCode = async () => {
      try {
        isLoadingJoin.value = true
        if (!await existCallId(callId.value)) return q.notify({ type: 'negative', message: 'No existe un Meet con ese Id' })
        await setupMediaLocal()
        setupMediaRemote()
        await answerButton()
        $store.commit('groupMeetModule/setRole', 'answer')
        await $router.push('/' + callId.value)
      } catch (e) {
        q.notify({ color: 'red', message: `Ocurrio un error: ${String(e)}` })
      } finally {
        q.notify({ type: 'positive', message: 'Te uniste a la sala.' })
        isLoadingJoin.value = false
      }
    }

    return {
      isLoadingCreate,
      isLoadingJoin,
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

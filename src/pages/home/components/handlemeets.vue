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
        v-model="codigo"
        dense
        label="Ingresa un código o vinculo"
        outlined
      >
        <template #prepend>
          <q-icon name="keyboard" />
        </template>
      </q-input>
      <q-btn
        :color="codigo? 'primary':'gray'"
        :disable="!codigo"
        flat
        label="Unirse"
        @click="joinCode(codigo)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'HandleMeets',
  setup () {
    const codigo = ref('')
    const $router = useRouter()
    const q = useQuasar()

    /**
     * @description Create a offer
     * */
    const createRoom = () => {
      console.log('create Room')
    }

    const joinCode = async (codigoId:string) => {
      try {
        console.log('Join')
        await $router.push('/')
      } catch (e) {
        q.notify({ color: 'red', message: `Ocurrio un error: ${String(e)}` })
      }
    }

    return {
      codigo,
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

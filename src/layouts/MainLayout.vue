<template>
  <q-layout
    view="lHh Lpr lFf"
  >
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title @click="goToHome">
          Meeting
        </q-toolbar-title>

        <div>v{{ require('../../package.json').version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const router = useRouter()
    const goToHome = () => {
      void router.push('/')
    }

    return {
      goToHome
    }
  }
})
</script>

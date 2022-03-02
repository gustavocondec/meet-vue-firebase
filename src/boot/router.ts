import { boot } from 'quasar/wrappers'

export default boot(({ app, router, store }) => {
  router.beforeEach((to, from, next) => {
    console.log(to, from)
    if (to.name !== 'meet') store.commit('groupMeetModule/restart')
    next()
  })
})

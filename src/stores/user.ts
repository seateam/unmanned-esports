export const useUser = defineStore({
  id: 'user',
  state: () => {
    return {
      avatar: '',
      username: '',
    }
  },
  actions: {
    login() {
      this.avatar = '/img/cat.jpg'
      this.username = 'UP.seateam'
    },
    exit() {
      this.$reset()
    },
  },
})

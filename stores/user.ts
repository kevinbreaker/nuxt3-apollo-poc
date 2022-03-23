import { defineStore, acceptHMRUpdate } from 'pinia'
import { getUser } from '~~/services/user'


export type Role = 'Developer_🐛' | 'vagabound'

type State = {
  firstname: string
  lastname: string
  avatar: string
  email: string
  role: Role
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    email: '',
    avatar: '',
    lastname: '',
    firstname: '',
    role: 'Developer_🐛',
  }),

  actions: {
    async storeUser() {
      const { data } = await getUser()

      this.email = data.email
      this.avatar = data.avatar
      this.firstname = data.firstname
      this.lastname = data.lastname
      this.role = data.role
    }
  },

  getters: {
    getUser: (state) => state.firstname
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
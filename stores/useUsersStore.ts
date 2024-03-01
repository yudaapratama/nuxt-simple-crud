import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useUsersStore = defineStore('users', () => {
  const loading = reactive({
    content: false,
    button: false
  })
  const users = ref<User[] | null>()
  const endpoint = 'https://jsonplaceholder.typicode.com/users'

  const page = reactive({
    current: 1,
    limit: 5,
    total: 0,
    searchQuery: ''
  })

  const list = computed(() => {
    if (page.searchQuery.length === 0) {
      page.total = users.value?.length as number
      return users.value?.slice((page.current - 1) * page.limit, page.current * page.limit)
    }

    const usersSearch = users.value?.filter(e => e.name.toLowerCase().includes(page.searchQuery.toLowerCase())).slice((page.current - 1) * page.limit, page.current * page.limit)
    page.total = usersSearch?.length as number
    return usersSearch
  })

  const get = async (): Promise<void> => {
    try {
      loading.content = true
      const response = await $fetch<User[]>(endpoint)
      users.value = response
    } catch (error) {
      users.value = null
    } finally {
      loading.content = false
    }
  }

  const add = async (payload: User): Promise<void> => {
    try {
      loading.button = true
      const response = await $fetch<User>(endpoint, {
        method: 'POST',
        body: payload
      })
      users.value = [...users.value!, response]
    } catch (error) {
      console.log(error)
    } finally {
      loading.button = false
    }
  }

  const getById = (id: number): User | undefined => {
    return users.value?.find(e => e.id === id)
  }

  const update = async (payload: User): Promise<void> => {
    try {
      loading.button = true
      await $fetch<User>(`${endpoint}/${payload.id}`, {
        method: 'PATCH',
        body: payload
      })
      users.value = users.value?.map((e) => {
        e = e.id === payload.id ? payload : e
        return e
      })
    } catch (error) {
      console.log(error)
    } finally {
      loading.button = false
    }
  }

  const destroy = async (payload: number): Promise<void> => {
    try {
      loading.button = true
      await $fetch<User>(`${endpoint}/${payload}`, {
        method: 'DELETE'
      })
      users.value = users.value?.filter(e => e.id !== payload)
      page.current = 1
    } catch (error) {
      console.log(error)
    } finally {
      loading.button = false
    }
  }

  return {
    loading,
    list,
    page,
    get,
    add,
    getById,
    update,
    destroy
  }
})

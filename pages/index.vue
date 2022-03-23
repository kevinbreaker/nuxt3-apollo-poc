<script lang="ts" setup>

import { getTodos, getATodoDetail, postATodo, deleteTodos, patchTodoDetail } from '../services/todo'
import { useUserStore } from '../stores/user'

import { GetAllCharacters, getAllCharacters } from '../services/character'

import { useQuery, useResult } from '@vue/apollo-composable'

import type { Todo } from '~~/@types/todo';


const user = useUserStore()

const todos = ref<Todo[]>([])


const characters = ref<GetAllCharacters['results']>([])
const pagination = ref<GetAllCharacters['info']>({
  pages: 1,
  count: 1,
  next: 1,
  prev: 1,
})

const filter = reactive({
  search: '',
  currentPage: 1,
})


const { loading, onResult, result } = useQuery(getAllCharacters,
  () => ({
    page: filter.currentPage,
    name: filter.search,
  }), { fetchPolicy: 'cache-and-network' })

onResult(({ data, networkStatus }) => {
  if (networkStatus === 7) {
    characters.value = data.characters.results
    pagination.value = data.characters.info
  }
})



async function fetchTodos() {
  const { data } = await getTodos({ page: 1, perPage: 10 })

  todos.value = data.data
}


async function updateATodo(id = 1) {
  await patchTodoDetail(id, {
    title: 'Meu novo titulo',
    description: 'Nova descrição'
  })
}


function getTodoDetails(id = 2) {
  getATodoDetail(id)
}


async function deleteATodo(id = 2) {
  await deleteTodos(id)
}

async function setANewTodo() {
  await postATodo({
    category: 'coffee',
    title: 'Meu novo Todo UwU',
    description: 'Funciona para criar novos dados no mirage!',
    done: true
  })


  getTodoDetails(41)
}


onMounted(() => {

  // user.storeUser()

})
</script>

<template>
  <section>
    <h1>oie</h1>

    <!-- <Box /> -->

    <nuxt-link to="/about">Para about</nuxt-link>

    <Search />

    <button @click="fetchTodos">Get todos</button>

    <button @click="getTodoDetails(3)">Get TODO DETAIL</button>

    <button @click="setANewTodo">Addd a new todoo</button>

    <button @click="deleteATodo(2)">Delete todo</button>

    <button @click="updateATodo(1)">Update a todo</button>

    <button @click="yey">get characterss</button>

    <div style="display: flex; margin: 8px;">
      <button @click="filter.currentPage--">PREVIUS PAGE</button>
      <strong>Page: {{ filter.currentPage }}</strong>
      <button @click="filter.currentPage++">NEXT PAGE</button>
    </div>
    <div style="border: 2px red dashed">
      <ul>
        <li
          v-for="todo in todos"
          :key="todo.id"
          style="margin: 15px; display: flex; flex-direction: column;"
        >
          <span style="margin-bottom: 8px">title: {{ todo.title }}</span>
          <span style="margin-bottom: 8px">desc: {{ todo.description }}</span>
          <span style="margin-bottom: 8px">done: {{ todo.done }}</span>
        </li>
      </ul>
      <h1>characters</h1>

      <ul>
        <li
          v-for="(character, id) in characters"
          :key="id"
          style="margin: 15px; display: flex; flex-direction: column;"
        >
          <span style="margin-bottom: 8px">title: {{ character.name }}</span>
          <span style="margin-bottom: 8px">desc: {{ character.origin }}</span>
          <span style="margin-bottom: 8px">done: {{ character.status }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss"></style>

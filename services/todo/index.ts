import { fetch } from '@/services/'
import { AxiosResponse } from 'axios'

import { Params, ParamsPatch, ResponseGetTodos } from './types'
import { Todo } from '@/@types/todo'

// @ Acesse [../../server-mock/routes/index.ts] para ver todas as rotas

export function getTodos(params: Params): ResponseGetTodos {
  return fetch({
    params,
    path: `/todos`,
  })
}

export function deleteTodos(id: number): Promise<AxiosResponse> {
  return fetch({
    method: 'DELETE',
    path: `/todos/${id}`,
  })
}

export function postATodo(params: Omit<Todo, 'icon' | 'id'>): Promise<AxiosResponse> {
  return fetch({
    data: {
      ...params,
    },
    method: 'POST',
    path: `/todos`,
  })
}

export function getATodoDetail(id: number): Promise<AxiosResponse> {
  return fetch({
    path: `/todos/${id}`,
  })
}
export function patchTodoDetail(id: number, patch: ParamsPatch): Promise<AxiosResponse> {
  return fetch({
    method: 'PATCH',
    path: `/todos/${id}`,
    data: {
      ...patch,
    },
  })
}

export function getDashboard(): Promise<AxiosResponse> {
  return fetch({
    path: `/todos/dashboard`,
  })
}

export function getCategoriesCount(): Promise<AxiosResponse> {
  return fetch({
    path: `/todos-categories`,
  })
}

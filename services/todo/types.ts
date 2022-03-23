import { Todo, Status, Categories, CategoriesCount, Pagination } from '@/@types/todo'
import { AxiosResponse } from 'axios'


export type Params = {
  page: number
  perPage: number
  status?: Status
  category?: Categories[] | 'all'
}

export type ParamsPatch = {
  done?: boolean
  category?: Categories
  title?: string
  description?: string
}


export type ResponseGetTodos = Promise<AxiosResponse<{
  data: Todo[]
  pagination: Pagination
}>>
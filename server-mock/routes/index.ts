import { Response } from 'miragejs'
import { paginate, transformInNumberOrFallback } from '../utils'

export default function routes() {
  this.namespace = 'api/v1'
  this.timing = 300 // Controla o tempo de loading/delay da request

  // @ CRIAR TODO
  this.post('todos', (schema, { requestBody }) => {
    const id = schema.db.todos.length + 1
    const todo = JSON.parse(requestBody)

    return schema.todos.create({ ...todo, id })
  })
  // @ PEGAR INFORMAÇÕES DO TODO
  this.get('todos/:id', (schema, { params }) => {
    const todo = schema.todos.find(params.id)

    return todo ?? {}
  })
  // @ ATUALIZAR TODO
  this.patch('todos/:id', (schema, { requestBody, params }) => {
    const todo = JSON.parse(requestBody)

    if (schema.db.todos.find(params.id)) {
      return schema.db.todos.update(params.id, todo)
    } else {
      const headers = {}
      const data = { errors: ['ID não encontrado!'] }

      return new Response(500, headers, data)
    }
  })

  // @ PEGAR LISTA DE TODO COM FILTROS E PAGINAÇÃO
  this.get('todos', (schema, { queryParams }) => {
    const alls = ['fun', 'work', 'daily', 'coffee', 'kitchen', 'personal', 'investment']

    const transformToArrayIfTheValueIsOfAnotherType = (value, fn = v => v) =>
      Array.isArray(value) ? value : [fn(value)]

    const isAll = ['all' || ''].includes(queryParams.category) ? '' : queryParams.category

    const categoriesToFilter = isAll || alls

    const filtered = schema.db.todos.filter(({ category }) =>
      transformToArrayIfTheValueIsOfAnotherType(categoriesToFilter).includes(category),
    )

    return paginate({
      entity: filtered,
      page: transformInNumberOrFallback(queryParams?.page, 1),
      perPage: transformInNumberOrFallback(queryParams?.perPage, 20),
    })
  })

  // @ DELETAR TODO
  this.delete('/todos/:id', (schema, { params }) => {
    const id = params.id
    if (schema.todos.find(id)) {
      return schema.todos.find(id).destroy()
    } else {
      const headers = {}
      const data = { errors: ['ID não encontrado!'] }

      return new Response(500, headers, data)
    }
  })

  // @ LISTAR CATEGORIAS
  this.get('todos-categories', (schema, { queryParams }) => {
    const categoriesCountInitData = {
      all: 0,
      fun: 0,
      work: 0,
      daily: 0,
      coffee: 0,
      kitchen: 0,
      personal: 0,
      investment: 0,
    }

    return schema.db.todos.reduce((acc, { category }) => {
      acc[category] += 1
      acc.all += 1
      return acc
    }, categoriesCountInitData)
  })

  this.get('user', schema => schema.db.user[0])
}

export type Icons =
  | 'action-add'
  | 'action-close'
  | 'category-fun'
  | 'category-work'
  | 'category-daily'
  | 'category-store'
  | 'category-coffee'
  | 'category-kitchen'
  | 'category-investment'
  | 'category-personal'

export type SelectOptionIcon = {
  text: string
  value: Categories
}

export type Categories =
  | 'fun'
  | 'work'
  | 'daily'
  | 'store'
  | 'coffee'
  | 'kitchen'
  | 'investment'
  | 'personal'


export type Todo = {
  id: number
  icon?: Icons
  title: string
  description: string
  category: Categories

  done: boolean
}

export type Pagination = {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
}

export type Status = 'progress' | 'both' | 'done'

export type CategoriesCount = Record<Categories | 'all', number>

export type Dashboard = {
  [P in Categories]: {
    done: number
    total: number
    progress: number
  }
}

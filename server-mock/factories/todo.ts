import { Factory } from 'miragejs'
import faker from '@faker-js/faker'

import { randomNumber } from './../utils'

import type { Categories } from '@/@types/todo'

// @ Aqui é o "modelo" de cada TODO.
export default {
  todo: Factory.extend({
    title() {
      return faker.fake('{{hacker.verb}} {{company.bs}}')
    },

    description() {
      return faker.lorem.paragraphs(3)
    },

    done() {
      return faker.datatype.boolean()
    },

    category() {
      const categories: Categories[] = [
        'fun',
        'work',
        'daily',
        'coffee',
        'kitchen',
        'personal',
        'investment',
      ]

      return categories[randomNumber(categories.length, true)]
    },
  }),
}

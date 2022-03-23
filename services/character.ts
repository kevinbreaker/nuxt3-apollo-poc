

import { gql } from '@apollo/client/core'


export type Character = {
  id: string
  name?: string
  status: 'Alive' | 'Dead' | 'unknown'
  species?: string
  type?: string
  gender?: string
  origin?: Location
  location?: Location
  image?: string
  episode?: Episode[]
}

export type Episode = {
  id: string
  name: string
  air_date: string
  episode: string
  characters: Character[]
}

export type Episodes = {
  info: Info
  results: Episode[]
}

export type Info = {
  count: number
  pages: number
  next: number
  prev: number
}

export type Location = {
  id?: number
  name?: string
  type?: string
  dimension?: string
  residents?: Character[]
}

export type Locations = {
  info: Info
  results: Location[]
}

export type Response<T> = {
  info: Info
  results: T
}

export type Info = {
  count: number
  pages: number
  next: number
  prev: number
}

export type GetAllCharacters = Response<Character[]>

export const getAllCharacters = gql`
 query getAllCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        status
        name
        image
        species
        gender
      }
    }
  }
`

export type GetCharacter = Character

export const getCharacterDetails = gql`
  query getCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      status
      species
      type
      gender
      origin {
        name
        type
        dimension
      }
      location {
        name
        type
        dimension
      }
      episode {
        name
        episode
        air_date
      }
    }
  }
`
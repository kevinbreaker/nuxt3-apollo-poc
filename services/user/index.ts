import { fetch } from '@/services/'
import { AxiosResponse } from 'axios'

export function getUser(): Promise<AxiosResponse> {
  return fetch({
    path: `/user`,
  })
}

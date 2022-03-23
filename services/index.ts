import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

type FetchParams = {
  baseURL?: string
  path?: string
  headers?: AxiosRequestHeaders | { Authorization: string }
  data?: JSON | Record<string, unknown>
  params?: any
  method?: AxiosRequestConfig['method']
  removeStopLoading?: boolean
}

function requestInterceptor(config: any) {

  console.log('[Interceptor on request]')

  // @ Imaginando que tenha o token vindo do store ou cookies
  const user = { token: null }

  // @ Aqui setando o token no headers  
  if (user?.token)
    config.headers.Authorization = `Bearer ${user.token}`

  return config
}

// @ Aqui é o modulo principal. Deve importar dentro de outro modulo ( como o de ./user.ts ou ./todos.ts ) e seguir a sugestão.

export function fetch({
  method = 'GET',
  baseURL = `${import.meta.env.VITE_APP_BASE_URL || location.origin}/api/v1`,
  path,
  ...data
}: FetchParams): Promise<AxiosResponse> {
  const axiosInstance = axios.create()

  axiosInstance.interceptors.request.use(requestInterceptor)

  axiosInstance.interceptors.response.use(
    (config) => {
      // @ Aqui cai no [THEN]
      // @ Aqui poden ter algumas validações em conjunta  na hora de retornar para aplicação
      // @ Exemplo, desativando loaders globais 
      return Promise.resolve(config)
    },
    (config) => {
      // @ Aqui cai no [CATCH]
      // @ Aqui poden ter algumas validações em conjunta  na hora de retornar para aplicação
      // @ Exemplo, desativando loaders globais 

      return Promise.reject(config)
    },
  )

  return axiosInstance({
    method,
    baseURL,
    url: path,
    ...data,
  })
}
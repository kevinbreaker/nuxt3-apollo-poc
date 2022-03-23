export async function getCars(model: string) {
  const config = useRuntimeConfig()
  console.log('aaaaa', model)

  console.log('osh', config)
  return await useLazyFetch('https://casfr-data.p.rapidapi.com/cars', {
    params: {
      // model
    },
    headers: {
      'x-rapidapi-host': config.API_HOST,
      'x-rapidapi-key': config.API_KEY
    }
  })

}
<script lang="ts" setup>
import { getCars } from '~~/services/cars';

const cars = ref([])
const search = ref('')



async function searchFecth(car: string) {
  try {
    const { data, pending, error } = await getCars(car)

console.log('oshen', error)
  } catch(error) {
    console.log('[ERRROOOOOOOOR]', error)
  }
// 
  // console.log({ data, pending, error })
  // cars.value = data
}

</script>

<template>
  <section>
    <label>
      Busca X
      <input list="cars" @keyup.enter="searchFecth($event.target.value)" />
    </label>

    <datalist id="cars">
      <option v-for="car in cars" :value="car.model">{{ car?.model }}</option>
    </datalist>
  </section>
</template>

<style lang="scss"></style>

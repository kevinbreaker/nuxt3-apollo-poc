<script lang="ts" setup>
import Test from '@/components/Teste.vue';

const count = useState('counter', () => Math.round(Math.random() * 1000))

</script>

<template>
  <section>
    <h1>{{ count }}</h1>
    <button @click="count++">LETI GOU</button>
  </section>
</template>

<style lang="scss"></style>

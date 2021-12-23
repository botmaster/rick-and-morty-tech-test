<template>
  <div class="rounded overflow-hidden bg-white shadow shadow-green-800/20">
    <a
      href="#"
      @click.prevent="goto"
      class="w-full aspect-square relative flex items-center justify-center"
      ><loading-component></loading-component>
      <img
        width="300"
        height="300"
        class="absolute inset-0 w-full h-full object-cover"
        :src="image"
        :alt="`Name: ${name}`"
    /></a>

    <div class="flex justify-between items-baseline px-4 py-2">
      <p class="text-lg">{{ name }} <span v-if="status === 'Dead'">☠️</span></p>
      <p>
        <a href="#" @click.prevent="goto">Details</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import LoadingComponent from './LoadingComponent.vue'

import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: {
    type: String,
    default: 'mon super titre',
  },
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
})

function goto() {
  router.push({ name: 'details', params: { id: props.id } })
}
</script>

<style lang="scss" scoped></style>

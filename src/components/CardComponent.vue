<template>
  <div class="rounded overflow-hidden bg-white shadow shadow-green-800/20">
    <a
      href="#"
      @click.prevent="goto"
      class="w-full aspect-square relative flex items-center justify-center"
    >
      <img
        width="300"
        height="300"
        class="absolute inset-0 w-full h-full object-cover"
        :src="image"
        :alt="`Name: ${name}`"
    /></a>

    <div class="px-4 py-2">
      <p class="text-lg leading-tight truncate">
        <span v-if="status === 'Dead'">☠️</span> {{ name }}
      </p>
      <p>
        <a href="#" @click.prevent="goto"
          >Read more <span class="sr-only">about {{ name }}</span>
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: {
    type: String,
    default: 'Na',
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

<template>
  <div class="rounded overflow-hidden shadow-lg">
    <a href="#" @click.prevent="goto"
      ><img class="w-full" :src="image" :alt="`Name: ${name}`"
    /></a>

    <div class="px-6 py-4">
      <div class="text-xl mb-2">{{ name }}</div>
      <p>
        <a href="#" @click.prevent="goto">Details</a>
      </p>
    </div>
  </div>
</template>

<script setup>
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
})

function goto() {
  router.push({ name: 'details', params: { id: props.id } })
}
</script>

<style lang="scss" scoped></style>

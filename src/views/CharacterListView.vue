<template>
  <div>Je suis la page liste</div>
  <p v-if="isLoading">Loading</p>
  <ul>
    <li v-for="(item, index) in characterList" :key="index">
      <p>{{ item.name }}</p>
    </li>
  </ul>
  <div class="mt-4">
    <div class="flex space-x-4">
      <button @click="prevHandler">page précédente</button>
      <button @click="nextHandler">page suivante</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

if (!route.query.page) {
  router.replace({ query: { page: 1 } })
}

const queryPage = computed(() =>
  route.query.page ? Number(route.query.page) : 1
)

// eslint-disable-next-line no-unused-vars
const characterList = computed(() => store.state.charactereModule.characterList)
// eslint-disable-next-line no-unused-vars
const isLoading = computed(() => store.state.charactereModule.isLoading)

const nextHandler = () => {
  router.push({ path: '/characters', query: { page: queryPage.value + 1 } })
}

const prevHandler = () => {
  router.push({ path: '/characters', query: { page: queryPage.value - 1 } })
}

const fetchData = () => {
  store.dispatch('charactereModule/fetchCharacterList', queryPage.value)
}

watch(
  () => route.query,
  (query) => {
    if (query.page) {
      fetchData()
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped></style>

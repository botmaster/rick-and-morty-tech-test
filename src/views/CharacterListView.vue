<template>
  <h1>Je suis la page liste</h1>
  <p v-if="isLoading">Loading</p>

  <!-- Search -->
  <form class="mt-6" @submit.prevent="searchSubmitHandler">
    <div role="search">
      <label class="" for="search"
        >Search about a RM
        <p role="alert"></p>
      </label>
      <input
        id="search"
        ref="search"
        class="rounded border py-2 px-2 text-sm"
        type="text"
        :value="route.query.name"
      />
      <button type="submit" class="btn btn--ghost ml-4">Search</button>
    </div>
  </form>

  <!-- Filters -->
  <div class="mt-6">
    <label class="" for="select_status"
      >Filter by status
      <p role="alert"></p>
    </label>
    <select
      id="select_status"
      ref="select_status"
      class="rounded border py-2 px-2 text-sm"
      v-model="route.query.status"
      @change="selectChangeHandler"
    >
      <option disabled value="">Please select one</option>
      <option>alive</option>
      <option>dead</option>
      <option>unknown</option>
    </select>
  </div>

  <!-- List -->
  <ul
    v-if="characterList && characterList.length > 0"
    class="mt-8 grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
  >
    <li v-for="(item, index) in characterList" :key="index">
      <card-component-vue
        :name="item.name"
        :id="item.id"
        :image="item.image"
        class="h-full"
      ></card-component-vue>
    </li>
  </ul>
  <p v-else>Pas de résultats</p>

  <!-- Paginate -->
  <div v-if="characterList && characterList.length > 0" class="mt-4">
    <div class="flex space-x-4 items-center">
      <button class="btn btn--ghost" @click="prevHandler">
        page précédente
      </button>
      <p class="text-sm">{{ queryPage }} / {{ pageCount }}</p>
      <button class="btn btn--ghost" @click="nextHandler">page suivante</button>
      <p class="text-sm">Caracters: {{ characterCount }}</p>
    </div>
  </div>
</template>

<script setup>
import CardComponentVue from '../components/CardComponent.vue'

import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
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
const characterCount = computed(
  () => store.getters['charactereModule/characterCount']
)
const pageCount = computed(() => store.getters['charactereModule/pageCount'])
const characterList = computed(() => store.state.charactereModule.characterList)
const isLoading = computed(() => store.state.charactereModule.isLoading)

const search = ref(null)
const select_status = ref(null)

const nextHandler = () => {
  router.push({
    path: '/characters',
    query: Object.assign({ ...route.query }, { page: queryPage.value + 1 }),
  })
}

const prevHandler = () => {
  router.push({
    path: '/characters',
    query: Object.assign({ ...route.query }, { page: queryPage.value - 1 }),
  })
}

const searchSubmitHandler = () => {
  router.push({
    query: { name: search.value?.value?.trim(), page: 1 },
  })
}

const selectChangeHandler = () => {
  console.log(select_status.value, route.query.status)
  router.push({
    query: Object.assign({ ...route.query }, { status: route.query.status }),
  })
}

const fetchData = (query) => {
  console.log('fetchData query', query)
  store.dispatch('charactereModule/fetchCharacterList', {
    ...query,
  })
}

watch(
  () => route.query,
  (query) => {
    console.log('watch route.query: ', query)
    if (query) {
      fetchData(query)
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped></style>

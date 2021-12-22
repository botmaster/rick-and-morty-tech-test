<template>
  <div class="container mx-auto">
    <h1>Je suis la page liste</h1>
    <p v-if="isLoading">Loading</p>

    <!-- Search -->
    <form class="mt-6" @submit.prevent="searchSubmitHandler">
      <div role="search">
        <label class="" for="input_search"
          >Search about a RM
          <p role="alert"></p>
        </label>
        <input
          id="input_search"
          class="rounded border py-2 px-2 text-sm"
          type="text"
          v-model.lazy.trim="search"
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
        class="rounded border py-2 px-2 text-sm"
        v-model="status"
      >
        <option disabled value="">Please select one</option>
        <option>all</option>
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
        <button class="btn btn--ghost" @click="nextHandler">
          page suivante
        </button>
        <p class="text-sm">Caracters: {{ characterCount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardComponentVue from '../components/CardComponent.vue'

import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const status = computed({
  get() {
    return route.query.status
  },
  set(newValue) {
    if (newValue === 'all') {
      const query = { ...route.query }
      delete query.status
      router.replace({
        name: 'characters',
        query: { ...query },
      })
    } else {
      router.replace({
        name: 'characters',
        query: {
          ...route.query,
          status: newValue,
        },
      })
    }
  },
})

const search = computed({
  get() {
    return route.query.name
  },
  set(newValue) {
    router.replace({
      name: 'characters',
      query: {
        ...route.query,
        name: newValue,
      },
    })
  },
})

const queryPage = computed(() =>
  route.query.page ? Number(route.query.page) : 1
)

const characterCount = computed(
  () => store.getters['charactereModule/characterCount']
)
const pageCount = computed(() => store.getters['charactereModule/pageCount'])
const characterList = computed(() => store.state.charactereModule.characterList)
const isLoading = computed(() => store.state.charactereModule.isLoading)

const nextHandler = () => {
  router.push({
    name: 'characters',
    query: Object.assign({ ...route.query }, { page: queryPage.value + 1 }),
  })
}

const prevHandler = () => {
  router.push({
    name: 'characters',
    query: Object.assign({ ...route.query }, { page: queryPage.value - 1 }),
  })
}

const searchSubmitHandler = () => {
  router.push({
    name: 'characters',
    query: { name: search.value, page: 1 },
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
    // this watcher is triggered whene the route name change. Dont know why. Need to dig in.
    if (route.name === 'characters') {
      fetchData(query)
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped></style>

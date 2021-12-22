<template>
  <div class="container py-6 md:py-12">
    <h1 class="">
      <span>Search</span>
      <loading-component
        class="ml-6 text-4xl"
        v-if="isLoading"
      ></loading-component>
    </h1>

    <!-- Search -->
    <form class="mt-6" @submit.prevent="searchSubmitHandler">
      <div role="search">
        <label class="block text-xl mb-2" for="input_search"
          >Search about a Ricky and Morty character
          <p role="alert"></p>
        </label>
        <input
          id="input_search"
          class="rounded border py-2 px-2 text-sm"
          type="text"
          v-model.lazy.trim="search"
        />
        <button type="submit" class="btn btn--primary ml-4">Search</button>
      </div>
    </form>

    <div
      v-if="characterList && characterList.length > 0"
      class="md:flex justify-between mt-14"
    >
      <!-- Paginate -->
      <div class="">
        <div class="flex flex-wrap space-x-2 md:space-x-4 items-center">
          <button
            :class="hasPrevPage ? '' : 'btn--disabled'"
            :disabled="!hasPrevPage"
            class="btn btn--ghost"
            @click="prevHandler"
          >
            Previous page
          </button>
          <p class="text-sm">{{ queryPage }} / {{ pageCount }}</p>
          <button
            :class="hasNextPage ? '' : 'btn--disabled'"
            :disabled="!hasNextPage"
            class="btn btn--ghost"
            @click="nextHandler"
          >
            Next page
          </button>
          <p class="text-sm">Caracters: {{ characterCount }}</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex items-baseline">
        <label class="block mr-2" for="select_status"
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
    </div>

    <!-- List -->
    <ul
      v-if="characterList && characterList.length > 0"
      class="mt-8 grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      <li v-for="(item, index) in characterList" :key="index">
        <card-component
          :name="item.name"
          :id="item.id"
          :image="item.image"
          :status="item.status"
          class="h-full"
        ></card-component>
      </li>
    </ul>
    <p v-else>Pas de résultats</p>

    <!-- Paginate -->
    <div v-if="characterList && characterList.length > 0" class="mt-4">
      <div class="flex space-x-4 items-center">
        <button class="btn btn--ghost" @click="prevHandler">
          Previous page
        </button>
        <p class="text-sm">{{ queryPage }} / {{ pageCount }}</p>
        <button class="btn btn--ghost" @click="nextHandler">Next page</button>
        <p class="text-sm">Caracters: {{ characterCount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardComponent from '../components/CardComponent.vue'
import LoadingComponent from '../components/LoadingComponent.vue'

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
      const query = { ...route.query, page: 1 }
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
          page: 1,
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
        page: 1,
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
const hasNextPage = computed(
  () => store.getters['charactereModule/hasNextPage']
)
const hasPrevPage = computed(
  () => store.getters['charactereModule/hasPrevPage']
)
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

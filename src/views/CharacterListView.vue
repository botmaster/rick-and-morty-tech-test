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
        </label>
        <input
          id="input_search"
          class="rounded border mr-4 py-2 px-2 text-sm md:w-64"
          type="text"
          v-model.lazy.trim="search"
        />
        <button type="submit" class="btn btn--primary mr-4">Search</button>
        <a v-if="search" href="#" type="button" @click.prevent="search = null"
          >Clear search</a
        >
      </div>
    </form>

    <div
      v-if="characterList && characterList.length"
      class="md:flex justify-between mt-6 md:mt-14"
    >
      <!-- Paginate + infos -->
      <div class="flex flex-wrap items-baseline">
        <paginate-component
          :page-count="pageCount"
          :has-next-page="hasNextPage ? true : false"
          :has-prev-page="hasPrevPage ? true : false"
          :current-page="queryPage"
          @prev="prevHandler"
          @next="nextHandler"
          class="mr-4"
        ></paginate-component>
        <span class="text-sm mt-2 md:mt-0"
          ><span v-if="this.search">"{{ this.search }}" - </span>
          {{ characterCount }} hits</span
        >
      </div>

      <!-- Filters -->
      <div class="mt-6 md:mt-0 flex items-baseline">
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
      v-if="characterList?.length > 0"
      class="my-4 md:my-8 grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      <li class="item" v-for="item in characterList" :key="item.id">
        <card-component
          :name="item.name"
          :id="item.id"
          :image="item.image"
          :status="item.status"
          class="h-full"
        ></card-component>
      </li>
    </ul>
    <div
      v-else-if="characterList?.length === 0"
      class="my-4 md:my-8 md:flex md:items-center"
    >
      <img
        class="w-full mt-6 md:w-1/2 md:mr-8 md:mt-0"
        src="@/assets/images/what.png"
        alt=""
      />
      <p class="mt-4 flex-grow md:text-5xl md:mt-0">
        There are no results for your search !
      </p>
    </div>
    <p v-else><span>You shouldn't see this 😱</span></p>

    <!-- Paginate -->
    <paginate-component
      v-if="characterList && characterList.length"
      :page-count="pageCount"
      :has-next-page="hasNextPage ? true : false"
      :has-prev-page="hasPrevPage ? true : false"
      :current-page="queryPage"
      @prev="prevHandler"
      @next="nextHandler"
    ></paginate-component>
  </div>
</template>

<script setup>
import CardComponent from '../components/CardComponent.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import PaginateComponent from '../components/PaginateComponent.vue'

import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const status = computed({
  get() {
    return route.query.status || 'all'
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

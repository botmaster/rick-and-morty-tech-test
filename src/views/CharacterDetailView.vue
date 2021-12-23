<template>
  <div class="container py-6 md:py-12">
    <div class="mb-4 md:mb-12 flex items-center">
      <a href="" @click.prevent="router.go(-1)" class="btn btn--ghost">Back</a>
      <loading-component
        class="ml-6 text-4xl"
        v-if="isLoading"
      ></loading-component>
    </div>
    <template v-if="character && !isLoading">
      <div class="md:flex max-w-7xl">
        <img
          v-show="character?.image"
          class="w-64 h-64 mx-auto rounded-full md:rounded-lg md:w-[300px] md:h-[300px] mb-12 md:mr-10 shadow shadow-green-800/20"
          width="300"
          height="300"
          :src="character.image"
          :alt="`Name: ${character.name}`"
        />
        <div class="flex-grow text-lg">
          <h2>{{ character.name }}</h2>
          <div class="columns-3xs mt-6">
            <div class="col-item">
              <p class="label">Created</p>
              <p>{{ created }}&nbsp;</p>
            </div>
            <div class="col-item">
              <p class="label">Status</p>
              <p>{{ character.status }}&nbsp;</p>
            </div>
            <div class="col-item">
              <p class="label">Species</p>
              <p>{{ character.species }}&nbsp;</p>
            </div>
            <div class="col-item">
              <p class="label">Type</p>
              <p>{{ formatValue(character.type) }}&nbsp;</p>
            </div>
            <div class="col-item">
              <p class="label">Gender</p>
              <p>{{ character.gender }}&nbsp;</p>
            </div>
            <div class="col-item">
              <p class="label">Origin</p>
              <p>{{ character.origin?.name }}&nbsp;</p>
            </div>
            <div class="col-item">
              <p class="label">location</p>
              <p>{{ character.location?.name }}&nbsp;</p>
            </div>
            <div class="col-item">
              <p class="label">Episodes</p>
              <p>{{ episodesCount }}&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import LoadingComponent from '../components/LoadingComponent.vue'

import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

// eslint-disable-next-line no-unused-vars
const character = computed(
  () => store.getters['charactereModule/currentCharacter']
)
const episodesCount = computed(() => character.value?.episode?.length)
const created = computed(() => {
  return new Date(character.value.created)?.toLocaleDateString('fe-FE')
})
const isLoading = computed(() => store.state.charactereModule.isLoading)

const formatValue = (value) => {
  const str = String(value).trim()
  return str || str !== '' ? value : 'Na'
}

store.dispatch('charactereModule/fetchCharacterById', { id: route.params.id })
</script>

<style lang="scss" scoped>
.label {
  @apply text-sm text-turquoise-800;
}

.col-item {
  @apply break-inside-avoid-column mb-2;
}
</style>

<template>
  <div>Je suis la page détail</div>
  <template v-if="character">
    <h2>{{ character.name }}</h2>
    <img :src="character.image" :alt="`Name: ${character.name}`" />

    <p>Created:</p>
    <p>{{ created }}</p>
    <p>Status:</p>
    <p>{{ character.status }}</p>
    <p>Species:</p>
    <p>{{ character.species }}</p>
    <p>Type:</p>
    <p>{{ character.type }}</p>
    <p>Gender:</p>
    <p>{{ character.gender }}</p>
    <p>Origin:</p>
    <p>{{ character.origin?.name }}</p>
    <p>location:</p>
    <p>{{ character.location?.name }}</p>
    <p>Episodes:</p>
    <p>{{ episodesCount }}</p>
  </template>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

// eslint-disable-next-line no-unused-vars
const character = computed(
  () => store.getters['charactereModule/currentCharacter']
)
const episodesCount = computed(() => character.value?.episode?.length)
const created = computed(() => {
  return new Date(character.value.created)?.toLocaleDateString('fe-FE')
})

store.dispatch('charactereModule/fetchCharacterById', { id: route.params.id })
</script>

<style lang="scss" scoped></style>

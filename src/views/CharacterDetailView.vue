<template>
  <div>Je suis la page détail</div>
  <p v-if="character">{{ character.name }}</p>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

// eslint-disable-next-line no-unused-vars
// const props = defineProps({
//   id: {
//     type: String,
//     required: true,
//   },
// })

// eslint-disable-next-line no-unused-vars
const character = computed(
  () => store.getters['charactereModule/currentCharacter']
)

store.dispatch('charactereModule/fetchCharacterById', route.params.id)
</script>

<style lang="scss" scoped></style>

<template>
  <div>Je suis la page détail</div>
</template>

<script setup>
import { useStore } from 'vuex'
// import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
// const router = useRouter()
store.dispatch('charactereModule/fetchCharacterById', route.params.id)
</script>

<style lang="scss" scoped></style>

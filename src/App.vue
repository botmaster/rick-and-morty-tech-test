<template>
  <the-header></the-header>
  <main class="container mx-auto flex-grow">
    <router-view />
  </main>
  <the-footer></the-footer>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<style lang="scss"></style>

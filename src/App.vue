<template>
  <the-header></the-header>
  <cover-component-vue title="Jellysmack Tech Test">
    <img
      class="inline-block mb-6"
      src="@/assets/images/Rick_and_Morty_logo.png"
      alt="Logo Rick and Morty"
    />
  </cover-component-vue>
  <main class="flex-grow">
    <router-view />
  </main>
  <the-footer></the-footer>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import CoverComponentVue from './components/CoverComponent.vue'
</script>

<style lang="scss"></style>

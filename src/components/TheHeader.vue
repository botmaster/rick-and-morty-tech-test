<template>
  <header class="absolute inset-x-0 z-10 the-header p-4">
    <nav class="relative flex justify-between p-4">
      <router-link
        class="z-10 rounded backdrop-blur bg-black/20 px-4 py-2"
        to="/"
        >Home</router-link
      >
      <ul class="space-x-4 flex z-10">
        <li>
          <router-link class="bg-black/20 px-4 py-2" to="/about"
            >About</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped></style>

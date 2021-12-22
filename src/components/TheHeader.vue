<template>
  <header class="absolute inset-x-0 z-10 the-header p-4">
    <nav class="relative flex justify-between p-4 text-white">
      <router-link class="z-10" to="/">Home</router-link>
      <ul class="space-x-4 flex z-10">
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <a href="https://www.google.fr">Item</a>
        </li>
      </ul>
      <div class="absolute rounded backdrop-blur bg-black/50 inset-0"></div>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped></style>

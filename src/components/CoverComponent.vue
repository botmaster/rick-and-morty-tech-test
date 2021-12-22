<template>
  <div
    class="cover relative flex items-center justify-center bg-body-backgrounddark"
  >
    <img
      class="absolute inset-0 object-cover w-full h-full opacity-40"
      src="@/assets/images/Rick-and-Morty.jpg"
      alt=""
    />
    <div class="relative container mx-auto text-center">
      <p class="font-display text-slate-100 text-6xl font-black">
        Rick and Morty
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cover {
  height: 40vh;
}
</style>

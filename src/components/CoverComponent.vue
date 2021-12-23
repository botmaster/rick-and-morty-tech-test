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
      <slot></slot>
      <p class="cover__title h1">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.cover {
  height: 40vh;

  &__title {
    @apply text-2xl text-green;
    /* text-shadow: 0 0 1px rgb(7, 31, 1), 0 0 2px rgb(7, 31, 1),
      0 0 3px rgb(7, 31, 1), 0 0 4px rgb(7, 31, 1), 0 0 5px rgb(7, 31, 1),
      0 0 15px #b6ff00; */
  }
}
</style>

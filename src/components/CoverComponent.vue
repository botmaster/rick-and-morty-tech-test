<template>
  <div
    class="cover relative flex items-center justify-center bg-body-backgrounddark"
  >
    <img
      class="absolute inset-0 object-cover w-full h-full opacity-70"
      sizes="(max-width: 1920px) 100vw, 1920px"
      srcset="
        @/assets/images/cover-background-600.jpg   600w,
        @/assets/images/cover-background-1530.jpg 1530w,
        @/assets/images/cover-background-1920.jpg 1920w
      "
      src="@/assets/images/cover-background-1920.jpg"
      alt=""
    />
    <div class="relative container mx-auto text-center">
      <slot></slot>
      <p v-if="title" class="cover__title h1">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: null,
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

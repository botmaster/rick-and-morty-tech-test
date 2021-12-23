<template>
  <div class="flex flex-wrap space-x-2 md:space-x-4 items-center">
    <button
      :class="hasPrevPage ? '' : 'btn--disabled'"
      :disabled="!hasPrevPage"
      class="btn btn--ghost"
      @click="emit('prev')"
    >
      Previous page
    </button>
    <p class="text-sm">{{ currentPage }} / {{ pageCount }}</p>
    <button
      :class="hasNextPage ? '' : 'btn--disabled'"
      :disabled="!hasNextPage"
      class="btn btn--ghost"
      @click="emit('next')"
    >
      Next page
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['prev', 'next'])
defineProps({
  hasPrevPage: {
    type: Boolean,
    default: false,
  },
  hasNextPage: {
    type: Boolean,
    default: false,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>

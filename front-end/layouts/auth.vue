<script setup></script>

<template>
  <div class="container mx-auto rounded-lg sm:mx-44">
    <div class="flex flex-row items-center justify-center">
      <!-- Login image -->
      <div class="sm:w-3/5">
        <slot name="image"></slot>
      </div>
      <!-- Login or registration -->
      <div class="sm:w-4/5">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup></script>

<template>
  <div class="container mx-auto sm:my-20">
    <div class="flex flex-row items-center justify-center">
      <!-- Login image -->
      <div class="sm:max-w-lg">
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

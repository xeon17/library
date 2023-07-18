<script setup>
const route = useRoute();
</script>

<template>
  <user-profile :id="route.params.id"></user-profile>
  <div class="flex gap-x-6">
    <claimed-books :id="route.params.id"></claimed-books>
    <returned-books :id="route.params.id"></returned-books>
  </div>
</template>

<style scoped></style>

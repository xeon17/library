<script setup lang="ts">
import { safeParse } from "valibot";
const { schema, state } = defineProps(["schema", "state"]);

const emit = defineEmits(["submit"]);
const handleSubmit = async () => {
  const form = safeParse(schema, state, { abortEarly: true });
  if (!form.success) {
    return;
  }
  emit("submit", form.data);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="grid gap-y-4">
    <slot></slot>
  </form>
</template>

<style scoped></style>

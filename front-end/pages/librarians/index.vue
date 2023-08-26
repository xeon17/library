<script setup lang="ts">
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const { token, role } = storeToRefs(userStore);
const apiUrl = "http://localhost:8080/api/v1/users/";
const search = ref("");

definePageMeta({
  middleware: "auth",
  layout: "default",
});

useSeoMeta({
  title: "Library - Students",
  ogTitle: "Library - Students",
  description: "Library App Students Page",
  ogDescription: "Library App Students Page",
  ogImage: "/logo.png",
});

interface Librarian {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  lastLogin: string;
}

const { data: librarians } = await useFetch<Librarian>(apiUrl, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + token.value,
  },
  params: {
    role: "Librarian",
  },
});
</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: {
        padding: '',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
      footer: { padding: 'p-4' },
    }"
  >
    <template #header>
      <h2
        class="text-xl font-semibold leading-tight text-gray-900 dark:text-white"
      >
        Librarians
      </h2>
    </template>

    <div class="flex justify-between px-4 py-4">
      <div class="relative max-w-xs">
        <UInput
          size="md"
          v-model="search"
          placeholder="Search..."
          icon="i-heroicons-magnifying-glass"
        />
      </div>
      <div class="justify-end" v-if="role === 'Librarian' || role === 'Admin'">
        <UButton
          class="font-medium"
          to="/librarians/add"
          color="blue"
          label="Add librarian"
          size="lg"
          variant="outline"
          icon="i-heroicons-user-plus"
        />
      </div>
    </div>
    <div class="overflow-hidden">
      <users-table :users="librarians" :search="search"></users-table>
    </div>
  </UCard>
</template>

<style scoped></style>

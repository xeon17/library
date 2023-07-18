<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);
const array = ref([]);
const route = useRoute();
const apiUrl = "http://localhost:8080/api/v1/books";

/*
const { data: books, error } = await useFetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
  params: {
    student: route.params.id,
    status: "claimed",
    sort: "date",
    limit: 5,
  },
});
*/
</script>

<template>
  <div class="mt-6 flex max-w-md flex-col rounded-md bg-white shadow-default">
    <header
      class="flex items-center justify-between gap-x-8 border-b px-6 py-2.5"
    >
      <div class="flex justify-between">
        <div>
          <p class="text-xl font-semibold">Claimed books</p>
        </div>
      </div>
      <nuxt-link
        to="/books"
        class="flex items-center font-semibold text-blue-500"
      >
        <p>See all</p>
        <Icon class="h-5 w-5 opacity-75" name="heroicons:chevron-right" />
      </nuxt-link>
    </header>
    <div
      v-for="book in array"
      :key="book.id"
      @click="navigateTo('/books/' + book.id)"
      class="flex items-center gap-x-6 border-b px-6 py-2.5"
    >
      <div
        class="flex items-center justify-center rounded-full border border-gray-500 px-2 py-2"
      >
        <Icon class="h-4 w-4 text-gray-500" name="heroicons:book-open" />
      </div>
      <div class="flex flex-grow flex-col gap-y-2">
        <p class="text-sm font-semibold">
          {{ book.title }}
        </p>
        <p class="text-sm">
          {{ book.genre }}
        </p>
        <p class="text-sm">
          {{ book.category }}
        </p>
        <p class="text-sm">
          {{ formatDate(book.claimedDate) }}
        </p>
      </div>
      <div class="flex items-center">
        <Icon class="h-5 w-5 opacity-75" name="heroicons:chevron-right" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

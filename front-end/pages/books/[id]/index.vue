<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

definePageMeta({
  middleware: "auth",
  layout: "default",
});
useHead({
  title: "Library - Book details",
  meta: [
    {
      name: "description",
      content: "Library Book Page",
    },
  ],
});

const userStore = useUserStore();
const { userId, role } = storeToRefs(userStore);
const cancelVisible = ref(false);
const route = useRoute();

const { data: book, error } = await useFetch(
  "http://localhost:8080/api/v1/books/" + route.params.id,
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  }
);
</script>

<template>
  <div
    class="flex max-w-3xl flex-col justify-around gap-y-4 rounded-md bg-white px-4 py-6 shadow-default"
  >
    <div class="flex justify-between border-b py-2">
      <div>
        <p class="text-2xl font-semibold">Book details</p>
      </div>
      <div>
        <Icon class="h-7 w-7 opacity-75" name="heroicons:book-open" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">Title</p>
        <p>
          {{ book.title }}
        </p>
      </div>
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">Category</p>
        <p>
          {{ book.category.name }}
        </p>
      </div>
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">Genre</p>
        <p>{{ book.genre.name }}</p>
      </div>
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">Language</p>
        <p>{{ book.language.name }}</p>
      </div>
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">ISBN</p>
        <p>{{ book.isbn }}</p>
      </div>
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">Page count:</p>
        <p>{{ book.pageCount }}</p>
      </div>
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">Publisher:</p>
        <p>{{ book.publisher.name }}</p>
      </div>
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">Letter:</p>
        <p>{{ book.letter.name }}</p>
      </div>
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">Release date:</p>
        <p>{{ formatDate(book.releaseDate) }}</p>
      </div>
      <div class="w-17 p-2">
        <p class="text-gray-500 opacity-75">Release date:</p>
        <p>{{ book.authors.map((author) => author.name).join(', ') }}</p>
      </div>
    </div>
    <div class="flex max-w-lg flex-col gap-y-2">
      <label for="summary" class="text-gray-500 opacity-75">Summary:</label>
      <textarea
        id="summary"
        class="w-full rounded-lg border-gray-200 px-3 py-2 text-sm"
        readonly
        disabled
        rows="6"
        cols="50"
        >{{ book.summary }}</textarea
      >
    </div>
  </div>
</template>

<style scoped></style>

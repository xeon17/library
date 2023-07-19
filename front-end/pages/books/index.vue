<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { userId, role } = storeToRefs(userStore);

const apiUrl = "http://localhost:8080/api/v1/books/";
const removeVisible = ref(false);
const currentlySelectedBook = ref();
const search = ref();
let books = ref([]);

definePageMeta({
  middleware: "auth",
  layout: "default",
});

useSeoMeta({
  lang: "en",
  title: "Library - Books",
  ogTitle: "Library - Books",
  description: "Library App Books Page",
  ogDescription: "Library App Books Page",
  ogImage: "/logo.png",
});


const fetchData = async() => {
  const { data } = await useFetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  });
  if(data){
    books.value = data.value;
  }
}

await fetchData();

const toggleRemoveMenu = (value, book) => {
  removeVisible.value = value;
  if (book) {
    currentlySelectedBook.value = book;
  }
};

const filterBooks = async () => {
  const { data } = await useFetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
    params: {
      search: search.value,
    },
  });
  if (data) {
    books.value = data.value;
  }
};

const attemptRemoveBook = async () => {
  const { data: response } = await useFetch(
    apiUrl + currentlySelectedBook.value,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userStore.token,
      },
    }
  );
  if (response.value) {
    toggleRemoveMenu(false);
    await fetchData();
  }
};
</script>

<template>
  <teleport to="body">
    <div
      v-if="removeVisible"
      class="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center"
    >
      <LazyRemoveDialog
        :visible="removeVisible"
        title="Remove Book"
        text="Are you sure you want to remove this book?"
        @close="toggleRemoveMenu(false)"
        @cancel="attemptRemoveBook"
      ></LazyRemoveDialog>
    </div>
  </teleport>
  <div class="flex flex-col">
    <div class="-m-1.5">
      <div class="inline-block min-w-full p-1.5 align-middle">
        <div class="divide-y divide-gray-200 rounded-lg border bg-white">
          <div class="flex flex-col gap-y-6 px-4 py-3">
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-y-2">
                <h2 class="text-xl leading-6">Books</h2>
                <p class="text-sm text-gray-500">
                  A list of all the books in the library.
                </p>
              </div>
              <div v-if="role === 'Librarian' || role === 'Admin'">
                <button
                  class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                  type="button"
                  @click="navigateTo('/books/add')"
                >
                  <Icon class="mr-1 h-5 w-5" name="heroicons:book-open" />
                  Add book
                </button>
              </div>
            </div>
            <div class="relative max-w-xs">
              <label for="hs-table-search" class="sr-only">Search</label>
              <input
                type="text"
                v-model="search"
                @change="filterBooks"
                name="hs-table-search"
                id="hs-table-search"
                class="block w-full rounded-md border-gray-200 p-3 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search for items"
              />
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
              >
                <svg
                  class="h-3.5 w-3.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Publisher
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  class="hover:cursor-pointer hover:bg-gray-50"
                  v-for="book in books"
                  :key="book.id"
                >
                  <td
                    class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800"
                  >
                    <div>{{ book.title }}</div>
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                    {{ book.category.name }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                    {{ book.authors.map((author) => author.name).join(', ') }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                    {{ book.genre.name }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-800">
                    {{ book.publisher.name }}
                  </td>
                  <td
                    class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                  >
                    <div class="flex items-center gap-x-3">
                      <button
                        class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                        type="button"
                        @click="navigateTo('/books/' + book.id)"
                      >
                        <Icon
                          class="mr-1 h-5 w-5"
                          name="heroicons:information-circle"
                        />
                        Details
                      </button>
                      <div
                        v-if="role === 'Librarian' || role === 'Admin'"
                        class="flex items-center gap-x-3"
                      >
                        <button
                          class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                          type="button"
                          @click="navigateTo('/books/' + book.id + '/edit')"
                        >
                          <Icon
                            class="mr-1 h-5 w-5"
                            name="heroicons:pencil-square"
                          />
                          Edit
                        </button>
                        <button
                          class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                          type="button"
                          @click="toggleRemoveMenu(true, book.id)"
                        >
                          <Icon class="mr-1 h-5 w-5" name="heroicons:trash" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

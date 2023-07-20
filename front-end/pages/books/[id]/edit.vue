<script setup>
definePageMeta({
  middleware: ["auth", "librarian"],
  layout: "default",
});

useSeoMeta({
  lang: "en",
  title: "Library - Add a book",
  ogTitle: "Library - Add a book",
  description: "Library App Book adding page",
  ogDescription: "Library App Book adding page",
  ogImage: "/logo.png",
});

import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const route = useRoute();
const { apiUrl } = useRuntimeConfig().public;

const alerts = reactive([]);
const title = ref();
const category = ref();
const publisher = ref();
const genre = ref();
const author = ref([]);
const language = ref();
const letter = ref();
const format = ref();
const pageCount = ref();
const isbn = ref();
const releaseDate = ref();
const summary = ref();

const { data: book } = await useFetch(
  apiUrl + '/books/' + route.params.id,
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  }
);

if (book) {
  title.value = book.value.title;
  isbn.value = book.value.isbn;
  summary.value = book.value.summary;
  pageCount.value = book.value.pageCount;
  const parsedDate = new Date(book.value.releaseDate);
  releaseDate.value = parsedDate.toISOString().split("T")[0];
  category.value = book.value.category.id;
  publisher.value = book.value.publisher.id;
  genre.value = book.value.genre.id;
  language.value = book.value.language.id;
  author.value = book.value.authors;
  letter.value = book.value.letter.id;
  format.value = book.value.format.id;
}

const { data: categories } = await useFetch(
    apiUrl + '/categories/',
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  }
);

const { data: genres } = await useFetch(
    apiUrl + '/genres/',
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  }
);

const { data: publishers } = await useFetch(
    apiUrl + '/publishers/',
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  }
);

const { data: letters } = await useFetch(
    apiUrl + '/letters/',
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  }
);

const { data: languages } = await useFetch(
    apiUrl + '/languages/',
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  }
);

const { data: formats } = await useFetch(
    apiUrl + '/formats/',
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  }
);

const { data: authors } = await useFetch(
    apiUrl + '/authors/',
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userStore.token,
    },
  }
);

const submitForm = async () => {
  try {
    const { data, error } = await useFetch(
      apiUrl + '/books/' + route.params.id,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        body: {
          title: title.value,
          category: category.value,
          publisher: publisher.value,
          genre: genre.value,
          letter: letter.value,
          language: language.value,
          format: format.value,
          summary: summary.value,
          pageCount: pageCount.value,
          isbn: isbn.value,
          releaseDate: new Date(releaseDate.value),
          authors: author.value,
        },
      }
    );

    if (error.value) {
      throw new Error(error.value.message);
    }
    if (data.value) {
      navigateTo("/books/" + route.params.id, { replace: true });
    }
  } catch (e) {
    showAlert("error", "Error", e.message);
  }
};

function showAlert(type, title, description) {
  const newAlert = {
    id: generateRandomId(),
    type,
    title,
    description,
    visible: true,
  };

  alerts.push(newAlert);

  setTimeout(() => {
    hideAlert(newAlert);
  }, 5000);
}

function hideAlert(alert) {
  alert.visible = false;
  alerts.splice(alerts.indexOf(alert), 1);
}

function generateRandomId() {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2);
  return timestamp + randomNum;
}
</script>

<template>
  <div class="absolute right-0 top-0 mr-2 mt-2">
    <notification
      v-for="alert in alerts"
      :key="alert.id"
      :alert-type="alert.type"
      :title="alert.title"
      :description="alert.description"
      :visible="alert.visible"
      @close="hideAlert(alert)"
      class="mb-4"
    ></notification>
  </div>
  <div class="max-w-4xl">
    <div class="rounded-lg border bg-white p-4 sm:p-7">
      <form @submit.prevent="submitForm">
        <div
          class="grid gap-2 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 sm:grid-cols-12 sm:gap-4"
        >
          <div class="sm:col-span-12">
            <h2 class="text-lg font-semibold text-gray-800">Basic details</h2>
          </div>

          <div class="sm:col-span-3">
            <label
              for="title"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Title
            </label>
          </div>

          <div class="sm:col-span-9">
            <input
              v-model="title"
              id="title"
              type="text"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div class="sm:col-span-3">
            <label
              for="category"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Category
            </label>
          </div>

          <div class="sm:col-span-9">
            <select
              v-model="category"
              id="category"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option selected disabled>Select a category</option>
              <option
                v-for="category in categories.documents"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label
              for="publisher"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Publisher
            </label>
          </div>

          <div class="sm:col-span-9">
            <select
              v-model="publisher"
              id="publisher"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option selected disabled>Select a publisher</option>
              <option
                v-for="publisher in publishers.documents"
                :key="publisher.id"
                :value="publisher.id"
              >
                {{ publisher.name }}
              </option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label
              for="genre"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Genre
            </label>
          </div>

          <div class="sm:col-span-9">
            <select
              v-model="genre"
              id="genre"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option selected>Select a genre</option>
              <option
                v-for="genre in genres.documents"
                :key="genre.id"
                :value="genre.id"
              >
                {{ genre.name }}
              </option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label
              for="author"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Authors
            </label>
          </div>

          <div class="sm:col-span-9">
            <HeadlessListbox v-model="author" multiple>
              <div class="relative mt-1">
                <HeadlessListboxButton
                  class="relative w-full cursor-default rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">
                    {{ author.map((author) => author.name).join(", ") }}</span
                  >
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <Icon
                      class="h-5 w-5 text-gray-400"
                      name="heroicons:chevron-up-down"
                    />
                  </span>
                </HeadlessListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <HeadlessListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <HeadlessListboxOption
                      v-for="author in authors.documents"
                      v-slot="{ active, selected }"
                      :key="author.id"
                      :value="author"
                      as="template"
                    >
                      <li
                        :class="[
                          active ? 'bg-slate-400 text-white' : 'text-slate-500',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span
                          :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]"
                          >{{ author.name }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500"
                        >
                          <Icon class="h-5 w-5" name="heroicons:check" />
                        </span>
                      </li>
                    </HeadlessListboxOption>
                  </HeadlessListboxOptions>
                </transition>
              </div>
            </HeadlessListbox>
          </div>

          <div class="sm:col-span-3">
            <label
              for="language"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Language
            </label>
          </div>

          <div class="sm:col-span-9">
            <select
              v-model="language"
              id="language"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option selected>Select a language</option>
              <option
                v-for="language in languages.documents"
                :key="language.id"
                :value="language.id"
              >
                {{ language.name }}
              </option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label
              for="releaseDate"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Release date
            </label>
          </div>

          <div class="sm:col-span-9">
            <input
              v-model="releaseDate"
              id="releaseDate"
              type="date"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div
          class="grid gap-2 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 sm:grid-cols-12 sm:gap-4"
        >
          <div class="sm:col-span-12">
            <h2 class="text-lg font-semibold text-gray-800">Specification</h2>
          </div>

          <div class="sm:col-span-3">
            <label
              for="pageCount"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Page count
            </label>
          </div>
          <div class="sm:col-span-9">
            <input
              v-model.number="pageCount"
              id="pageCount"
              type="text"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div class="sm:col-span-3">
            <label
              for="isbn"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              ISBN
            </label>
          </div>

          <div class="sm:col-span-9">
            <input
              v-model="isbn"
              id="isbn"
              type="text"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div class="sm:col-span-3">
            <label
              for="letter"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Letter
            </label>
          </div>

          <div class="sm:col-span-9">
            <select
              v-model="letter"
              id="letter"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option selected>Select a letter</option>
              <option
                v-for="letter in letters.documents"
                :key="letter.id"
                :value="letter.id"
              >
                {{ letter.name }}
              </option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label
              for="format"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Format
            </label>
          </div>

          <div class="sm:col-span-9">
            <select
              v-model="format"
              id="format"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option selected>Select a format</option>
              <option
                v-for="format in formats.documents"
                :key="format.id"
                :value="format.id"
              >
                {{ format.name }}
              </option>
            </select>
          </div>
        </div>

        <div
          class="grid gap-2 border-t border-gray-200 py-8 first:border-transparent first:pt-0 last:pb-0 sm:grid-cols-12 sm:gap-4"
        >
          <div class="sm:col-span-12">
            <h2 class="text-lg font-semibold text-gray-800">Summary</h2>
          </div>
          <div class="sm:col-span-3">
            <label
              for="text"
              class="mt-2.5 inline-block text-sm font-medium text-gray-500"
            >
              Text
            </label>
          </div>
          <div class="sm:col-span-9">
            <textarea
              v-model="summary"
              id="text"
              required
              class="block w-full rounded-lg border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              rows="6"
              placeholder="A detailed summary of the book."
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-loginButton px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-loginHover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit book
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

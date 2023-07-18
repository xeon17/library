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

const alerts = reactive([]);
const title = ref();
const category = ref();
const publisher = ref();
const genre = ref();
const author = ref();
const language = ref();
const letter = ref();
const format = ref();
const pageCount = ref();
const isbn = ref();
const releaseDate = ref();
const summary = ref();

const { data: book } = await useFetch("http://localhost:8080/api/v1/books/" + route.params.id, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});

if(book){
  title.value = book.value.title;
  isbn.value = book.value.isbn;
  summary.value = book.value.summary;
  pageCount.value = book.value.pageCount;

  const parsedDate = new Date(book.value.releaseDate);
  releaseDate.value = parsedDate.toISOString().split("T")[0];
  console.log(book.value.category)
  category.value = book.value.category.id;
  publisher.value = book.value.publisher.id;
  genre.value = book.value.genre.id;
  author.value = book.value.author.id;
  language.value = book.value.language.id;
  letter.value = book.value.letter.id;
  format.value = book.value.format.id;
}

const { data: categories } = await useFetch("http://localhost:8080/api/v1/categories/", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});

const { data: genres } = await useFetch("http://localhost:8080/api/v1/genres/", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});

const { data: publishers } = await useFetch("http://localhost:8080/api/v1/publishers/", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});

const { data: letters } = await useFetch("http://localhost:8080/api/v1/letters/", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});

const { data: languages } = await useFetch("http://localhost:8080/api/v1/languages/", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});

const { data: formats } = await useFetch("http://localhost:8080/api/v1/formats/", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});

const { data: authors } = await useFetch("http://localhost:8080/api/v1/authors/", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});


const submitForm = async() => {
  try{
    const { data, error } = await useFetch("http://localhost:8080/api/v1/books/" + route.params.id, {
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
        author: author.value
      }
    });

    if(error.value) {
      throw new Error(error.value.message);
    }
    if(data.value) {
      navigateTo("/books/" + route.params.id, {replace: true});
    }
  }catch(e){
    showAlert("error", "Error", e.message);
  }
}

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
    <div class="bg-white rounded-lg border p-4 sm:p-7">
      <form @submit.prevent="submitForm">
        <div class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
          <div class="sm:col-span-12">
            <h2 class="text-lg font-semibold text-gray-800">
              Basic details
            </h2>
          </div>

          <div class="sm:col-span-3">
            <label for="title" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Title
            </label>
          </div>

          <div class="sm:col-span-9">
            <input v-model="title" id="title" type="text" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
          </div>

          <div class="sm:col-span-3">
            <label for="category" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Category
            </label>
          </div>

          <div class="sm:col-span-9">
            <select v-model="category" id="category" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <option selected disabled>Select a category</option>
              <option v-for="category in categories.documents" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label for="publisher" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Publisher
            </label>
          </div>

          <div class="sm:col-span-9">
            <select v-model="publisher" id="publisher" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <option selected disabled>Select a publisher</option>
              <option v-for="publisher in publishers.documents" :key="publisher.id" :value="publisher.id">{{ publisher.name }}</option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label for="genre" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Genre
            </label>
          </div>

          <div class="sm:col-span-9">
            <select v-model="genre" id="genre" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <option selected>Select a genre</option>
              <option v-for="genre in genres.documents" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label for="author" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Author
            </label>
          </div>

          <div class="sm:col-span-9">
            <select v-model="author" id="author" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <option selected>Select an author</option>
              <option v-for="author in authors.documents" :key="author.id" :value="author.id">{{ author.name }}</option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label for="language" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Language
            </label>
          </div>

          <div class="sm:col-span-9">
            <select v-model="language" id="language" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <option selected>Select a language</option>
              <option v-for="language in languages.documents" :key="language.id" :value="language.id">{{ language.name }}</option>
            </select>
          </div>

          <div class="sm:col-span-3">
            <label for="releaseDate" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Release date
            </label>
          </div>

          <div class="sm:col-span-9">
            <input v-model="releaseDate" id="releaseDate" type="date" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
          </div>
        </div>

        <div class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
          <div class="sm:col-span-12">
            <h2 class="text-lg font-semibold text-gray-800">
              Specification
            </h2>
          </div>

          <div class="sm:col-span-3">
            <label for="pageCount" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Page count
            </label>
          </div>
          <div class="sm:col-span-9">
            <input v-model.number="pageCount" id="pageCount" type="text" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
          </div>

          <div class="sm:col-span-3">
            <label for="isbn" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              ISBN
            </label>
          </div>

          <div class="sm:col-span-9">
            <input v-model="isbn" id="isbn" type="text" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
          </div>

          <div class="sm:col-span-3">
            <label for="letter" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Letter
            </label>
          </div>

          <div class="sm:col-span-9">
            <select v-model="letter" id="letter" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <option selected>Select a letter</option>
              <option v-for="letter in letters.documents" :key="letter.id" :value="letter.id">{{ letter.name }}</option>

            </select>
          </div>

          <div class="sm:col-span-3">
            <label for="format" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Format
            </label>
          </div>

          <div class="sm:col-span-9">
            <select v-model="format" id="format" required class="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500">
              <option selected>Select a format</option>
              <option v-for="format in formats.documents" :key="format.id" :value="format.id">{{ format.name }}</option>
            </select>
          </div>
        </div>

        <div class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
          <div class="sm:col-span-12">
            <h2 class="text-lg font-semibold text-gray-800">
              Summary
            </h2>
          </div>
          <div class="sm:col-span-3">
            <label for="text" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
              Text
            </label>
          </div>
          <div class="sm:col-span-9">
            <textarea v-model="summary" id="text" required class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" rows="6" placeholder="A detailed summary of the book."></textarea>
          </div>
        </div>
        <button type="submit" class="py-3 px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-loginButton text-white hover:bg-loginHover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
          Edit book
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
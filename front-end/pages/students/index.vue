<script setup>
import {useUserStore} from "~/stores/user";
import {storeToRefs} from "pinia";
const userStore = useUserStore();
const {userId, role} = storeToRefs(userStore);

const apiUrl = "http://localhost:8080/api/v1/users/";
const removeVisible = ref(false);
const currentlySelectedStudent = ref();
const search = ref();
const students = ref([]);

definePageMeta({
  middleware: "auth",
  layout: "default",
});

useSeoMeta({
  lang: "en",
  title: "Library - Students",
  ogTitle: "Library - Students",
  description: "Library App Students Page",
  ogDescription: "Library App Students Page",
  ogImage: "/logo.png",
});

const { data, error, refresh } = await useFetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
  params: {
    role: 'Student',
  },
});

if(data){
  students.value = data.value;
}

const toggleRemoveMenu = (value, student) => {
  removeVisible.value = value;
  if(student) {
    currentlySelectedStudent.value = student;
  }
};

const filterStudents = async () => {
  const { data } = await useFetch(
      apiUrl,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        params: {
          role: 'Student',
          search: search.value,
        },
      }
  );
  if(data){
    students.value = data.value;
  }
}

const attemptRemoveStudent = async () => {
  const { data: response } = await useFetch(
      apiUrl + currentlySelectedStudent.value,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      }
  );
  if (response.value) {
    toggleRemoveMenu(false);
    refresh()
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
          title="Remove Student"
          text="Are you sure you want to remove this student?"
          @close="toggleRemoveMenu(false)"
          @cancel="attemptRemoveStudent"
      ></LazyRemoveDialog>
    </div>
  </teleport>
  <div class="flex flex-col">
    <div class="-m-1.5">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border bg-white rounded-lg divide-y divide-gray-200">
          <div class="flex flex-col gap-y-6 py-3 px-4">
            <div class="flex justify-between items-center">
              <div class="flex flex-col gap-y-2">
                <h2 class="text-xl leading-6">Students</h2>
                <p class="text-sm text-gray-500">A list of all the students in the library including their name, email,
                  gender and birth date.</p>
              </div>
              <div v-if="role === 'Librarian' || role === 'Admin'">
                <button
                    class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                    type="button"
                    @click="navigateTo('/students/add')"
                >
                  <Icon class="mr-1 h-5 w-5" name="material-symbols:local-library-outline-rounded"/>
                  Add student
                </button>
              </div>
            </div>
            <div class="relative max-w-xs">
              <label for="hs-table-search" class="sr-only">Search</label>
              <input type="text" v-model="search" @change="filterStudents" name="hs-table-search" id="hs-table-search"
                     class="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                     placeholder="Search for items">
              <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                <svg class="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                     fill="currentColor" viewBox="0 0 16 16">
                  <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500">Birth date</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500">Last login</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500">Action</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr class="hover:bg-gray-50 hover:cursor-pointer" v-for="student in students" :key="student.id">
                <td class="flex gap-x-2 items-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  <div class="h-8 w-8">
                    <nuxt-img
                        class="h-full w-full rounded-full object-cover object-center"
                        :src="getImageSource(student.photo)"
                        alt="Doctor picture"
                    />
                  </div>
                  <div>
                    {{ student.firstName }} {{ student.lastName }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ student.email }}</td>
                <td v-if="student.birthDate === null" class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  Unknown
                </td>
                <td v-else class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{
                    formatDate(student.birthDate)
                  }}
                </td>

                <td v-if="student.lastLogin === null" class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Did not
                  login yet
                </td>
                <td v-else class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {{ getTimeSinceDate(student.lastLogin) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex flex-row gap-x-3 items-center">
                    <button
                        class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                        type="button"
                        @click="navigateTo('/profile/' + student.id)"
                    >
                      <Icon class="mr-1 h-5 w-5" name="heroicons:identification"/>
                      Details
                    </button>
                    <div v-if="role === 'Admin'" class="flex gap-x-3 items-center">
                      <button
                          class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                          type="button"
                          @click="navigateTo('/students/add')"
                      >
                        <Icon class="mr-1 h-5 w-5" name="heroicons:pencil-square"/>
                        Edit
                      </button>
                      <button
                          class="flex items-center rounded border border-blue-500 px-2 py-2 font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                          type="button"
                          @click="toggleRemoveMenu(true, student.id )"
                      >
                        <Icon class="mr-1 h-5 w-5" name="heroicons:trash"/>
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

<style scoped>

</style>
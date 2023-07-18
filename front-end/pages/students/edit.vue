<template>
  <div class="max-w-lg rounded-xl bg-white p-8 shadow-default">
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
    <form @submit.prevent="submitForm">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="firstName"
                class="block text-sm font-medium leading-6 text-gray-900"
                >First name</label
              >
              <div class="mt-2">
                <input
                  required
                  v-model.trim="firstName"
                  type="text"
                  name="firstName"
                  id="firstName"
                  autocomplete="given-name"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="lastName"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Last name</label
              >
              <div class="mt-2">
                <input
                  required
                  v-model.trim="lastName"
                  type="text"
                  name="lastName"
                  id="lastName"
                  autocomplete="family-name"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
              <div class="mt-2">
                <input
                  required
                  v-model.trim="password"
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="password"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="confirmPassword"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Confirm password</label
              >
              <div class="mt-2">
                <input
                  required
                  v-model.trim="passwordConfirm"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autocomplete="confirm-password"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="photo"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Photo</label
              >
              <div class="mt-2 flex items-center gap-x-3">
                <svg
                  class="h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <button
                  type="button"
                  class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  required
                  v-model.trim="email"
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="username"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Username</label
              >
              <div class="mt-2">
                <input
                  required
                  v-model.trim="username"
                  id="username"
                  name="username"
                  type="text"
                  autocomplete="username"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="gender"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Gender</label
              >
              <div class="mt-2">
                <select
                  v-model="gender"
                  id="gender"
                  name="country"
                  autocomplete="gender"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled selected value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="birthDate"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Birth date</label
              >
              <div class="mt-2">
                <input
                  v-model="birthDate"
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  autocomplete="birth-date"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="street-address"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Street address</label
              >
              <div class="mt-2">
                <input
                  v-model.trim="address"
                  type="text"
                  name="street-address"
                  id="street-address"
                  autocomplete="street-address"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label
                for="city"
                class="block text-sm font-medium leading-6 text-gray-900"
                >City</label
              >
              <div class="mt-2">
                <input
                  v-model.trim="city"
                  type="text"
                  name="city"
                  id="city"
                  autocomplete="address-level2"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Country</label
              >
              <div class="mt-2">
                <select
                  v-model="country"
                  id="country"
                  name="country"
                  autocomplete="country"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled selected value="">
                    Select your country
                  </option>
                  <option value="Montenegro">Montenegro</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          @click="navigateTo('/students')"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-loginButton px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-loginHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "librarian"],
  layout: "default",
});

useSeoMeta({
  lang: "en",
  title: "Library - Add student",
  ogTitle: "Library - Add student",
  description: "Library App Add student page",
  ogDescription: "Library App Add student page",
  ogImage: "/logo.png",
});

import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

const firstName = ref();
const lastName = ref();
const password = ref();
const passwordConfirm = ref();
const email = ref();
const username = ref();
const gender = ref();
const birthDate = ref();
const address = ref();
const city = ref();
const country = ref();
const alerts = reactive([]);

const submitForm = async () => {
  if (password.value !== passwordConfirm.value) {
    return showAlert("error", "Something went wrong", "Passwords do not match");
  }
  try {
    await userStore.create({
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      email: email.value,
      username: username.value,
      gender: gender.value,
      birthDate: birthDate.value,
      address: address.value,
      city: city.value,
      country: country.value,
      role: "Student",
    });
  } catch (error) {
    showAlert("error", "Something went wrong", error.message);
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

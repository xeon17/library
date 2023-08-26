<script setup lang="ts">
import EditProfileSchema from "~/schemas/EditProfileSchema";

definePageMeta({
  middleware: "auth",
  layout: "default",
});

useSeoMeta({
  lang: "en",
  title: "Library - Edit profile",
  ogTitle: "Library - Edit profile",
  description: "Library App Edit profile page",
  ogDescription: "Library App Edit profile page",
  ogImage: "/logo.png",
});

import { useUserStore } from "~/stores/user";
import { IUser } from "~/interfaces/IUser";
import { type Input } from "valibot";

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);
const { apiUrl } = useRuntimeConfig().public;
const loading = ref<boolean>(false);

const { data: user, status } = await useFetch<IUser>("/users/" + userId.value, {
  method: "GET",
  baseURL: apiUrl,
  headers: {
    Authorization: "Bearer " + userStore.token,
  },
});

type EditProfileInput = Input<typeof EditProfileSchema>;
const formState = ref<EditProfileInput>({
  name: "",
  email: "",
  username: "",
  gender: "",
  birthDate: new Date(),
  address: "",
  city: "",
  country: "",
  photo: undefined,
});

if (user?.value && status.value === "success") {
  formState.value = {
    name: user.value.name,
    email: user.value.email,
    username: user.value.username,
    gender: user.value.gender,
    birthDate: new Date(user.value.birthDate),
    address: user.value.address,
    city: user.value.city,
    country: user.value.country,
    photo: undefined,
  };
}

const onImageSubmit = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || !target.files[0]) return;

  const photoFile = new File([target.files[0]], target.files[0].name); // Create a new File instance

  const formData = new FormData();
  formData.append("photo", photoFile);
  formState.value.photo = photoFile;

  try {
    await userStore.updatePhoto(formData);
  } catch (error: any) {
    console.log(error.message);
  }
};

const handleSubmit = async (data: EditProfileInput) => {
  try {
    await userStore.update(data);
  } catch (error: any) {
    console.log(error.message);
  }
};
</script>

<template>
  <div class="max-w-lg rounded-xl bg-white p-8 shadow-default">
    <base-form
      @submit="handleSubmit"
      :schema="EditProfileSchema"
      :state="formState"
    >
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Customize Your Personal Information
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <base-input
                id="name"
                type="text"
                v-model="formState.name"
                :schema="EditProfileSchema.object.name"
                label="Name"
                icon="heroicons:user"
                required
              />
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
                <input
                  @change="onImageSubmit"
                  class="hidden"
                  accept="image/jpeg, image/png"
                  type="file"
                  ref="file"
                />
                <button
                  type="button"
                  @click="$refs.file.click()"
                  class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div class="sm:col-span-4">
              <base-input
                id="email"
                type="text"
                v-model="formState.email"
                :schema="EditProfileSchema.object.email"
                label="Email"
                autocomplete="on"
                placeholder="example@example.com"
                icon="heroicons:envelope"
                required
              />
            </div>

            <div class="sm:col-span-4">
              <base-input
                id="username"
                type="text"
                v-model="formState.username"
                :schema="EditProfileSchema.object.username"
                label="Username"
                icon="heroicons:user"
                required
              />
            </div>

            <div class="sm:col-span-3">
              <label
                for="gender"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Gender</label
              >
              <div class="mt-2">
                <USelectMenu
                  v-model="formState.gender"
                  placeholder="Select your gender"
                  :options="['Male', 'Female', 'Other']"
                />
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
                  v-model="formState.birthDate"
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  autocomplete="birth-date"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="col-span-full">
              <UFormGroup label="Address" name="address">
                <UInput
                  v-model.trim="formState.address"
                  icon="i-heroicons-map-pin"
                  class="block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </UFormGroup>
            </div>

            <div class="sm:col-span-3">
              <base-input
                id="city"
                type="text"
                v-model="formState.city"
                :schema="EditProfileSchema.object.city"
                label="City"
              />
            </div>

            <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Country</label
              >
              <div class="mt-2">
                <USelectMenu
                  v-model="formState.country"
                  placeholder="Select your country"
                  :options="['Montenegro']"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <UButtonGroup size="sm">
          <UButton
            type="button"
            color="gray"
            variant="ghost"
            @click="navigateTo('/profile')"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            color="blue"
            :loading="loading"
            :disabled="loading"
            class="rounded-md text-sm font-semibold leading-6 text-white shadow-sm"
          >
            {{ loading ? "Loading..." : "Save" }}
          </UButton>
        </UButtonGroup>
      </div>
    </base-form>
  </div>
</template>

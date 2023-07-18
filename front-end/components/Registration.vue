<template>
  <div
    class="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-default sm:mx-24 sm:my-24"
  >
    <teleport to="body">
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
    </teleport>
    <h1 class="text-4xl font-medium">Registration</h1>
    <form @submit.prevent="submitRegistration" class="my-10">
      <div class="flex flex-col space-y-5">
        <label
          for="firstName"
          class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            v-model.trim="firstName"
            required
            type="text"
            id="firstName"
            placeholder="First name"
            class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span
            class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            First name
          </span>
        </label>
        <label
          for="lastName"
          class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            v-model.trim="lastName"
            required
            type="text"
            id="lastName"
            placeholder="Last name"
            class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span
            class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Last name
          </span>
        </label>
        <label
          for="email"
          class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            v-model.trim="email"
            required
            type="email"
            id="email"
            placeholder="Email"
            class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span
            class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Email
          </span>
        </label>
        <label
          for="password"
          class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            v-model.trim="password"
            required
            min="8"
            type="password"
            id="password"
            placeholder="Password"
            class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span
            class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Password
          </span>
        </label>
        <label
          for="confirmPassword"
          class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            v-model.trim="confirmPassword"
            required
            min="8"
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span
            class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Confirm password
          </span>
        </label>
        <label
            for="username"
            class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
              v-model.trim="username"
              required
              type="text"
              id="username"
              placeholder="Username"
              class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span
              class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Username
          </span>
        </label>
        <button
          type="submit"
          class="inline-flex w-full items-center justify-center space-x-2 rounded-lg border-loginButton bg-loginButton py-3 font-medium text-white hover:bg-loginHover hover:shadow"
        >
          <Icon class="h-5 w-5" name="material-symbols:login" />
          <span>Sign Up</span>
        </button>
        <p class="text-center">
          Already have an account?
          <nuxt-link
            to="/login"
            class="inline-flex items-center space-x-1 font-medium text-loginButton"
            ><span>Login now! </span>
          </nuxt-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const firstName = ref();
const lastName = ref();
const email = ref();
const password = ref();
const confirmPassword = ref();
const username = ref();
const userStore = useUserStore();
const alerts = reactive([]);

async function submitRegistration() {
  if(password.value !== confirmPassword.value) {
    return showAlert("error", "Something went wrong", "Passwords do not match");
  }
  try {
    await userStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      passwordConfirm: confirmPassword.value,
      username: username.value,
    });
  } catch (error) {
    showAlert("error", "Something went wrong", error.message);
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

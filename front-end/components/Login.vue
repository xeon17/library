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

    <h1 class="text-4xl font-medium">Login</h1>
    <p class="mt-2 text-slate-500">Sign in to your account to continue.</p>
    <form @submit.prevent="submitLogin" class="my-10">
      <div class="flex flex-col space-y-5">
        <label for="email">
          <p class="pb-2 font-medium text-slate-700">Email address</p>
          <Icon class="absolute my-3 ml-3 h-5 w-5" name="heroicons:user" />
          <input
            v-model.trim="email"
            id="email"
            name="email"
            required
            type="email"
            class="w-full rounded-lg border border-slate-200 bg-gray-200 px-10 py-3 focus:border-slate-500 focus:bg-gray-100 focus:outline-none"
            placeholder="name@example.com"
          />
        </label>
        <label for="password">
          <p class="pb-2 font-medium text-slate-700">Password</p>
          <Icon class="absolute my-3 ml-3 h-5 w-5" name="heroicons:lock-closed" />
          <input
            v-model.trim="password"
            id="password"
            name="password"
            required
            type="password"
            class="w-full rounded-lg border border-slate-200 bg-gray-200 px-10 py-3 focus:border-slate-500 focus:bg-gray-100 focus:outline-none"
            placeholder="Enter your password"
          />
        </label>
        <div class="flex flex-row justify-between">
          <div>
            <label for="remember" class="">
              <input
                type="checkbox"
                id="remember"
                class="h-4 w-4 border-slate-200 focus:bg-indigo-600"
              />
              Remember me?
            </label>
          </div>
          <div>
            <a href="#" class="font-medium text-loginButton"
              >Forgot Password?</a
            >
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex w-full items-center justify-center space-x-2 rounded-lg border-loginButton bg-loginButton py-3 font-medium text-white hover:bg-loginHover hover:shadow"
        >
          <Icon class="h-5 w-5" name="material-symbols:login" />
          <span>Sign in</span>
        </button>
        <p class="text-center">
          Not registered yet?
          <nuxt-link
            to="/registration"
            class="inline-flex items-center space-x-1 font-medium text-loginButton"
            ><span>Register now! </span>
          </nuxt-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const email = ref();
const password = ref();

const alerts = reactive([]);
const userStore = useUserStore();

async function submitLogin() {
  try {
    await userStore.login({
      email: email.value,
      password: password.value,
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

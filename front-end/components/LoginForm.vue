<template>
  <div class="mx-auto w-full max-w-lg p-6">
    <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800">Sign in</h1>
          <p class="mt-2 text-sm text-gray-600">
            Don't have an account yet?
            <nuxt-link
              class="font-medium text-blue-600 decoration-2 hover:underline"
              to="/registration"
            >
              Sign up here
            </nuxt-link>
          </p>
        </div>

        <div class="mt-5">
          <button
            type="button"
            class="inline-flex w-full items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
          >
            <svg
              class="h-auto w-4"
              width="46"
              height="47"
              viewBox="0 0 46 47"
              fill="none"
            >
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              />
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              />
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              />
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              />
            </svg>
            Sign in with Google
          </button>

          <div
            class="flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200"
          >
            Or
          </div>

          <base-form
            @submit="handleSubmit"
            :schema="LoginSchema"
            :state="formState"
          >
            <div class="relative">
              <base-input
                id="email"
                type="text"
                v-model="formState.email"
                :schema="LoginSchema.object.email"
                label="Email"
                autocomplete="on"
                placeholder="example@example.com"
                icon="heroicons:user"
                required
              />
            </div>
            <div class="flex items-center justify-end">
              <nuxt-link
                class="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                to="/login/forgot-password"
                >Forgot password?
              </nuxt-link>
            </div>
            <div class="relative">
              <base-input
                id="password"
                type="password"
                v-model="formState.password"
                :schema="LoginSchema.object.password"
                label="Password"
                placeholder="********"
                icon="heroicons:lock-closed"
                required
              />
            </div>
            <div class="relative">
              <UCheckbox v-model="formState.remember" label="Remember me?" />
            </div>
            <UButton
              type="submit"
              color="blue"
              :loading="loading"
              :disabled="loading"
              class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {{ loading ? "Loading..." : "Sign In" }}
            </UButton>
          </base-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import LoginSchema from "~/schemas/LoginSchema";
import { type Input } from "valibot";

type LoginInput = Input<typeof LoginSchema>;
const formState = ref<LoginInput>({
  email: "",
  password: "",
  remember: true,
});

const alerts = reactive([]);
const loading = ref<boolean>(false);
const userStore = useUserStore();

const handleSubmit = async (data: LoginInput) => {
  try {
    loading.value = true;
    await userStore.login(data);
  } catch (error: any) {
    showAlert("error", "Error", error.message);
  } finally {
    loading.value = false;
  }
};

function showAlert(type: string, title: string, description: string) {
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

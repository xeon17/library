<script setup lang="ts"></script>

<template>
  <!-- Card Section -->
  <div class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <!-- Card -->
    <div class="rounded-xl bg-white p-4 shadow sm:p-7">
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-800">Profile</h2>
        <p class="text-sm text-gray-600">
          Manage your name, password and account settings.
        </p>
      </div>

      <form>
        <!-- Grid -->
        <div class="grid gap-2 sm:grid-cols-12 sm:gap-6">
          <div class="sm:col-span-3">
            <label class="mt-2.5 inline-block text-sm text-gray-800">
              Profile photo
            </label>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-9">
            <div class="flex items-center gap-5">
              <img
                class="inline-block h-16 w-16 rounded-full ring-2 ring-white"
                src="../assets/img/160x160/img1.jpg"
                alt="Image Description"
              />
              <div class="flex gap-x-2">
                <div>
                  <button
                    type="button"
                    class="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    <svg
                      class="h-3 w-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                      />
                      <path
                        d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"
                      />
                    </svg>
                    Upload photo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-3">
            <label
              for="af-account-full-name"
              class="mt-2.5 inline-block text-sm text-gray-800"
            >
              Full name
            </label>
            <div class="hs-tooltip inline-block">
              <button type="button" class="hs-tooltip-toggle ml-1">
                <svg
                  class="inline-block h-3 w-3 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                  />
                </svg>
              </button>
              <span
                class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-10 inline-block w-40 rounded-md bg-gray-900 px-2 py-1 text-center text-xs font-medium text-white opacity-0 shadow-sm transition-opacity"
                role="tooltip"
              >
                Displayed on public forums, such as Preline
              </span>
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-9">
            <div class="sm:flex">
              <input
                id="af-account-full-name"
                type="text"
                class="relative -ml-px -mt-px block w-full border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
                placeholder="Maria"
              />
              <input
                type="text"
                class="relative -ml-px -mt-px block w-full border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
                placeholder="Boone"
              />
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-3">
            <label
              for="af-account-email"
              class="mt-2.5 inline-block text-sm text-gray-800"
            >
              Email
            </label>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-9">
            <input
              id="af-account-email"
              type="email"
              class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="maria@site.com"
            />
          </div>
          <!-- End Col -->

          <div class="sm:col-span-3">
            <label
              for="af-account-password"
              class="mt-2.5 inline-block text-sm text-gray-800"
            >
              Password
            </label>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-9">
            <div class="space-y-2">
              <input
                id="af-account-password"
                type="text"
                class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter current password"
              />
              <input
                type="text"
                class="block w-full rounded-lg border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-3">
            <label
              for="username"
              class="mt-2.5 inline-block text-sm text-gray-800"
            >
              Username
            </label>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-9">
            <div class="sm:flex">
              <input
                id="username"
                type="text"
                class="relative -ml-px -mt-px block w-full border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
              />
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-3">
            <label
              for="af-account-gender-checkbox"
              class="mt-2.5 inline-block text-sm text-gray-800"
            >
              Gender
            </label>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-9">
            <div class="sm:flex">
              <label
                for="af-account-gender-checkbox"
                class="relative -ml-px -mt-px block flex w-full border border-gray-200 px-3 py-2 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
              >
                <input
                  type="radio"
                  name="af-account-gender-checkbox"
                  class="pointer-events-none mt-0.5 shrink-0 rounded-full border-gray-200 text-blue-600 focus:ring-blue-500"
                  id="af-account-gender-checkbox"
                  checked
                />
                <span class="ml-3 text-sm text-gray-500">Male</span>
              </label>

              <label
                for="af-account-gender-checkbox-female"
                class="relative -ml-px -mt-px block flex w-full border border-gray-200 px-3 py-2 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
              >
                <input
                  type="radio"
                  name="af-account-gender-checkbox-female"
                  class="pointer-events-none mt-0.5 shrink-0 rounded-full border-gray-200 text-blue-600 focus:ring-blue-500"
                  id="af-account-gender-checkbox-female"
                />
                <span class="ml-3 text-sm text-gray-500">Female</span>
              </label>

              <label
                for="af-account-gender-checkbox-other"
                class="relative -ml-px -mt-px block flex w-full border border-gray-200 px-3 py-2 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
              >
                <input
                  type="radio"
                  name="af-account-gender-checkbox-other"
                  class="pointer-events-none mt-0.5 shrink-0 rounded-full border-gray-200 text-blue-600 focus:ring-blue-500"
                  id="af-account-gender-checkbox-other"
                />
                <span class="ml-3 text-sm text-gray-500">Other</span>
              </label>
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-3">
            <label
              for="city,country"
              class="mt-2.5 inline-block text-sm text-gray-800"
            >
              Location
            </label>
            <div class="hs-tooltip inline-block">
              <button type="button" class="hs-tooltip-toggle ml-1">
                <svg
                  class="inline-block h-3 w-3 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                  />
                </svg>
              </button>
              <span
                class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-10 inline-block w-40 rounded-md bg-gray-900 px-2 py-1 text-center text-xs font-medium text-white opacity-0 shadow-sm transition-opacity"
                role="tooltip"
              >
                Displayed on public forums, such as Preline
              </span>
            </div>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-9">
            <div class="sm:flex">
              <input
                id="address"
                type="text"
                class="relative -ml-px -mt-px block w-full border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
                placeholder="Street address"
              />
              <input
                id="city"
                type="text"
                class="relative -ml-px -mt-px block w-full border-gray-200 px-3 py-2 pr-11 text-sm shadow-sm first:rounded-t-lg last:rounded-b-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:mt-0 sm:first:ml-0 sm:first:rounded-l-lg sm:first:rounded-tr-none sm:last:rounded-r-lg sm:last:rounded-bl-none"
                placeholder="City"
              />
            </div>
          </div>
        </div>
        <!-- End Grid -->

        <div class="mt-5 flex justify-end gap-x-2">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-3 py-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
    <!-- End Card -->
  </div>
  <!-- End Card Section -->
</template>

<style scoped></style>

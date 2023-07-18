<script setup></script>

<template>
  <div class="h-screen bg-home bg-cover bg-fixed bg-center bg-no-repeat">
    <div class="container mx-auto">
      <div class="grid grid-cols-12">
        <!-- Sidebar -->
        <div class="col-span-2 border-r">
          <side-bar></side-bar>
        </div>

        <!-- Main Content -->
        <div class="col-span-10">
          <!-- Header -->
          <div class="border-b">
            <nav-bar></nav-bar>
          </div>

          <!-- Content Area -->
          <main class="px-12 py-12 transition-all">
            <slot></slot>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

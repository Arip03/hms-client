<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1">
      <div class="container mx-auto p-4">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<template>
  <header class="bg-gray-900 text-white flex items-center justify-between p-4 fixed top-0 left-0 w-full z-50">
    <div class="flex items-center">
      <span class="text-xl font-semibold">HMS</span>
    </div>

    <nav class="flex space-x-4">
      <a href="#reception" class="hover:underline">Reception</a>
      <a href="#patients" class="hover:underline">Patients</a>
      <a href="#doctors" class="hover:underline">Doctors</a>
      <a href="#settings" class="hover:underline">Settings</a>
    </nav>

    <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
      Logout
    </button>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {
    logout() {
      this.$router.push('/logout');
    },
  },
};
</script>

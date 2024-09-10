<template>
  <MainLayout>
    <v-navigation-drawer :value="drawer" @input="drawer = !drawer">
    </v-navigation-drawer>
    <router-view />
  </MainLayout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      listitems: [
        {
          key: '1',
          icon: '📋',
          title: 'Add New Patient',
          routeName: 'AddPatient', // Route name to navigate
        },
        {
          key: '2',
          icon: '📄',
          title: 'Find Patient',
          routeName: 'FindPatient', // Route name to navigate
        },
      ],
    };
  },
  methods: {
    goToPage(routeName) {
      this.$router.push({ name: routeName });
      this.drawer = false; // Optionally close drawer after navigation
    },
  },
};
</script>

<style scoped>
</style>

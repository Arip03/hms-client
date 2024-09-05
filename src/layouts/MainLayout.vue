<template>
  <div class="flex flex-col">
    <HeaderComponent :title="headerTitle" />

    <div class="flex mt-[64px] max-h-screen overflow-hidden">
      <Sidebar
        :items="currentSidebarItems"
        :drawer="drawer"
        @toggleDrawer="handleToggleDrawer"
        @changeComponent="changeComponent"
      />
      <main class="flex-1">
        <router-view />
      </main>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import Sidebar from '@/layouts/Sidebar.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    Sidebar,
  },
  data() {
    return {
      drawer: false, // Local state for drawer
    };
  },
  computed: {
    currentSidebarItems() {
      return this.$route.meta.sidebarItems || [];
    },
  },
  methods: {
    handleToggleDrawer(value) {
      this.drawer = value; 
    },
    changeComponent(componentName) {
      this.$router.push({ name: componentName });
    },
  },
};
</script>

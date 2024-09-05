<template>
    <component :is="component" />
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import addpatient from '@/components/reception/addpatient.vue';
import queview from '@/components/reception/queview.vue';

export default {
  components: {
    MainLayout,
    addpatient,
    queview,
  },
  data() {
    return {
      headerTitle: 'Reception Dashboard',
      drawer: false,
      que: false,
      username: 'Receptionist',
      userRole: 'receptionist',
      component: 'addpatient',
      listitems: [
        {
          key: '1',
          icon: '📋',
          title: 'Patient token',
          display: 'addpatient',
        },
        {
          key: '2',
          icon: '📄',
          title: 'Queue View',
          display: 'queview',
        },
      ],
    };
  },
  methods: {
    changepage() {
      this.$router.push('/admin').catch((err) => {
        console.error(err);
      });
    },
    changeComponent(componentName) {
      this.component = componentName;
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>

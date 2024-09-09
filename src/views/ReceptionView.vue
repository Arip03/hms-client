<template>
    <component :is="component" />
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import AddPatient from '@/components/reception/AddPatient.vue';
import queview from '@/components/reception/queview.vue';

export default {
  components: {
    MainLayout,
    AddPatient,
    queview,
  },
  data() {
    return {
      headerTitle: 'Reception Dashboard',
      drawer: false,
      que: false,
      username: 'Receptionist',
      userRole: 'receptionist',
      component: 'AddPatient',
      listitems: [
        {
          key: '1',
          icon: '📋',
          title: 'Add New Patient',
          display: 'AddPatient',
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
</style>

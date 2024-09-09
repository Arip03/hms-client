import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LogoutView from '@/views/LogoutView.vue';
import ReceptionView from '@/views/ReceptionView.vue';
import AddPatient from '@/components/reception/AddPatient.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginView,
    meta: { layout: 'auth' },
  },
  {
    path: '/register',
    component: RegisterView,
    meta: { layout: 'auth' },
  },
  {
    path: '/reception',
    component: ReceptionView,
    meta: {
      layout: 'main',
      sidebarItems: [
        {
          key: '1',
          icon: '📋',
          title: 'Add New Patient',
          display: 'AddPatient',
        },
      ],
    },
    children: [
      {
        path: 'add-patient',
        component: AddPatient,
        meta: { layout: 'main' },
      },
    ],
  },
  {
    path: '/logout',
    component: LogoutView,
    meta: { layout: 'main' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((_, _2, next) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  next();
});

export default router;

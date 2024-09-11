import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LogoutView from '@/views/LogoutView.vue';
import ReceptionView from '@/views/ReceptionView.vue';
import AddPatient from '@/components/reception/AddPatient.vue';
import FindPatient from '@/components/reception/FindPatient.vue';
import AddAppointmet from '@/components/reception/AddAppointment.vue';
import AddNewEmergency from '@/components/reception/AddNewEmergency.vue';
import MonitorEmergency from '@/components/reception/MonitorEmergency.vue';
import AppointmentView from '@/components/reception/AppointmentView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { layout: 'auth' },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { layout: 'auth' },
  },
  {
    path: '/reception',
    name: 'Reception',
    component: ReceptionView,
    meta: { 
      layout: 'main',
      sidebarItems: [
        {
          key: '1',
          icon: '🏥',
          title: 'Monitor Emergency',
          display: 'MonitorEmergency'
        },
        {
          key: '2',
          icon: '🚑',
          title: 'Add New Emergency',
          display: 'AddNewEmergency'
        },
        {
          key: '3',
          icon: '🗓️',
          title: 'View Appointmet',
          display: 'AppointmentView'
        },
        {
          key: '4',
          icon: '🕛',
          title: 'Add Appointmet',
          display: 'AddAppointmet'
        },
        {
          key: '5',
          icon: '🔍',
          title: 'Find Patient',
          display: 'FindPatient'
        },
        {
          key: '6',
          icon: '👨‍⚕️',
          title: 'Add New Patient',
          display: 'AddPatient'
        },
      ]
    },

    children: [
      {
        path: 'monitor-emergency',
        name: 'MonitorEmergency',
        component: MonitorEmergency,
        meta: { layout: 'main' },
      }, 
      {
        path: 'new-emergency',
        name: 'AddNewEmergency',
        component: AddNewEmergency,
        meta: { layout: 'main' },
      },
      {
        path: 'add-patient',
        name: 'AddPatient',
        component: AddPatient,
        meta: { layout: 'main' },
      },
      {
        path: 'find-patient',
        name: 'FindPatient',
        component: FindPatient,
        meta: { layout: 'main' },
      }, 
      {
        path: '/add-appointment',
        name: 'AddAppointmet',
        component: AddAppointmet,
        meta: { layout: 'main' },
      },
      {
        path: '/appointment',
        name: 'AppointmentView',
        component: AppointmentView,
        meta: { layout: 'main' },
      },
    ],
  },
 
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView,
    meta: { layout: 'main' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((_, _2, next) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  next();
});

export default router;

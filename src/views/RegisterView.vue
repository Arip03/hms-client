<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Register</h2>
      <form @submit.prevent="submitForm">
        <div class="flex flex-col w-full space-y-4">
          <InputText
            name="firstname"
            :value="form.firstname"
            @change="val => form.firstname = val"
            placeholder="First Name"
            required
            :disabled="false"
            class="w-full"
          />
          <InputText
            name="lastname"
            :value="form.lastname"
            @change="val => form.lastname = val"
            placeholder="Last Name"
            required
            :disabled="false"
            class="w-full"
          />
          <InputText
            name="username"
            :value="form.username"
            @change="val => form.username = val"
            placeholder="Username"
            required
            :disabled="false"
            class="w-full"
          />
          <InputText
            name="email"
            :value="form.email"
            @change="val => form.email = val"
            placeholder="Email"
            type="email"
            required
            :disabled="false"
            class="w-full"
          />
          <InputText
            name="password"
            :value="form.password"
            @change="val => form.password = val"
            placeholder="Password"
            type="password"
            required
            :disabled="false"
            class="w-full"
          />
          <select v-model="form.role" class="border rounded-lg w-full p-2 placeholder-style">
            <option value="RECEPTION">RECEPTION</option>
            <option value="DOCTOR">DOCTOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <ActionButton
            label="Register"
            classname="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
            @click="submitForm"
          />
        </div>
      </form>
      <p class="mt-4 text-center">
        Already have an account? 
        <router-link to="/login" class="text-blue-500">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import InputText from '../components/common/InputText.vue';
import ActionButton from '../components/common/ActionButton.vue';
import apiClient from '../api/ApiClient';
import type { RegisterForm } from '../entities/RegisterForm';

const router = useRouter();

const form = reactive<RegisterForm>({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  role: 'USER' 
});
const errorMessage = ref<string>('');

const submitForm = async () => {
  try {
    await apiClient.post('/auth/register', form);
    router.push('/login');
  } catch (error) {
    console.error('Registration failed:', error);
    errorMessage.value = 'Registration failed. Please try again.';
  }
};
</script>

<style scoped>
/* Add additional styles if needed */
</style>

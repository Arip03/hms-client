<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
      <form @submit.prevent="submitForm">
        <div class="flex flex-col w-full space-y-4">
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
            name="password"
            :value="form.password"
            @change="val => form.password = val"
            type="password"
            placeholder="Password"
            required
            @keypress.enter="submitForm"
            :disabled="false"
            class="w-full"
          />
          <ActionButton
            label="Login"
            classname="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
            @click="submitForm"
          />
        </div>
      </form>
      <p class="mt-4 text-center">
        Don't have an account? 
        <router-link to="/register" class="text-blue-500">Create one</router-link>
      </p>
    </div>

    <DialogBox 
      :dialogmessage="dialogdata" 
      @update:dialogmessage="updateDialogData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import InputText from '../components/common/InputText.vue';
import ActionButton from '../components/common/ActionButton.vue';
import apiClient from '../api/ApiClient';
import Cookies from 'universal-cookie';
import DialogBox from '@/components/common/DialogBox.vue';
import type { LoginResponse } from '../entities/LoginResponse';
import type { DialogMessage } from '@/entities/DialogMessage';

const cookies = new Cookies();
const router = useRouter();

const form = reactive({ username: '', password: '' });

// Dialog data
const dialogdata = ref<DialogMessage>({
  show: false,
  title: '',
  message: '',
  buttontext: 'Close',
  type: 'error', // default type
});

const submitForm = async () => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', form);

    if (response.token) {
      cookies.set('token', response.token, { expires: new Date(Date.now() + 2.592e8) });
      cookies.set('role', response.role, { expires: new Date(Date.now() + 2.592e8) });
      router.push(response.role ? `/${response.role}` : '/');
    } else {
      dialogdata.value = {
        show: true,
        title: 'Error',
        message: 'Unexpected response data',
        buttontext: 'Close',
        type: 'error',
      };
    }
  } catch (error) {
    console.error('Request failed:', error);
    dialogdata.value = {
      show: true,
      title: 'Error',
      message: 'Username or Password Incorrect',
      buttontext: 'Close',
      type: 'error',
    };
  }
};

const updateDialogData = (newDialogData: DialogMessage) => {
  dialogdata.value = newDialogData;
};
</script>

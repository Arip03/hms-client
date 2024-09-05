<template>
  <div class="p-6 bg-gray-100 full-height" >
    <!-- Form -->
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <form ref="form" @submit.prevent="submitAddNewUserForm" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700">Patient Name</label>
            <input
              v-model="send.patientName"
              type="text"
              placeholder="Patient name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Patient Age</label>
            <input
              v-model="send.patientAge"
              type="text"
              placeholder="Patient age"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Gender</label>
            <select
              v-model="send.patientGender"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="option in gender" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700">Address</label>
            <input
              v-model="send.patientAddress"
              type="text"
              placeholder="Patient address"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Email</label>
            <input
              v-model="send.patientEmail"
              type="email"
              placeholder="Email-Id"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Phone Number</label>
            <input
              v-model="send.patientPhoneno"
              type="text"
              placeholder="Phone number"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Occupation</label>
            <input
              v-model="send.patientOccupation"
              type="text"
              placeholder="Occupation"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Blood Group</label>
            <input
              v-model="send.patientBloodGroup"
              type="text"
              placeholder="Blood group"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Marital Status</label>
            <input
              v-model="send.patientMaritalstatus"
              type="text"
              placeholder="Marital status"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="text-right">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

    <DialogBox :dialogmessage="dialogdata" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import DialogBox from '@/components/common/DialogBox.vue';
import apiClient from '../../api/ApiClient';
import type { DialogMessage } from '@/entities/DialogMessage';
import type { PatientData } from '../../entities/PatientData';

export default defineComponent({
  name: 'AddUserForm',
  components: {
    DialogBox
  },
  setup() {
    const send = ref<PatientData>({
      patientName: '',
      patientAge: '',
      patientGender: '',
      patientOccupation: '',
      patientAddress: '',
      patientMaritalstatus: '',
      patientBloodGroup: '',
      patientPhoneno: '',
      patientEmail: ''
    });

    const dialogdata = ref<DialogMessage>({
      show: false,
      type: '',
      title: '',
      message: '',
      buttontext: ''
    });

    const gender = [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ];

    const formRef = ref<HTMLFormElement | null>(null);

    const submitAddNewUserForm = async () => {
      try {
        const response = await apiClient.post<{ success: boolean, error?: string }>('/patient/create', send.value);
        if (response.success) {
          dialogdata.value = {
            title: 'Success',
            message: `Created new user ${send.value.patientName}`,
            buttontext: 'Ok',
            type: 'success',
            show: true
          };
          for (const key in send.value) {
            send.value[key as keyof PatientData] = '';
          }
          formRef.value?.reset();
        } else if (response.error) {
          dialogdata.value = {
            title: 'Error',
            message: response.error,
            buttontext: 'Ok',
            type: 'warning',
            show: true
          };
        }
      } catch (err) {
        if (err instanceof Error) {
          dialogdata.value = {
            title: 'Error',
            message: err.message,
            buttontext: 'Ok',
            type: 'warning',
            show: true
          };
        }
      }
    };

    onMounted(() => {
      formRef.value = document.querySelector('form');
    });

    return {
      send,
      dialogdata,
      gender,
      submitAddNewUserForm,
      formRef
    };
  }
});
</script>

<style scoped>

.full-height {
  height: calc(100vh - 100px);
}
/* Add any additional styling here */
</style>

<template>
  <div class="p-6 bg-gray-100 full-height">
    <div class="flex items-center justify-center">
      <h1 class="text-2xl font-bold mb-6">Add New Patient</h1>
    </div>

    <div class="max-w-7xl my-5 w-full mx-auto bg-white shadow-lg rounded-lg p-10 border border-gray-200">
      <form ref="formRef" @submit.prevent="submitAddNewPatientForm" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label class="block text-gray-700">First Name</label>
            <input
              v-model="send.firstName"
              type="text"
              placeholder="First name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{'border-red-500': errors.firstName}"
            />
            <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
          </div>
          <div>
            <label class="block text-gray-700">Father Name</label>
            <input
              v-model="send.fatherName"
              type="text"
              placeholder="Father name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Last Name</label>
            <input
              v-model="send.lastName"
              type="text"
              placeholder="Last name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{'border-red-500': errors.lastName}"
            />
            <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
          </div>
          <div>
            <label class="block text-gray-700">Personal Number</label>
            <input
              v-model="send.personalNumber"
              type="text"
              placeholder="Personal number"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Gender</label>
            <select
              v-model="send.gender"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="option in genderOptions" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700">Date of Birth</label>
            <input
              v-model="send.dateOfBirth"
              type="date"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Address</label>
            <input
              v-model="send.address"
              type="text"
              placeholder="Address"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Phone</label>
            <input
              v-model="send.phone"
              type="text"
              placeholder="Phone number"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Email</label>
            <input
              v-model="send.email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{'border-red-500': errors.email}"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
          <div>
            <label class="block text-gray-700">Marital Status</label>
            <input
              v-model="send.maritalStatus"
              type="text"
              placeholder="Marital Status"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Occupation</label>
            <input
              v-model="send.occupation"
              type="text"
              placeholder="Occupation"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-gray-700">Insurance Number</label>
            <input
              v-model="send.insuranceNumber"
              type="text"
              placeholder="Insurance Number"
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

    <DialogBox 
    :dialogmessage="dialogdata" 
    @update:dialogmessage="updateDialogData"
  />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DialogBox from '@/components/common/DialogBox.vue';
import apiClient from '../../api/ApiClient';
import type { DialogMessage } from '@/entities/DialogMessage';
import type { CreatePatientData } from '@/entities/CreatePatientData';

export default defineComponent({
  name: 'AddPatientForm',
  components: {
    DialogBox
  },
  setup() {
    const send = ref<CreatePatientData>({
      firstName: '',
      fatherName: '',
      lastName: '',
      personalNumber: '',
      gender: 'FEMALE',
      dateOfBirth: '',
      address: '',
      phone: '',
      email: '',
      maritalStatus: '',
      occupation: '',
      insuranceNumber: ''
    });

    const dialogdata = ref<DialogMessage>({
      show: false,
      type: '',
      title: '',
      message: '',
      buttontext: ''
    });

    const genderOptions = [
      { text: 'Male', value: 'MALE' },
      { text: 'Female', value: 'FEMALE' }
    ];

    const errors = ref<{ [key: string]: string }>({});

    const validateForm = () => {
      errors.value = {};
      if (!send.value.firstName) errors.value.firstName = 'First name is required';
      if (!send.value.lastName) errors.value.lastName = 'Last name is required';
      if (!send.value.email) errors.value.email = 'Email is required';
      return Object.keys(errors.value).length === 0;
    };

    const resetForm = () => {
      send.value = {
        firstName: '',
        fatherName: '',
        lastName: '',
        personalNumber: '',
        gender: 'FEMALE',
        dateOfBirth: '',
        address: '',
        phone: '',
        email: '',
        maritalStatus: '',
        occupation: '',
        insuranceNumber: ''
      };
    };

    const submitAddNewPatientForm = async () => {
      if (!validateForm()) {
        dialogdata.value = {
          title: 'Validation Error',
          message: 'Please fill in all required fields.',
          buttontext: 'Ok',
          type: 'warning',
          show: true
        };
        return;
      }

      try {
        const response = await apiClient.post<{ id: string; message: string }>('/patients', send.value);

        if (response.id) {
          dialogdata.value = {
            title: 'Success',
            message: `Patient added successfully: ${send.value.firstName}`,
            buttontext: 'Ok',
            type: 'success',
            show: true
          };

          resetForm();
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred. Please try again later.';
        
        dialogdata.value = {
          title: 'Error',
          message: errorMessage,
          buttontext: 'Ok',
          type: 'error',
          show: true
        };
      }
    };

    const updateDialogData = (newData: DialogMessage) => {
      dialogdata.value = newData;
    };

    return {
      send,
      dialogdata,
      genderOptions,
      submitAddNewPatientForm,
      errors,
      updateDialogData
    };
  }
});
</script>


<style scoped>
.full-height {
  min-height: 100vh; 
}
</style>

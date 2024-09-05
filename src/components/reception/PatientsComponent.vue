<template>
  <v-container>
    <v-data-table :headers="headers" :items="fetched" :search="search" class="elevation-1">
      <template v-slot:top>
        <v-container class="pa-0">
          <v-row justify="space-around" class="pa-2" dense>
            <v-col cols="12" sm="3" align-self="center">
              <h3>Patients</h3>
            </v-col>
            <v-col cols="12" sm="6" align-self="center">
              <v-text-field
                v-model="search"
                append-icon="mdi-filter"
                label="Filter"
                single-line
                hide-details
                class="pb-5"
              />
            </v-col>
            <v-col cols="12" sm="3" align-self="center">
              <v-row justify="center">
                <v-btn small class="ml-2 primary" @click="addNewPatient">
                  <v-icon color="white">mdi-plus-circle</v-icon>Add new
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon large class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      </template>
      <!-- <template #['item.changepassword']="{ item }">
        <v-icon large class="mr-2" @click="generateToken(item)">mdi-hospital-box</v-icon>
      </template> -->
    </v-data-table>

    <AddPatientDialog
      v-model:visible="addNewPatientDialog"
      @submitted="handleAddPatientSubmit"
    />
    <EditPatientDialog
      v-model:visible="editDialog"
      :patient="selectedPatient"
      @submitted="handleEditPatientSubmit"
    />
    <GenerateTokenDialog
      v-model:visible="tokenDialog"
      :patient="selectedPatient"
      @submitted="handleTokenSubmit"
    />
    <ConfirmEditDialog
      v-model:visible="confirmEditDialog"
      @confirmed="handleConfirmEdit"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AddPatientDialog from './AddPatientDialog.vue';
import EditPatientDialog from './EditPatientDialog.vue';
import GenerateTokenDialog from './TokenDialog.vue'; 
import ConfirmEditDialog from './ConfirmEditDialog.vue';

const addNewPatientDialog = ref(false);
const editDialog = ref(false);
const tokenDialog = ref(false);
const confirmEditDialog = ref(false);

const search = ref('');
const headers = ref([{ text: 'Name', value: 'name' }, { text: 'Age', value: 'age' }]);
const fetched = ref<any[]>([]);
const selectedPatient = ref<any>(null);

const addNewPatient = () => {
  addNewPatientDialog.value = true;
};

const editItem = (item: any) => {
  selectedPatient.value = item;
  editDialog.value = true;
};

const generateToken = (item: any) => {
  selectedPatient.value = item;
  tokenDialog.value = true;
};

const handleAddPatientSubmit = () => {
  addNewPatientDialog.value = false;
};

const handleEditPatientSubmit = () => {
  editDialog.value = false;
};

const handleTokenSubmit = () => {
  tokenDialog.value = false;
};

const handleConfirmEdit = () => {
  confirmEditDialog.value = false;
};
</script>

<style scoped>
</style>

<!-- eslint-disable vue/no-mutating-props -->
<template>
    <v-dialog v-model:visible="visible" max-width="650px">
      <v-card>
        <v-card-title class="primary lighten-2 justify-center">
          <span class="headline">Add new patient's data</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="addNewForm" style="border-radius:5px">
            <!-- Form Fields -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary darken-1"  @click="cancel">Cancel</v-btn>
          <v-btn color="primary darken-1" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    visible: boolean;
  }>();
  
  const emit = defineEmits<{
    (event: 'submitted'): void;
  }>();
  
  const cancel = () => {
    emit('submitted');
  };
  
  const submit = () => {
    emit('submitted');
  };
  </script>
  
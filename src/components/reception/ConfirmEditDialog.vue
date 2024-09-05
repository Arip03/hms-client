<!-- eslint-disable vue/no-mutating-props -->
<template>
    <v-dialog v-model:visible="visible" max-width="600px">
      <v-card>
        <v-card-title class="headline warning">
          <span>Do you really want to change data?</span>
        </v-card-title>
        <v-card-text class="pt-6">
          <strong>Do not change data without the concern of the respective person</strong>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary darken-1" @click="cancel">Cancel</v-btn>
          <v-btn color="primary darken-1" @click="confirm">Confirm</v-btn>
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
    (event: 'confirmed'): void;
  }>();
  
  const cancel = () => {
    emit('confirmed');
  };
  
  const confirm = () => {
    emit('confirmed');
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for this component here */
  </style>
  
<script setup>
import BaseInput from './BaseInput.vue';
import BaseTextField from './BaseTextField.vue';

</script>

<template>
  <form>

    <BaseInput
    v-model="name"
    label="Name"
    type="text"
    />

    <BaseInput
    v-model="email"
    label="E-mail"
    type="text"
    />

    <BaseTextField
    v-model="feedback"
    label="Feedback"
    type="text"
    />

    <button type="submit">Submit</button>
  </form>




</template>

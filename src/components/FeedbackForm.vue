<script setup>
import BaseInput from './BaseInput.vue';
import BaseTextField from './BaseTextField.vue';

</script>

<template >
  <form @submit.prevent="sendForm">

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

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: [
        'item1',
        'item2',
        'item3'
      ]
    }
  },
  methods: {
    sendForm   () {
      // important to validate
      //  Axios post sends a promise
      axios.post(
        // url to where to post data to
        'https://my-json-server.typicode.com/earlbug/fullstack_vue_calculator',
        //payload to send to server
        this.event
      )
      .then(function (response) {
        console.log('Response', response)
      })
      .catch(function (err) {
      console.log('Error', err)
      })
      // handle form submission
    }
  }
}
</script>

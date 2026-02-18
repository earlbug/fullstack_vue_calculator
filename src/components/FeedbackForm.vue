<template >
  <form @submit.prevent="submit">

    <BaseInput
    v-model="name"
    label="Name"
    type="text"
    :error="nameError"
    />

    <BaseInput
    v-model="email"
    label="E-mail"
    type="text"
    :error="emailError"
    />

    <button @click="recallUser()" type="button">Recall user</button>

    <BaseTextField
    v-model="feedback"
    label="Feedback"
    type="text"
    :error="feedbackError"
    />


    <button
    type="submit"
    v-bind:disabled="isDisabled"
    >Submit</button>
  </form>

  <pre>{{}}</pre>

</template>

<script setup>
  import axios from 'axios'
  import { useField, useForm, useIsFormValid } from 'vee-validate'
  import {useUserStore} from '../stores/counter'
  import { computed } from 'vue';

  const  userStore  = useUserStore();

  const validations = {
    name: value => {
    if (!value) return 'This field is required'
    return true
    },
    email: value=> {
      if (!value) return 'This field is required'
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(!regex.test(String(value).toLocaleLowerCase())) {
        return 'Please enter a valid e-mail address'
    }
    return true
    },
    feedback: value=> {
      if (!value) return 'This field is required'
      return true

    }
  }

const { handleSubmit } = useForm({
  validationSchema: validations
})


  const { value: name, errorMessage: nameError } = useField('name')
  const { value: email, errorMessage: emailError } = useField('email')
  const { value: feedback, errorMessage: feedbackError } = useField('feedback')
  /*
  const feedback = useField('feedback', function(value) {
    if (!value) return 'This field is required'
    return true
    })
  */
  const isValid = useIsFormValid();

  const isDisabled = computed(() => {return !isValid.value})

  function sendForm (values) {

    // important to validate
    //  Axios sends a promise
    axios.post(
      // url to where to post data to
      'http://localhost:3000/feedbackEntry',
      //payload to send to server
      values
    )
    .then(function (response) {
      // log the response on success
      console.log('Response', response)
    })
    .catch(function (err) {
    console.log('Error', err)
    })
  }

  // TODO try to getg the values from the passed on argument
  function storeUser(values) {
    // Store the user data in state
    userStore.setUsername(name.value)
    userStore.setEmail(email.value)
  }

  // validate fields, send user info to store and send the form
  const submit = handleSubmit(values => {
  console.log('submit', values)
  storeUser(values)
  sendForm(values)
  })

  // Get info form store, and put them in the fields if they exixt.
  function recallUser() {
    const storedUserName = userStore.getUsername;
    const storedEmail = userStore.getEmail;
    if(storedUserName != '' && storedEmail != '') {
      name.value = storedUserName;
      email.value = storedEmail;
    }

  }
</script>

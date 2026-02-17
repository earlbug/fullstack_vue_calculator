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


    <button type="submit">Submit</button>
  </form>

  <pre>{{}}</pre>

</template>

<script setup>
  import axios from 'axios'
  import { useField, useForm } from 'vee-validate'
  import {useUserStore} from '../stores/counter'

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

  const {handleSubmit} = useForm({
    validationSchema: validations
  })

  const name = useField('name')
  const email = useField('email')
  const feedback = useField('feedback')
  /*
  const feedback = useField('feedback', function(value) {
    if (!value) return 'This field is required'
    return true
    })
  */

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
    userStore.setUsername(name.value.value)
    userStore.setEmail(email.value.value)
  }

  // validate fields, send user info to store and send the form
  const submit = handleSubmit(values => {
  console.log('submit', values)
  storeUser(values)
  sendForm(values)
  })

  // Get info form store, and put them in the fields if they exixt.
  const recallUser = function tesst() {
    const storedUserName = userStore.getUsername;
    const storedEmail = userStore.getEmail;
    if(storedUserName != '' && storedEmail != '') {
      name.value.value = storedUserName;
      email.value.value = storedEmail;
    }

  }










</script>

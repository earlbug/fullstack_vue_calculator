<template >
  <form @submit.prevent="onSubmit">

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

    <BaseTextField
    v-model="feedback"
    label="Feedback"
    type="text"
    :error="feedbackError"
    />


    <button type="submit">Submit</button>
  </form>

  <pre>{{name}}</pre>

</template>

<script>
import axios from 'axios'
import { useField } from 'vee-validate'
export default {
  setup () {
    function onSubmit () {
      alert('sUbmitted')
    }

    const name = useField('name', function(value) {
      if (!value) return 'This field is required'
      return true
    })

    const email = useField('email', function (value) {
      if (!value) return 'This field is required'

      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(!regex.test(String(value).toLocaleLowerCase())) {
        return 'Please enter a valid e-mail address'
      }
      return true
    })

    const feedback = useField('feedback', function(value) {
      if (!value) return 'This field is required'
      return true
    })

    return {
      onSubmit,
      name: name.value,
      nameError: name.errorMessage,
      email: email.value,
      emailError: email.errorMessage,
      feedback: feedback.value,
      feedbackError: feedback.errorMessage
    }
  }


  /*,
  sendForm () {
  // important to validate
  //  Axios sends a promise
  axios.post(
    // url to where to post data to
    'http://localhost:3000/feedbackEntry',
    //payload to send to server
    this.feedbackEntry
  )
  .then(function (response) {
    console.log('Response', response)
  })
  .catch(function (err) {
  console.log('Error', err)
  })
}
  */



}
</script>

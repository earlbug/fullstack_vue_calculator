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
import { useField, useForm } from 'vee-validate'
import {useUserStore} from '../stores/counter.js'
export default {
  setup () {

    const store = useUserStore()


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
        console.log('Response', response)
      })
      .catch(function (err) {
      console.log('Error', err)
      })
    }


     const submit = handleSubmit(values => {
      console.log('submit', values)
      sendForm(values)
     })



    return {
      name: name.value,
      nameError: name.errorMessage,
      email: email.value,
      emailError: email.errorMessage,
      feedback: feedback.value,
      feedbackError: feedback.errorMessage,
      submit
    }
  }






}
</script>

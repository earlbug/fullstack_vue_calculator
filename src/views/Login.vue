<script setup lang="js">

  import { ref } from 'vue'
  import router from '../router/index.js'
  import useUserTokenStore from "../stores/userstore.js"



  const userStore = useUserTokenStore()
  const username = ref('')
  const password = ref('')

    async function handleLoginClick() {
    userStore.getTokenAndSaveInStore(username.value, password.value).then(() => {
      if (userStore.jwtToken) {
        updateErrorMsg('')
        router.push('/home')
      } else {
        updateErrorMsg('Invalid credentials!')
      }
    })
  }

  function updateErrorMsg(errMsg) {
    const errorLabel = document.querySelector('label[id=loginstatusLabel]')
    if (errorLabel != null) errorLabel.textContent = errMsg
  }



</script>

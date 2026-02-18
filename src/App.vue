<script setup lang="js">
import Calculator from './views/Calculator.vue';
import FeedbackForm from './views/FeedbackForm.vue';
import { RouterLink, RouterView } from 'vue-router';




</script>

<template>
  <div id="layout">

    <header>

      <div class="wrapper">
        <nav>
          <RouterLink to="/">calculator </RouterLink>
          <RouterLink to="/feedback">feedback </RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>


</template>

<style scoped></style>

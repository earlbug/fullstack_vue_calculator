import { createRouter, createWebHistory } from 'vue-router'
import FeedbackForm from '../views/FeedbackForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/feedback",
      name: 'feedback',
      component: FeedbackForm
    }

  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import FeedbackForm from '../views/FeedbackForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Calculator',
      component: () => import('../views/Calculator.vue')
    },
    {
      path: "/feedback",
      name: 'Feedback',
      component: FeedbackForm
    },

  ],
})

export default router

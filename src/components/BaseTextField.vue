<template>
  <label>{{ label}}</label>
  <textarea
    v-bind="$attrs"
    :placeholder="label"
    class="field"
    @input="$emit('update:modelValue', $event.target.value)"
    >
  </textarea>
  <p v-if="error">{{ error }}</p>
</template>

<script>

  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      modelValue: {
        type: [String, Number],
        default: ''
      },
      error: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style>
p {
  color: red;
}
</style>

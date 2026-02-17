<template>
  <label v-if="label">{{ label}}</label>
  <input
    v-bind="$attrs"
    :placeholder="label"
    :value="modelValue"
    class="field"
    @input="$emit('update:modelValue', $event.target.value)"
    >
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
        default: '',
        required: true
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

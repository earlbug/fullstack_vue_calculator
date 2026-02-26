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

<script lang="js">
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
<style scoped>
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

input.field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input.field:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

p {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
}
</style>


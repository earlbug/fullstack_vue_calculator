<template>
  <label>{{ label}}</label>
  <textarea
    :placeholder="label"
    class="field"
    @input="$emit('update:modelValue', $event.target.value)"
    >
</textarea>
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
      }
    }
  }
</script>

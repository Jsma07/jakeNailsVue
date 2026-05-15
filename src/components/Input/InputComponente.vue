<script setup>
import { computed } from 'vue';


const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: ""
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
});

const emite = defineEmits(['update:value']);

const modelValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('update:value', value);
  }
});
</script>

<template>
 <label class="formulario__label">{{ label }}</label>
        <input
          class="formulario__input"
          type="text"
          v-model="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
        />

</template>
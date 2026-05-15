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
  },

type:{
  required: true,
  default: 'text'
}
});

const emit = defineEmits(['update:value']);

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
  <div class="campoTexto">
 <label class="campoTexto__label">{{ label }}</label>
        <input
          class="campoTexto__input"
          :type="type"
          v-model="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
        />
  </div>
</template>


<style lang="scss">
@use "./CampoTextoComponente.scss";
</style>
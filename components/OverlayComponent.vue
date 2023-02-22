<template>
  <Transition>
    <div class="overlay-component" v-if="value" :data-state="value" @click.self="value = false"></div>
  </Transition>
</template>

<script lang="ts" setup>
import { defineProps, computed, watch } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
})

watch(value, () => {
  if (value.value) {
    document.querySelector('html').classList.add('overlay-component-active');
  } else {
    document.querySelector('html').classList.remove('overlay-component-active');
  }
})
</script>
<style lang="scss">
html.overlay-component-active {
  overflow-y: hidden;
}
</style>
<style lang="scss" scoped>
.overlay-component {
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0 0 0 / 0.7);
  pointer-events: none;
  &[data-state="true"] {
    pointer-events: auto;
  }
  &.v-enter-active,
  &.v-leave-active {
    transition: opacity 200ms;
  }
  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }
}
</style>

<template>
  <q-btn color="primary" no-caps unelevated ref="qRef">
    <slot></slot>
    <slot name="loading"></slot>
  </q-btn>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const qRef = ref();
defineExpose({
  qRef,
})
</script>

<style lang="scss" scoped>
::v-deep(.q-btn) {
  font-weight: 600;
  &.bg-primary,
  &.text-primary {
    --focus-helper-background: var(--primary-focus-color);
  }
  &.bg-secondary,
  &.text-secondary {
    --focus-helper-background: var(--secondary-focus-color);
  }
  &.bg-positive,
  &.text-positive {
    --focus-helper-background: var(--positive-focus-color);
  }
  &.bg-warning,
  &.text-warning {
    --focus-helper-background: var(--warning-focus-color);
  }
  &.bg-negative,
  &.text-negative {
    --focus-helper-background: var(--negative-focus-color);
  }
  &.q-focusable:focus > .q-focus-helper,
  &.q-manual-focusable--focused > .q-focus-helper,
  &.q-hoverable:hover > .q-focus-helper {
    background: var(--focus-helper-background);
    opacity: var(--focus-helper-opacity);
  }
  .q-focus-helper {
    &:before,
    &:after {
      display: none;
    }
  }
  &.q-btn--rectangle {
    --focus-helper-opacity: 1;
    &:not(.q-btn--rounded) {
      border-radius: 4px;
    }
  }
  &.q-btn--outline,
  &.q-btn--flat {
    --focus-helper-opacity: 0.075;
  }
}
</style>

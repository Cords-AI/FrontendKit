<template>
  <q-btn color="primary"
         no-caps
         unelevated
         class="text-metrics"
         :data-btn-size="props.size"
  >
    <slot></slot>
    <slot name="loading"></slot>
  </q-btn>
</template>

<script setup lang="ts">
interface Props {
  size?: string,
}
const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})
</script>

<style lang="scss" scoped>
.q-btn {
  --_xs-button-font-size: var(--xs-button-font-size, 8);
  --_sm-button-font-size: var(--sm-button-font-size, 10);
  --_md-button-font-size: var(--md-button-font-size, 14);
  --_lg-button-font-size: var(--lg-button-font-size, 15);
  --_xl-button-font-size: var(--xl-button-font-size, 16);
  --_xs-button-size: calc(var(--xs-button-size, 20px) * var(--_dense-factor));
  --_sm-button-size: calc(var(--sm-button-size, 28px) * var(--_dense-factor));
  --_md-button-size: calc(var(--md-button-size, 36px) * var(--_dense-factor));
  --_lg-button-size: calc(var(--lg-button-size, 44px) * var(--_dense-factor));
  --_xl-button-size: calc(var(--xl-button-size, 52px) * var(--_dense-factor));
  --_xs-button-padding: calc(var(--xs-button-padding, 10px) * var(--_dense-factor));
  --_sm-button-padding: calc(var(--sm-button-padding, 14px) * var(--_dense-factor));
  --_md-button-padding: calc(var(--md-button-padding, 18px) * var(--_dense-factor));
  --_lg-button-padding: calc(var(--lg-button-padding, 22px) * var(--_dense-factor));
  --_xl-button-padding: calc(var(--xl-button-padding, 26px) * var(--_dense-factor));
  --_button-font-weight: var(--button-font-weight, 600);
  --_button-border-radius: var(--button-border-radius, 4px);
  --_button-border-width: var(--button-border-width, 1px);
  --_button-dense-factor: var(--button-dense-factor, calc(3/4));

  --_focus-helper-opacity: 1;
  --_dense-factor: 1;
  --font-weight: var(--_button-font-weight);
  --font-size: var(--_button-font-size);
  --line-height: normal;
  height: var(--_button-size);
  min-height: auto;
  min-width: auto;
  padding: 0 var(--_button-padding);
  &.q-btn--rectangle {
    border-radius: var(--_button-border-radius);
  }
  &.q-btn--rounded {
    border-radius: calc(var(--_button-size) / 2);
  }
  &.q-btn--round {
    padding: 0;
    width: var(--_button-size);
  }
  &.q-btn--outline,
  &.q-btn--flat {
    --_focus-helper-opacity: 0.075;
  }
  &.q-btn--outline:before {
    border-width: var(--_button-border-width);
  }
  &.q-btn--dense {
    --_dense-factor: var(--_button-dense-factor);
  }
  &[data-btn-size='xs'] {
    --_button-font-size: var(--_xs-button-font-size);
    --_button-size: var(--_xs-button-size);
    --_button-padding: var(--_xs-button-padding);
  }
  &[data-btn-size='sm'] {
    --_button-font-size: var(--_sm-button-font-size);
    --_button-size: var(--_sm-button-size);
    --_button-padding: var(--_sm-button-padding);
  }
  &[data-btn-size='md'] {
    --_button-font-size: var(--_md-button-font-size);
    --_button-size: var(--_md-button-size);
    --_button-padding: var(--_md-button-padding);
  }
  &[data-btn-size='lg'] {
    --_button-font-size: var(--_lg-button-font-size);
    --_button-size: var(--_lg-button-size);
    --_button-padding: var(--_lg-button-padding);
  }
  &[data-btn-size='xl'] {
    --_button-font-size: var(--_xl-button-font-size);
    --_button-size: var(--_xl-button-size);
    --_button-padding: var(--_xl-button-padding);
  }
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
  &.q-focusable:focus ::v-deep(> .q-focus-helpe),
  &.q-manual-focusable--focused ::v-deep(> .q-focus-helper),
  &.q-hoverable:hover ::v-deep(> .q-focus-helper) {
    background: var(--focus-helper-background);
    opacity: var(--_focus-helper-opacity);
  }
  ::v-deep(.q-focus-helper) {
    &:before,
    &:after {
      display: none;
    }
  }
}
</style>

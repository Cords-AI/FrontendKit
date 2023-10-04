<template>
  <KitQWrapper :q-component="QBtn"
               :q-methods="methods"
               ref="qComponent"
               color="primary" no-caps unelevated
               v-bind="$attrs"
               inherit-attrs
               :data-btn-size="props.size"
               class="text-metrics"
  >
    <template v-slot:default>
      <slot></slot>
    </template>
    <template v-slot:loading>
      <slot name="loading"></slot>
    </template>
  </KitQWrapper>
</template>

<script setup lang="ts">
import QBtn from '~/lib/quasar/ui/src/components/btn/QBtn';

defineOptions({
  inheritAttrs: false
})

interface Props {
  size?: string,
}
const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const methods = [
  'click',
];
const qComponent = ref();
</script>

<style lang="scss" scoped>
[data-q-component="QBtn"],
::v-deep([data-q-component="QBtn"]) {
  --_xs-button-font-size: var(--xs-button-font-size, 8);
  --_sm-button-font-size: var(--sm-button-font-size, 10);
  --_md-button-font-size: var(--md-button-font-size, 14);
  --_lg-button-font-size: var(--lg-button-font-size, 14);
  --_xl-button-font-size: var(--xl-button-font-size, 14);
  --_xs-button-size: var(--xs-button-size, 20px);
  --_sm-button-size: var(--sm-button-size, 28px);
  --_md-button-size: var(--md-button-size, 36px);
  --_lg-button-size: var(--lg-button-size, 44px);
  --_xl-button-size: var(--xl-button-size, 52px);
  --_xs-button-padding: var(--xs-button-padding, 10px);
  --_sm-button-padding: var(--sm-button-padding, 14px);
  --_md-button-padding: var(--md-button-padding, 18px);
  --_lg-button-padding: var(--lg-button-padding, 22px);
  --_xl-button-padding: var(--xl-button-padding, 26px);
  --_button-font-weight: var(--button-font-weight, 600);
  --_button-border-radius: var(--button-border-radius, 4px);

  --font-weight: var(--_button-font-weight);
  --font-size: var(--_button-font-size);
  font-weight: var(--_font-weight);
  font-size: calc(var(--_font-size) * 1px);
  height: var(--_button-size);
  padding: 0 var(--_button-padding);
  line-height: normal;
  min-height: auto;
  min-width: auto;
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
  &.q-btn--round {
    padding: 0;
    width: var(--_button-size);
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
    border-radius: var(--_button-border-radius);
    &.q-btn--rounded {
      
    }
    //&:not(.q-btn--rounded) {
    //
    //}
  }
  &.q-btn--outline,
  &.q-btn--flat {
    --focus-helper-opacity: 0.075;
  }
}
</style>

<template>
  <OverlayComponent v-model="value"></OverlayComponent>
  <Transition>
    <div class="dialog-component" v-if="value">
      <div class="dialog-card" :data-state="value">
        <div class="dialog-card-content">

          <div class="dialog-card-column">
            <div class="dialog-card-header typography">
              <h3>{{ props.title }}</h3>
            </div>
            <div class="dialog-card-slot">
              <slot></slot>
            </div>
          </div>

        </div>

      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
})

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
})
</script>

<style lang="scss" scoped>
.dialog-component {
  position: fixed;
  z-index: 3000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  .dialog-card {
    --v-top-padding: 30px;
    --v-bottom-padding: 20px;
    --h-padding: 25px;
    --min-width: min(450px, calc(100vw - var(--wrapper-padding-left) - var(--wrapper-padding-right)));
    --max-width: min(800px, calc(80vw - var(--wrapper-padding-left) - var(--wrapper-padding-right)));
    --max-height: calc(100vh - var(--safe-inset-top) - var(--safe-inset-bottom) - 50px);
    position: relative;
    min-width: var(--min-width);
    max-width: var(--max-width);
    background: white;
    border-radius: 25px;
    box-shadow: 0 20px 50px rgb(0 0 0 / 0.75);
    overflow: hidden;
    pointer-events: none;
    &[data-state="true"] {
      pointer-events: auto;
    }
    .dialog-card-content {
      padding: var(--v-top-padding) var(--h-padding) var(--v-bottom-padding) var(--h-padding);
      max-height: var(--max-height);
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: none;
      scrollbar-width: none;
      -webkit-mask-image: linear-gradient(0deg, transparent, black var(--v-bottom-padding));
      mask-image: linear-gradient(0deg, transparent, black var(--v-bottom-padding));
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .dialog-card-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &.v-enter-active {
    transition: transform cubic-bezier(0.3, 1.5, 0.5, 1) 600ms, opacity 400ms;
  }
  &.v-leave-active {
    transition: transform cubic-bezier(0.3, 1.5, 0.5, 1) 200ms, opacity 200ms;
  }
  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
}

</style>

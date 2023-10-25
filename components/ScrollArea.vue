<template>
  <div class="scroll-area-wrapper">
    <q-scroll-area :vertical-thumb-style="thumbVerticalStyle"
                   :horizontal-thumb-style="thumbHorizontalStyle"
                   ref="scrollAreaRef"
    >
      <slot></slot>
    </q-scroll-area>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})

interface Props {
  autoHeight?: boolean,
  autoWidth?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  autoHeight: false,
  autoWidth: false,
})

const methods = [
  'getScrollTarget',
  'getScroll',
  'getScrollPosition',
  'getScrollPercentage',
  'setScrollPosition',
  'setScrollPercentage',
];
const scrollAreaRef = ref();

const scrollMetrics = computed(() => {
  return scrollAreaRef.value?.getScroll();
})

const verticalPosition = computed(() => {
  return scrollMetrics.value?.verticalPosition || 0;
})

const verticalSize = computed(() => {
  return scrollMetrics.value?.verticalSize || 0;
})

const verticalContainerSize = computed(() => {
  return scrollMetrics.value?.verticalContainerSize || 0;
})

const horizontalSize = computed(() => {
  return scrollMetrics.value?.horizontalSize || 0;
})

const horizontalContainerSize = computed(() => {
  return scrollMetrics.value?.horizontalContainerSize || 0;
})

const autoHeight = computed(() => {
  return props.autoHeight ? `${verticalSize.value}px` : '100%';
})

const autoWidth = computed(() => {
  return props.autoWidth ? `${horizontalSize.value}px` : '100%';
})

const scrollIndicatorTopOpacity = computed(() => {
  const scrollPosition = Math.floor(verticalPosition.value);
  return scrollPosition > 0 ? 1 : 0;
})

const scrollIndicatorBottomOpacity = computed(() => {
  const scrollableDistance = Math.max(0, verticalSize.value - verticalContainerSize.value);
  const scrollPosition = Math.ceil(verticalPosition.value);
  return scrollPosition < scrollableDistance ? 1 : 0;
})

const thumbVerticalStyle = {
  right: 'var(--_scroll-thumb-offset)',
  borderRadius: 'var(--_scroll-thumb-border-radius)',
  backgroundColor: 'var(--_scroll-thumb-color)',
  width: 'var(--_scroll-thumb-size)',
  opacity: 'var(--_scroll-thumb-opacity)',
}
const thumbHorizontalStyle = {
  bottom: 'var(--_scroll-thumb-offset)',
  borderRadius: 'var(--_scroll-thumb-border-radius)',
  backgroundColor: 'var(--_scroll-thumb-color)',
  height: 'var(--_scroll-thumb-size)',
  opacity: 'var(--_scroll-thumb-opacity)',
}
</script>

<style lang="scss" scoped>
.scroll-area-wrapper {
  --_scroll-area-width: var(--scroll-area-width, v-bind(autoWidth));
  --_scroll-area-height: var(--scroll-area-height, v-bind(autoHeight));
  --_scroll-area-max-width: var(--scroll-area-max-width, 100%);
  --_scroll-area-max-height: var(--scroll-area-max-height, 100%);
  --_scroll-indicator-color: var(--scroll-indicator-color, #000);
  --_scroll-indicator-opacity: var(--scroll-indicator-opacity, 0.1);
  --_scroll-indicator-size: var(--scroll-indicator-size, 6px);
  --_scroll-thumb-color: var(--scroll-thumb-color, #000);
  --_scroll-thumb-opacity: var(--scroll-thumb-opacity, 0.25);
  --_scroll-thumb-border-radius: var(--scroll-thumb-border-radius, 3px);
  --_scroll-thumb-size: var(--scroll-thumb-size, 6px);
  --_scroll-thumb-offset: var(--scroll-thumb-offset, 4px);
  position: relative;
  width: var(--_scroll-area-width);
  height: var(--_scroll-area-height);
  max-width: var(--_scroll-area-max-width);
  max-height: var(--_scroll-area-max-height);
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: var(--_scroll-indicator-size);
    background-color: var(--_scroll-indicator-color);
    -webkit-mask-image: linear-gradient(to var(--direction), rgb(0 0 0 / var(--_scroll-indicator-opacity)), rgb(0 0 0 / 0));
    mask-image: linear-gradient(to var(--direction), rgb(0 0 0 / var(--_scroll-indicator-opacity)), rgb(0 0 0 / 0));
    transition: opacity 200ms;
    pointer-events: none;
  }
  &:before {
    --direction: bottom;
    top: 0;
    opacity: v-bind(scrollIndicatorTopOpacity);
  }
  &:after {
    --direction: top;
    bottom: 0;
    opacity: v-bind(scrollIndicatorBottomOpacity);
  }
}
.q-scrollarea {
  width: 100%;
  height: 100%;
}
</style>

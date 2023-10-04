<template>
  <div ref="elHook"></div>
  <slot :elProgress="elProgress"
        :topProgress="topProgress"
        :bottomProgress="bottomProgress"
        :inViewport="inViewport"
        :enteredViewport="enteredViewport"
  ></slot>
</template>

<script lang="ts" setup>
interface Props {
  elIn?: string,
  elOut?: string,
  topIn?: string,
  topOut?: string,
  bottomIn?: string,
  bottomOut?: string,
  easing?: number,
  cssVars?: boolean,
  viewportClasses?: boolean,
  clampElMin?: number,
  clampElMax?: number,
  clampTopMin?: number,
  clampTopMax?: number,
  clampBottomMin?: number,
  clampBottomMax?: number,
}
const props = withDefaults(defineProps<Props>(), {
  elIn: 'b',
  elOut: 't',
  topIn: 'b',
  topOut: 't',
  bottomIn: 'b',
  bottomOut: 't',
  easing: 240,
  cssVars: true,
  viewportClasses: true,
  clampElMin: 0,
  clampElMax: 1,
  clampTopMin: 0,
  clampTopMax: 1,
  clampBottomMin: 0,
  clampBottomMax: 1,
})

const el = ref<HTMLElement>() as Ref<HTMLElement>;
const elHook = ref<HTMLElement>() as Ref<HTMLElement>;
const windowSize = useWindowSize();
const windowHeight = computed((): number => windowSize.height.value);
const { top, height } = useElementBounding(el);
const inViewport = useElementVisibility(el);
const enteredViewport = ref(false);
const stopEnterViewportWatcher = watchImmediate(inViewport, (value) => {
  if (value) {
    enteredViewport.value = true;
    stopEnterViewportWatcher();
  }
});

const clamp = (input: number, min: number, max: number): number => {
  return Math.min(Math.max(input, min), max);
}

let ts = performance.now();
const currentElProgress = ref<number>(clamp(0, props.clampElMin, props.clampElMax));
const currentTopProgress = ref<number>(clamp(0, props.clampTopMin, props.clampTopMax));
const currentBottomProgress = ref<number>(clamp(0, props.clampBottomMin, props.clampBottomMax));

const elIn = computed(() => parseExpression(props.elIn));
const elOut = computed(() => parseExpression(props.elOut));
const elRange = computed((): { min: number, max: number } => {
  return {
    min: elIn.value,
    max: elOut.value - height.value,
  };
})
const elProgress = computed(() => {
  return clamp(getPercentInRange(top.value, elRange.value.min, elRange.value.max), props.clampElMin, props.clampElMax);
})

const topIn = computed(() => parseExpression(props.topIn));
const topOut = computed(() => parseExpression(props.topOut));
const topRange = computed((): { min: number, max: number } => {
  return {
    min: topIn.value,
    max: topOut.value,
  }
})
const topProgress = computed(() => {
  return clamp(getPercentInRange(top.value, topRange.value.min, topRange.value.max), props.clampTopMin, props.clampTopMax);
})

const bottomIn = computed(() => parseExpression(props.bottomIn));
const bottomOut = computed(() => parseExpression(props.bottomOut));
const bottomRange = computed((): { min: number, max: number } => {
  return {
    min: bottomIn.value - height.value,
    max: bottomOut.value - height.value,
  }
})
const bottomProgress = computed(() => {
  return clamp(getPercentInRange(top.value, bottomRange.value.min, bottomRange.value.max), props.clampBottomMin, props.clampBottomMax);
})

const easing = computed(() => 1 / Math.max(props.easing, 0.0001));

useRafFn(() => {
  if (props.cssVars) {
    const dt = performance.now() - ts;
    const e = Math.min(easing.value * dt, 1);
    ts = performance.now();

    const dElProgress = Math.abs(elProgress.value - currentElProgress.value);
    currentElProgress.value += (elProgress.value - currentElProgress.value) * e;
    if (dElProgress < 0.0001) currentElProgress.value = elProgress.value;
    el.value.style.setProperty('--ve-el-progress', `${elProgress.value}`);
    el.value.style.setProperty('--ve-el-progress-eased', `${currentElProgress.value}`);

    const dTopProgress = Math.abs(topProgress.value - currentTopProgress.value);
    currentTopProgress.value += (topProgress.value - currentTopProgress.value) * e;
    if (dTopProgress < 0.0001) currentTopProgress.value = topProgress.value;
    el.value.style.setProperty('--ve-top-progress', `${topProgress.value}`);
    el.value.style.setProperty('--ve-top-progress-eased', `${currentTopProgress.value}`);

    const dBottomProgress = Math.abs(bottomProgress.value - currentBottomProgress.value);
    currentBottomProgress.value += (bottomProgress.value - currentBottomProgress.value) * e;
    if (dBottomProgress < 0.0001) currentBottomProgress.value = bottomProgress.value;
    el.value.style.setProperty('--ve-bottom-progress', `${bottomProgress.value}`);
    el.value.style.setProperty('--ve-bottom-progress-eased', `${currentBottomProgress.value}`);
  }

  if (props.viewportClasses) {
    if (inViewport.value) {
      el.value.classList.add('ve-in-viewport');
    } else {
      el.value.classList.remove('ve-in-viewport');
    }
    if (enteredViewport.value) el.value.classList.add('ve-entered-viewport');
  }
})

const parseExpression = (expression: string): number => {
  const regex = /([tb])([+-]?)(\d+)?(vh|px)?/g;
  const parts = regex.exec(expression);
  if (!parts) {
    console.error(`Unable to parse ViewportElement expression: ${expression}`);
    return 0;
  }
  const origin = parts[1] === 't' ? 0 : windowHeight.value;
  if (expression.length === 1) return origin;
  const sign = parts[2] === '+' ? 1 : -1;
  const unit = parts[4];
  let value = parseFloat(parts[3]);
  if (unit === 'vh') {
    value = value * windowHeight.value / 100;
  }
  return origin + (value * sign);
}

const getPercentInRange = (input: number, min: number, max: number): number => {
  return (input - min) / (max - min);
}

onMounted(() => {
  el.value = elHook.value.nextElementSibling;
  elHook.value.remove();
})

defineExpose({
  elProgress,
  topProgress,
  bottomProgress,
  inViewport,
  enteredViewport,
})
</script>

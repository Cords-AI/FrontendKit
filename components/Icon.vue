<template>
  <q-icon ref="qRef" :name="name" :size="sizePx" :style="vfDeclaration">
    <slot></slot>
  </q-icon>
</template>

<script lang="ts" setup>
const qRef = ref();
defineExpose({
  qRef,
})

interface Props {
  name: string,
  size?: number|string,
  outlined?: boolean,
  rounded?: boolean,
  sharp?: boolean,
  weight?: number|string,
  grade?: number|string,
  fill?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  outlined: false,
  rounded: false,
  sharp: false,
  weight: 400,
  grade: 0,
  fill: false,
})

let namePrefix;
if (props.outlined) {
  namePrefix = 'sym_o_';
}
else if (props.rounded) {
  namePrefix = 'sym_r_';
}
else if (props.sharp) {
  namePrefix = 'sym_s_';
}
if (!namePrefix) namePrefix = 'sym_o_';
const name = `${namePrefix}${props.name}`;

let size = props.size;
if (typeof size === 'string') {
  size = size.replace('px', '');
  size = Number(size);
}
const sizePx = `${size}px`;

const opsz = Math.min(Math.max(size, 20), 48);
const weight = Math.min(Math.max(Number(props.weight), 100), 700);
const grade = Math.min(Math.max(Number(props.grade), -50), 200);
const fill = props.fill ? 1 : 0;

const vfValue = `"FILL" ${fill}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opsz}`;
const vfDeclaration = `font-variation-settings: ${vfValue}`;
</script>

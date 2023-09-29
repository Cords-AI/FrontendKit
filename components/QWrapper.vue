<template>
  <div data-css-scope="quasar" :data-q-component-wrapper="qName" :class="qClasses" v-if="props.qScope">
    <component :is="props.qComponent" v-bind="propsToPass" ref="qComponent" :data-q-component="qName">
      <template v-for="(slot, slotName) in $slots" v-slot:[slotName]>
        <component :is="slot"></component>
      </template>
    </component>
  </div>
  <component :is="props.qComponent" v-bind="propsToPass" ref="qComponent" :data-q-component="qName" v-else>
    <template v-for="(slot, slotName) in $slots" v-slot:[slotName]>
      <component :is="slot"></component>
    </template>
  </component>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

interface Props {
  qComponent: Object,
  qMethods?: String[],
  qScope?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  qMethods: [],
  qScope: true,
})

const qComponent = ref();
const qName = props.qComponent.name;
const qProps = props.qComponent.props;
const attrs = useAttrs();

const camelize = (str) => {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
}

const propsToPass = computed(() => {
  const filteredProps = {};
  const qPropKeys = Object.keys(qProps);
  for (const prop in attrs) {
    const propCamel = camelize(prop);
    if (qPropKeys.includes(propCamel) || typeof attrs[prop] === 'function') {
      filteredProps[propCamel] = attrs[prop];
    }
  }
  return filteredProps;
});

const qClasses = computed(() => {
  const possibleClasses = [
    'body--dark',
    'body--light',
    'desktop',
    'mobile',
    'touch',
    'no-touch',
    'platform-android',
    'platform-ios',
    'native-mobile',
    'electron',
    'bex',
    'within-iframe',
  ];
  const classList = Array.from(document.body.classList);
  return classList.filter(value => possibleClasses.includes(value));
})

const exposed = {};
props.qMethods.forEach((methodName) => {
  const proxyFunction = (...params) => {
    return qComponent.value[methodName](...params);
  }
  exposed[methodName] = proxyFunction;
})
defineExpose(exposed)
</script>

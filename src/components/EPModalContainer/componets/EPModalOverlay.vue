<template>
  <div class="ep_modal__overlay" @click="closeHandler">
    <slot :close="closeHandler"></slot>
  </div>
</template>
<script setup lang="ts">
import { provide, ref } from 'vue'
import { EP_MODAL_OVERLAY_REF } from '../../constants'
const emit = defineEmits<{ (event: 'close', value: Event): void }>()
const closeObj = ref<(event: Event) => void>()
provide(EP_MODAL_OVERLAY_REF, closeObj)
const closeHandler = (event: Event) => {
  if (closeObj.value) closeObj.value(event)
  else emit('close', event)
}
</script>
<style scoped lang="scss">
.ep_modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100lvh;
  width: 100lvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0000003d;
  backdrop-filter: blur(4px);
}
</style>

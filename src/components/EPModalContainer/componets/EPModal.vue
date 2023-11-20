<template>
  <div ref="modalBody" class="ep_modal" @click.stop @keyup="onKeyUp">
    <div class="ep_modal__header">
      <slot name="header">
        <h4 class="ep_modal__title" v-if="title">{{ title }}</h4>
      </slot>
    </div>
    <CloseIcon class="close_icon" @click="closeHandler" />

    <div class="ep_modal__content">
      <slot class="ep_modal__content"></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CloseIcon } from './index'
const emit = defineEmits<{
  (event: 'close', value: Event): void
}>()
defineProps<{
  title?: string
}>()
const onKeyUp = (event: KeyboardEvent) => {
  if (event.code === 'Escape') {
    closeHandler(event)
  }
}
const closeHandler = (event: Event) => {
  emit('close', event)
}
const modalBody = ref<HTMLDivElement>()
onMounted(() => modalBody.value?.focus())
</script>
<style scoped lang="scss">
@keyframes fromup {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }
  to {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    transform: translateY(0);
    opacity: 1;
  }
}
.ep_modal__header {
  min-height: 2rem;
  padding: 0.25em;
  display: flex;
  justify-content: center;
  background-color: var(--ep-header-bg-color);
  color: var(--ep-header-text-color);
  border-top-right-radius: var(--ep-modal-border-radius);
  border-top-left-radius: var(--ep-modal-border-radius);
}
.ep_modal__title {
  text-align: center;
  font-size: 1.2rem;
}
.ep_modal {
  animation: fromup 0.3s ease-in 1;
  height: 100%;
  width: 100%;
  background-color: var(--ep-modal-bg-color);
  position: relative;
  overflow: hidden;
}
.ep_modal__content {
  padding: var(--ep-modal-content-padding);
}
.close_icon {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--ep-header-text-color);
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}
@media screen and (min-width: 699px) {
  .ep_modal {
    min-width: 350px;
    width: fit-content;
    height: fit-content;
    border-radius: var(--ep-modal-border-radius);
  }
}
</style>

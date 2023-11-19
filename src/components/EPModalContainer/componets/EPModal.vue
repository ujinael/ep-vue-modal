<template>
  <div class="ep_modal" @click.stop>
    <div class="ep_modal__header">
      <slot name="header">
        <h4 class="ep_modal__title" v-if="title">{{ title }}</h4>
      </slot>
    </div>
    <CloseIcon class="close_icon" @click="closeHandler" />

    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
<script setup lang="ts">
import { CloseIcon } from './index'
const emit = defineEmits<{
  (event: 'close', value: Event): void
}>()
defineProps<{
  title?: string
}>()

const closeHandler = (event: Event) => {
  emit('close', event)
}
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
  padding: 0.25em;
  display: flex;
  justify-content: center;
  background-color: var(--ep-header-bg-color);
  color: var(--ep-header-text-color);
}
.ep_modal__title {
  text-align: center;
  font-size: 1.2rem;
}
.ep_modal {
  animation: fromup 0.3s ease-in 1;
  height: 100%;
  width: 100%;
  background-color: white;
  position: relative;
}
.close_icon {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ffffff;
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
    border-radius: var(--common_border-radius);
  }
}
</style>

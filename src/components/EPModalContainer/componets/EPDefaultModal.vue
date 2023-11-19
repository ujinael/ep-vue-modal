<template>
  <div class="confirm__body" @keyup="onKeyUp" ref="modalBody" tabindex="0">
    <h3>{{ title }}</h3>
    <div>{{ message }}</div>
    <div class="controls" v-if="buttons">
      <button
        class="ep_modal__button"
        @click="btn.handler"
        v-for="(btn, index) in buttons"
        :key="index"
        :v-style="getButtonStyle(index)"
      >
        {{ btn.title }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useModal } from '@/components/composable/'
import type { IConfirmButton } from '@/components/types'
import { onMounted, ref } from 'vue'
const { hideModal } = useModal()
withDefaults(
  defineProps<{
    title?: string
    message?: string
    buttons?: Array<IConfirmButton>
  }>(),
  {
    title: 'Сообщение',
    message: 'Закрыть окно?'
  }
)
const getButtonStyle = (index: number) => {
  if (index === 0) return 'accept'
  if (index === 1) return 'cancel'
  return 'default'
}
const onKeyUp = (event: KeyboardEvent) => {
  if (event.code === 'Escape') {
    hideModal()
  }
}
const modalBody = ref<HTMLDivElement>()
onMounted(() => modalBody.value?.focus())
</script>
<style scoped lang="scss">
.confirm__body {
  max-width: 350px;
  text-align: center;
  &:focus-visible {
    outline: none;
  }
  & .controls {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    & > .ep_modal__button {
      flex: 1 0 auto;
    }
  }
}
</style>

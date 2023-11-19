<template>
  <div class="ep_modal__container">
    <TransitionGroup name="fromup">
      <EPModalOverlay
        @close="modal.closeHandler"
        v-for="(modal, index) in getModalsStack"
        :key="index"
        #="{ close }"
      >
        <EPModal :title="getTitle(modal.header)" @close="close">
          <template v-if="showHeaderSlot(modal.header)" #header
            ><component :is="modal.header" />
          </template>
          <component :is="modal.content" />
          <template #footer v-if="modal.footer">
            <component :is="modal.footer" />
          </template>
        </EPModal>
      </EPModalOverlay>
    </TransitionGroup>
  </div>
</template>
<script setup lang="ts">
import { type Component } from 'vue'
import { useModal } from '../composable'
import EPModal from './componets/EPModal.vue'
import EPModalOverlay from './componets/EPModalOverlay.vue'
const { getModalsStack } = useModal()

const showHeaderSlot = (header?: Component | string) => {
  if (!header) return false
  if (typeof header !== 'string') return true
  else return false
}
const getTitle = (header?: Component | string) => {
  if (typeof header === 'string') return header
  else return undefined
}
</script>
<style scoped lang="scss"></style>

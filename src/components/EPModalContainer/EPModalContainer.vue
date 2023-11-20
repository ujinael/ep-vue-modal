<template>
  <div class="ep_modal__container">
    <TransitionGroup name="fade">
      <component v-for="(modal, index) in getModalsStack" :key="index" :is="modal" />
    </TransitionGroup>
  </div>
</template>
<script setup lang="ts">
import { useModal } from '../composable'
const { getModalsStack } = useModal()
</script>

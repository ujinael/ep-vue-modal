import { computed, inject, reactive, ref, type Ref } from 'vue'
import type { ICloseEventCallback, IModalContainer, IShowDefaultModal } from '../types'
import type { IModalComposable, IShowModal } from '../types'
import { EP_MODAL_CONTAINER_INSTANSE, EP_MODAL_OVERLAY_REF } from '../constants'

export const useModal: IModalComposable = () => {
  const modalContainer = reactive<IModalContainer>(inject(EP_MODAL_CONTAINER_INSTANSE)!)
  const hideModal = () => {
    modalContainer.hide()
  }
  const showModal: IShowModal = (...args: Parameters<typeof modalContainer.show>) => {
    return modalContainer.show(...args)
  }
  const showDefaultModal: IShowDefaultModal = (options) => {
    return modalContainer.showDefault(options)
  }
  const closeEventRef = inject<Ref<ICloseEventCallback>>(
    EP_MODAL_OVERLAY_REF,
    ref(() => {})
  )
  const getModalsStack = computed(() => modalContainer.modals)
  const handleClose = (callback: ICloseEventCallback) => {
    closeEventRef.value = callback.bind(undefined, hideModal)
  }
  return { getModalsStack, hideModal, handleClose, showModal, showDefaultModal }
}

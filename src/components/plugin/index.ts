import { ModalContainer } from '@/components/EPModalContainer/api'
import { type Plugin } from 'vue'
import { EP_MODAL_CONTAINER_INSTANSE } from '../constants'

export const installModalPlugin: Plugin = {
  install(app) {
    const container = new ModalContainer()
    app.provide(EP_MODAL_CONTAINER_INSTANSE, container)
  }
}

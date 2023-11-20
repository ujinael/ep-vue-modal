import { ModalContainer } from '@/components/EPModalContainer/api'
import type { Plugin, Component } from 'vue'
import { EP_MODAL_CONTAINER_INSTANSE } from '../constants'

export const installModalPlugin: Plugin = {
  install(app, customModal?: new () => Component) {
    const container = new ModalContainer(customModal)
    app.provide(EP_MODAL_CONTAINER_INSTANSE, container)
  }
}

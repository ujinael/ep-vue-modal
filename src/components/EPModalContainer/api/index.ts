import { type Component, h, markRaw } from 'vue'
import type {
  ComponentProps,
  IDefaultModalOptions,
  IModal,
  IModalContainer,
  IShowModalOptions
} from '@/components/types'
import { EPDefaultModal } from '../componets'

export class ModalContainer implements IModalContainer {
  modals: Array<IModal> = []

  show<C extends Component>(content: C, props: ComponentProps<C>, options?: IShowModalOptions) {
    const newModal = h(content, { ...props })
    let header: Component | string | undefined = undefined
    if (options && options.header) {
      if (typeof options.header !== 'string') header = markRaw(options.header)
      else header = options.header
    }
    this.modals.push({
      content: newModal,
      closeHandler: options?.closeHandler ?? this.hide.bind(this),
      header,
      footer: options?.footer ? markRaw(options.footer) : undefined
    })
  }

  showDefault(options: IDefaultModalOptions) {
    const newModal = h(EPDefaultModal, { ...options })
    this.modals.push({ content: newModal, closeHandler: this.hide.bind(this) })
  }
  hide() {
    if (this.modals.length) this.modals.pop()
  }
}

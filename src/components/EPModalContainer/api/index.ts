import { type Component, h, markRaw } from 'vue'
import type {
  ComponentProps,
  IDefaultModalOptions,
  IModal,
  IModalContainer,
  IShowModalOptions
} from '@/components/types'
import { EPModal, EPModalOverlay } from '../componets'

export class ModalContainer implements IModalContainer {
  private _defaultModal: new (...args: any[]) => Component
  constructor(modal: new (...args: any[]) => Component = EPModal) {
    this._defaultModal = markRaw(modal)
  }
  modals: Array<IModal> = []
  private renderModal<C extends Component>(
    modalContent: C,
    contentProps: ComponentProps<C> | null,
    options?: IShowModalOptions
  ) {
    let modalTitle: string | undefined
    let headerSlot: Component | undefined = undefined
    let footerSlot: Component | undefined = undefined
    if (options && options.header) {
      if (typeof options.header === 'string') modalTitle = options.header
      else headerSlot = options.header
    }
    if (options && options.footer) footerSlot = options.footer
    const modal = h(
      EPModalOverlay,
      { onClose: () => this.hide() },
      {
        default: (props: { close: (event: Event) => void }) =>
          h(
            this._defaultModal,
            { title: modalTitle, onClose: props.close },
            {
              header: headerSlot ? () => h(headerSlot!) : undefined,
              default: () => h(modalContent, contentProps),
              footer: footerSlot ? () => h(footerSlot!) : undefined
            }
          )
      }
    )
    return modal
  }
  show<C extends Component>(
    content: C,
    props: ComponentProps<C> | null,
    options?: IShowModalOptions
  ) {
    const newModal = this.renderModal(content, props, options)
    this.modals.push(markRaw(newModal))
  }

  showDefault(options: IDefaultModalOptions) {
    this.show(h('div', { class: 'ep_modal__confirm' }, [options.message]), null, {
      header: options.title,
      footer: options.buttons
        ? () =>
            h(
              'div',
              { class: 'ep_modal__confirm_controls' },
              options.buttons?.map((btn) => {
                if ('title' in btn) {
                  return h('button', { class: 'ep_modal__button', onClick: btn.handler }, [
                    btn.title
                  ])
                }
                return markRaw(h(btn))
              })
            )
        : undefined
    })
  }
  hide() {
    if (this.modals.length) this.modals.pop()
  }
}

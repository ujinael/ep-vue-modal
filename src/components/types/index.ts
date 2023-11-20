import type { AllowedComponentProps, Component, ComputedRef, VNodeProps } from 'vue'

export type ComponentProps<C extends Component> = C extends new (...args: any) => any
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

export type IShowModalOptions = {
  closeHandler?: () => void
  header?: Component | string
  footer?: Component
}
export type IShowModal = <C extends Component>(
  content: C,
  props: ComponentProps<C>,
  options?: IShowModalOptions
) => void
export type IShowDefaultModal = (options: IDefaultModalOptions) => void

export type ICloseEventCallback = (hideModal: () => void, ...args: any) => void
export type ICloseModalInterceptor = (callback: ICloseEventCallback) => void
export type IModalApi = {
  getModalsStack: ComputedRef<Array<IModal>>
  hideModal: () => void
  /**
   *
   * @param callback - take a handle close as 1st arg, event from target that emit close event 2nd arg
   * @returns void
   * @description this method use for intercept onClose event, to preventing close or realise some before closing logic
   */
  handleClose: ICloseModalInterceptor
  /**
   * @param {Component} content - Content, that will be placed inside modal body
   * @param props - props of Content component, taken from defineProps
   * @param options - options to handle close modal event, include header or footer to modal
   * @description injectable method to open modal with your own content
   */

  showModal: IShowModal
  /**
   * @param {IDefaultModalOptions} options - an object with title, message, and buttons
   * @description - injectable method to show predefined onfirm modal with optional title, message and handled buttons
   */
  showDefaultModal: IShowDefaultModal
}
export type IModalComposable = () => IModalApi
export interface IDefaultModalOptions {
  title?: string
  message?: string
  buttons?: Array<IConfirmButton | Component>
}
export interface IConfirmButton {
  title: string
  handler: () => void
}
export type IModal = Component
export interface IModalContainer {
  modals: Array<IModal>
  show: IShowModal
  showDefault: (options: IDefaultModalOptions) => void
  hide: () => void
}

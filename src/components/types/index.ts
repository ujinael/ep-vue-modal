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
   * @param callback
   * @returns
   * @description this method use for intercept onClose event, to preventing close or realise some before closing logic
   */
  handleClose: ICloseModalInterceptor
  showModal: IShowModal
  showDefaultModal: IShowDefaultModal
}
export type IModalComposable = () => IModalApi
export interface IDefaultModalOptions {
  title?: string
  message?: string
  buttons?: Array<IConfirmButton>
}
export interface IConfirmButton {
  title: string
  handler: () => void
}
export interface IModal {
  header?: Component | string
  content: Component
  footer?: Component
  closeHandler: () => void
}
export interface IModalContainer {
  modals: Array<IModal>
  show: IShowModal
  showDefault: (options: IDefaultModalOptions) => void
  hide: () => void
}

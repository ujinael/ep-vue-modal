# ep-vue-modal
Small library to work with modals

## Installation via npm

1. 
```sh
npm install ep-vue-modal
```

2. 
    in main.ts 
    *
    import 'ep-vue-modal/styles'
        import { installModalPlugin } from 'ep-vue-modal'
          ...
        app.use(installModalPlugin)
    *
3.
in root component (typicaly App.vue)
    *
    <template>
            ...your code
        <EPModalContainer/>
    </template>
    <script setup>
    import {EPModalContainer} from 'ep-vue-modal'
    </script>
    *

## Show modal
When you need open modal from any component in app
    *
            <template>
                <button @click="openModalHandler">
            </template>
            <script setup>
            import { useModal } from 'ep-vue-modal'
            import YourModalComponent from '../../YourModalComponent.vue'
            const {showModal,hideModal} = useModal()
            const openModalHandler = ()=>{
            showModal(YourModalComponent,{
                ...yourComponenProps
            },{
                closeHandler:()=>{
            ...your before close logic
            hideModal()
                }
            })
            }
            </script>
    *

## Prevent close modal in your modal content component
in your modal content component
    ```
        <template>
            <div> My modal content </div>
        </template>
        <script setup>
        import { useModal } from 'ep-vue-modal'
        import YourModalComponent from '../../YourModalComponent.vue'
        const { closeHandler } = useModal()
        closeHandler((hide,event:Evvent)=>{
        ...your logic before close modal
        hide()
        })
        </script>
    ```

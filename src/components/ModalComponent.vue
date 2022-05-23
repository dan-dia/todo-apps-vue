<template>
<section class="my-3 d-flex justify-content-center">
    <b-button v-b-modal.modal variant="outline-success" size="sm"><b-icon-plus-lg></b-icon-plus-lg> Create new todo</b-button>
    <b-modal id="modal" title="New Todo" size="lg" no-close-on-backdrop ok-only ok-title="Close" ok-variant="secondary">
        <FormComponent modal="modal" :data="data" />
    </b-modal>
</section>
</template>

<script>
import FormComponent from './FormComponent.vue'

export default {
    name: 'ModalComponent',
    props: ['data'],
    components: {
        FormComponent
    }
}
</script>
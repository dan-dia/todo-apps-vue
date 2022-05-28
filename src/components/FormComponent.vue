<template>
  <b-form v-on:submit.prevent="onSubmit" @reset.prevent="onReset" v-if="state.modal">
    <b-form-group label="Title" label-for="title">
      <b-form-input
        id="title"
        v-model.trim="state.form.title"
        type="text"
        placeholder="Enter title..."
        size="sm"
        :state="validationTitle"
        autofocus
      ></b-form-input>
      <b-form-invalid-feedback :state="validationTitle">
        Title is required
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Description" label-for="description">
      <b-form-input
        id="description"
        v-model.trim="state.form.description"
        placeholder="Enter description..."
        size="sm"
        :state="validationDescription"
      ></b-form-input>
      <b-form-invalid-feedback :state="validationDescription">
        Description is required
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
        <b-form-checkbox v-model="state.form.isCompleted">Completed</b-form-checkbox>
    </b-form-group>

    <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script setup>
import { reactive, computed, nextTick } from "@vue/composition-api";
import { v4 as uuidv4 } from "uuid";
import Vue from "vue";

const props = defineProps({
  modal: {
    type: String
  },
  data: {
    type: Array,
    required: true
  }
});

const state = reactive({
  form: {
    title: '',
    description: '',
    isComplete: false,
  },
  validate: {
    title: null,
    description: null,
  },
  modal: true
});

function onSubmit() {
  const prevData = props.data;
  validation();
  if (checkValidation()) {
    const data = {
      id: uuidv4(),
      title: state.form.title,
      description: state.form.description,
      isCompleted: state.form.isCompleted,
    };
    
    prevData.push(data);
    localStorage.setItem('TODO-APPS', JSON.stringify(prevData));
    
    Vue.swal({
      title: 'Success', 
      text: 'Data has been added!', 
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      backdrop: false
    }).then((result) => {
      if (result.dismiss === Vue.swal.DismissReason.timer) {
        Vue.swal({
          text: 'Do you want to add another todo ?',
          icon: 'question',
          backdrop: false,
          focusConfirm: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            onReset();
          } else {
            this.$bvModal.hide(props.modal);
          }
        })
      }
    });
  }
}

const validationTitle = computed(() => {
  return state.validate.title;
});

const validationDescription = computed(() => {
  return state.validate.description;
});

function onReset() {
  // Reset our form values
  state.form.title = '';
  state.form.description = '';
  state.form.isCompleted = false;
  // Trick to reset/clear native browser form validation state
  state.modal = false;
  nextTick(() => {
    state.modal = true;
  });
};

function validation() {
  resetValidation();
  const input = document.querySelectorAll('input[type=text]');
  input.forEach(element => {
    if (element.value.trim() == '') {
      (element.id == 'title') ? state.validate.title = false : null;
      (element.id == 'description') ? state.validate.description = false : null;
    }
  });
}

function resetValidation() {
  state.validate.title = null;
  state.validate.description = null;
}

function checkValidation() {
  if (state.validate.title != false 
      && state.validate.description != false) {
    return true;
  }
  return false;
}

</script>
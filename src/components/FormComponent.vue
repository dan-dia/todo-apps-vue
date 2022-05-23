<template>
  <b-form v-on:submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
    <b-form-group label="Title" label-for="title">
      <b-form-input
        id="title"
        v-model.trim="form.title"
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
        v-model.trim="form.description"
        placeholder="Enter description..."
        size="sm"
        :state="validationDescription"
      ></b-form-input>
      <b-form-invalid-feedback :state="validationDescription">
        Description is required
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
        <b-form-checkbox v-model="form.isCompleted">Completed</b-form-checkbox>
    </b-form-group>

    <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
  export default {
    name: 'FormComponent',
    props: ['modal', 'data'],
    data() {
      return {
        form: {
          title: '',
          description: '',
          isCompleted: false
        },
        validate: {
          title: null,
          description: null
        },
        show: true
      }
    },
    methods: {
      onSubmit() {
        const prevData = this.data;
        if (this.checkValidation()) {
          const data = {
            id: uuidv4(),
            title: this.form.title,
            description: this.form.description,
            isCompleted: this.form.isCompleted,
          };
          
          prevData.push(data);
          localStorage.setItem('TODO-APPS', JSON.stringify(prevData));
          
          this.$swal({
            title: 'Success', 
            text: 'Data has been added!', 
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            backdrop: false
          }).then((result) => {
            if (result.dismiss === this.$swal.DismissReason.timer) {
              this.$swal({
                text: 'Do you want to add another todo ?',
                icon: 'question',
                backdrop: false,
                focusConfirm: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.onReset();
                } else {
                  this.$bvModal.hide(this.modal)
                }
              })
            }
          });
        }
      },
      onReset() {
        // Reset our form values
        this.form.title = '';
        this.form.description = '';
        this.form.isCompleted = false;
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        })
      },
      validation() {
        this.resetValidation();
        const input = document.querySelectorAll('input[type=text]');
        input.forEach(element => {
          if (element.value.trim() == '') {
            (element.id == 'title') ? this.validate.title = false : '';
            (element.id == 'description') ? this.validate.description = false : '';
          }
        });
      },
      resetValidation() {
        this.validate.title = null;
        this.validate.description = null;
      },
      checkValidation() {
        if (this.validate.title != false 
            && this.validate.description != false ) {
          return true;
        }
        return false;
      }
    },
    computed: {
      validationTitle() {
        return this.validate.title;
      },
      validationDescription() {
        return this.validate.description;
      }
    }
  }
</script>
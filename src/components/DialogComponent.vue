<template>
  <v-row justify="center" class="my-3">
    <v-dialog v-model="state.dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" dark v-bind="attrs" v-on="on">
          <v-icon large>mdi-plus</v-icon> Create New Todo
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form @submit.prevent="handleSubmit">
                  <v-text-field
                    label="Description"
                    v-model="state.todo"
                    hide-details="auto"
                    :rules="[() => !!state.todo || 'This field is required']"
                    autofocus
                  ></v-text-field>
                  <v-checkbox
                    v-model="state.checkbox"
                    label="Is Completed ?"
                    hide-details="true"
                  ></v-checkbox>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="handleCancel"> Cancel </v-btn>
          <v-btn
            color="primary"
            @click.prevent="handleSubmit"
            :disabled="checkInput()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { reactive } from "@vue/composition-api";

const state = reactive({
  dialog: false,
  todo: "",
  checkbox: false,
  valid: true,
});

const emit = defineEmits(["addTodo"]);

const handleSubmit = () => {
  emit("addTodo", {
    id: new Date().toISOString(),
    description: state.todo,
    isCompleted: state.checkbox,
  });
  state.dialog = false;
  state.todo = " ";
  state.checkbox = false;
};

const handleCancel = () => {
  state.dialog = false;
  state.todo = " ";
  state.checkbox = false;
};

const checkInput = () => {
  return state.todo.trim() === "";
};
</script>

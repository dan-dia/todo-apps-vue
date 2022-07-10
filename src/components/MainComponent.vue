<template>
  <v-main>
    <v-container fluid>
      <DialogComponent @addTodo="addTodo"></DialogComponent>
      <v-row v-if="state.todos.length">
        <v-col cols="12" sm="6" id="todo">
          <h2>Todo</h2>
          <v-card
            v-for="todo in state.todosIsCompleted"
            :key="todo.id"
            class="mb-3"
          >
            <v-card-text class="py-2">
              <v-flex class="d-flex align-center">
                <v-checkbox
                  v-model="todo.isCompleted"
                  color="success"
                  hide-details
                  class="my-0 flex-grow-1"
                >
                  <template v-slot:label>
                    <h3
                      :class="{
                        'text-decoration-line-through': todo.isCompleted,
                      }"
                    >
                      {{ todo.description }}
                    </h3>
                  </template>
                </v-checkbox>
                <v-btn
                  class="ms-auto"
                  color="error"
                  @click="deleteTodo(todo.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" id="todo">
          <h2>Completed</h2>
          <v-card
            v-for="todo in state.todosCompleted"
            :key="todo.id"
            class="mb-3"
          >
            <v-card-text class="py-2">
              <v-flex class="d-flex align-center">
                <v-checkbox
                  v-model="todo.isCompleted"
                  color="success"
                  hide-details
                  class="my-0 flex-grow-1"
                >
                  <template v-slot:label>
                    <h3
                      :class="{
                        'text-decoration-line-through': todo.isCompleted,
                      }"
                    >
                      {{ todo.description }}
                    </h3>
                  </template>
                </v-checkbox>
                <v-btn
                  class="ms-auto"
                  color="error"
                  @click="deleteTodo(todo.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <h3 class="text-center my-3 font-italic font-weight-light">
            Todo Not Found :(
          </h3>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import DialogComponent from "./DialogComponent.vue";

import { reactive, onMounted, onBeforeUpdate } from "@vue/composition-api";
import Vue from "vue";

const state = reactive({
  todosCompleted: [],
  todosIsCompleted: [],
  todos: JSON.parse(localStorage.getItem("TODO-APPS")) || [],
  index: 0,
});

function addTodo(value) {
  state.todos.push(value);
  localStorage.setItem("TODO-APPS", JSON.stringify(state.todos));
  Vue.swal({
    position: "top-end",
    timer: 1500,
    showConfirmButton: false,
    icon: "success",
    toast: true,
    title: "Todo has been Added",
    timerProgressBar: true,
  });
}

onMounted(() => {
  filterTodo();
});

onBeforeUpdate(() => {
  state.todosCompleted = [];
  state.todosIsCompleted = [];
  filterTodo();
});

function filterTodo() {
  state.todos.filter((todo) => {
    if (todo.isCompleted) {
      state.todosCompleted.push(todo);
    } else {
      state.todosIsCompleted.push(todo);
    }
  });
}

function deleteTodo(id) {
  filterByTodoIndex(id);
  state.todos.splice(state.index, 1);
  localStorage.setItem("TODO-APPS", JSON.stringify(state.todos));
  Vue.swal({
    position: "top-end",
    timer: 1500,
    showConfirmButton: false,
    icon: "success",
    toast: true,
    title: "Todo has been removed",
    timerProgressBar: true,
  });
}

function filterByTodoIndex(id) {
  let index = 0;
  state.todos.forEach((todo) => {
    if (todo.id === id) {
      state.index = index;
    } else {
      index++;
    }
  });
}
</script>

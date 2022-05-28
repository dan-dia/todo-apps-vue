<template>
<main class="container-fluid">
    <ModalComponent :data="state.todos" :modal="state.modal"></ModalComponent> 
    <b-row no-gutters v-if="state.todos.length">
        <b-col lg="6" class="mb-3" id="todo">
            <h2>Todo</h2>
            <hr class="mx-1">
            <TodoComponent :todos="state.todosIsCompleted" @todoToCompleted="todoToCompleted" @todoDelete="todoDelete"></TodoComponent>
        </b-col>
        <b-col lg="6" class="mb-3" id="completed">
            <h2>Completed</h2>
            <hr class="mx-1">
            <TodoComponent :todos="state.todosCompleted" @todoToIsCompleted="todoToIsCompleted" @todoDelete="todoDelete"></TodoComponent>
        </b-col>
    </b-row>
    <b-row align-content="center" v-else>
        <b-col>
            <h3 class="font-weight-light font-italic text-center my-3">Todo Not Found :(</h3>
        </b-col>
    </b-row>
</main>
</template>

<script setup>
import ModalComponent from './ModalComponent.vue'
import TodoComponent from './TodoComponent.vue'

import { reactive, onMounted, onBeforeUpdate, computed } from "@vue/composition-api";
import Vue from 'vue';

const state = reactive({
    todosCompleted: [],
    todosIsCompleted: [],
    todos: JSON.parse(localStorage.getItem('TODO-APPS')) || [],
    index: 0,
    modal: false
});

onMounted(() => {
    filterTodo();
    
});

onBeforeUpdate(() =>  {
    state.todosCompleted = [];
    state.todosIsCompleted = [];
    filterTodo();
});

function filterTodo() {
    state.todos.filter(todo => {
        if (todo.isCompleted) {
            state.todosCompleted.push(todo);
        } else {
            state.todosIsCompleted.push(todo);
        } 
    });
};

console.log(state.todosCompleted);
console.log(state.todosIsCompleted);

function todoToCompleted(id) {
    const data = filterByTodoID(id);
    data.isCompleted = true;
    filterByTodoIndex(id);
    state.todos.splice(state.index, 1);
    state.todos.push(data);
    localStorage.setItem('TODO-APPS', JSON.stringify(state.todos));
    Vue.swal({
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false,
        icon: 'success',
        toast: true,
        title: 'Todo has finished',
        timerProgressBar: true
    })
    state.index = 0;
}

function todoToIsCompleted(id) {
    const data = filterByTodoID(id);
    data.isCompleted = false;
    filterByTodoIndex(id);
    state.todos.splice(state.index, 1);
    state.todos.push(data);
    localStorage.setItem('TODO-APPS', JSON.stringify(state.todos));
    Vue.swal({
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false,
        icon: 'success',
        toast: true,
        title: 'Todo is not finished',
        timerProgressBar: true
    })
    state.index = 0;
}
function todoDelete(id) {
    filterByTodoIndex(id);
    state.todos.splice(state.index, 1);
    localStorage.setItem('TODO-APPS', JSON.stringify(state.todos));
    Vue.swal({
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false,
        icon: 'success',
        toast: true,
        title: 'Todo has been removed',
        timerProgressBar: true
    });
}

function filterByTodoID(id) {
    return state.todos.filter(todo => todo.id === id)[0];
}

function filterByTodoIndex(id) {
    let index = 0;
    state.todos.forEach(todo => {
        if (todo.id === id) {
            state.index = index;
        } else { 
            index++;
        }
    });
}
</script>

<style scoped>
h3 {
    color: grey;
}
</style>
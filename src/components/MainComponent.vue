<template>
<main class="container-fluid">
    <ModalComponent :data="todos"></ModalComponent> 
    <b-row no-gutters v-if="todos.length">
        <b-col lg="6" class="mb-3" id="todo">
            <h2>Todo</h2>
            <hr class="mx-1">
            <TodoComponent :todos="todosIsCompleted" @todoToCompleted="todoToCompleted" @todoDelete="todoDelete"></TodoComponent>
        </b-col>
        <b-col lg="6" class="mb-3" id="completed">
            <h2>Completed</h2>
            <hr class="mx-1">
            <TodoComponent :todos="todosCompleted" @todoToIsCompleted="todoToIsCompleted" @todoDelete="todoDelete"></TodoComponent>
        </b-col>
    </b-row>
    <b-row align-content="center" v-else>
        <b-col>
            <h3 class="font-weight-light font-italic text-center my-3">Todo Not Found :(</h3>
        </b-col>
    </b-row>
</main>
</template>

<script>
import ModalComponent from './ModalComponent.vue'
import TodoComponent from './TodoComponent.vue'

export default {
    name: 'MainComponent',
    components: {
        ModalComponent,
        TodoComponent
    },
    data() {
        return {
            todosCompleted: [],
            todosIsCompleted: [],
            todos: JSON.parse(localStorage.getItem('TODO-APPS')) || [],
            index: 0
        }
    },
    created() {
        this.filterTodo;
    },
    beforeUpdate() {
        this.todosCompleted = [];
        this.todosIsCompleted = [];
        this.filterTodo;
    },
    computed: {
        filterTodo() {
            return this.todos.filter(todo => {
            if (todo.isCompleted) {
                this.todosCompleted.push(todo);
            } else {
                this.todosIsCompleted.push(todo);
            } 
        });
        }
    },
    methods: {
        todoToCompleted(id) {
            const data = this.filterByTodoID(id);
            data.isCompleted = true;
            this.filterByTodoIndex(id);
            this.todos.splice(this.index, 1);
            this.todos.push(data);
            localStorage.setItem('TODO-APPS', JSON.stringify(this.todos));
            this.$swal({
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false,
                icon: 'success',
                toast: true,
                title: 'Todo has finished',
                timerProgressBar: true
            })
            this.index = 0;
        },
        todoToIsCompleted(id) {
            const data = this.filterByTodoID(id);
            data.isCompleted = false;
            this.filterByTodoIndex(id);
            this.todos.splice(this.index, 1);
            this.todos.push(data);
            localStorage.setItem('TODO-APPS', JSON.stringify(this.todos));
            this.$swal({
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false,
                icon: 'success',
                toast: true,
                title: 'Todo is not finished',
                timerProgressBar: true
            })
            this.index = 0;
        },
        todoDelete(id) {
            this.filterByTodoIndex(id);
            this.todos.splice(this.index, 1);
            localStorage.setItem('TODO-APPS', JSON.stringify(this.todos));
            this.$swal({
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false,
                icon: 'success',
                toast: true,
                title: 'Todo has been removed',
                timerProgressBar: true
            })
            this.index = 0;
        },
        filterByTodoID(id) {
            return this.todos.filter(todo => todo.id === id)[0];
        },
        filterByTodoIndex(id) {
            let index = 0;
            this.todos.forEach(todo => {
                if (todo.id === id) {
                    this.index = index;
                } else { 
                    index++;
                }
            });
        }
    }
}
</script>

<style scoped>
h3 {
    color: grey;
}
</style>
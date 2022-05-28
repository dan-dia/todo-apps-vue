<template>
<section>
  <article v-for="todo in todos" v-bind:key="todo.id" class="px-2">
    <b-card no-body class="accordion mb-1" role="tab">
      <b-card-header header-tag="header" class="p-1 d-flex" role="tablist">
        <b-button v-b-toggle="todo.id" variant="transparent" class="flex-fill">{{ todo.title }}</b-button>
        <b-button size="sm" variant="warning" class="ml-1" v-if="todo.isCompleted" @click.prevent="$emit('todoToIsCompleted', todo.id)">
          <b-icon icon="arrow-left" class="text-white"></b-icon>
        </b-button>
        <b-button size="sm" variant="success" class="ml-1" v-if="!todo.isCompleted" @click.prevent="$emit('todoToCompleted', todo.id)">
          <b-icon icon="check-lg"></b-icon>
        </b-button>
        <b-button size="sm" variant="danger" class="ml-1" @click.prevent="$emit('todoDelete', todo.id)">
          <b-icon icon="x-lg"></b-icon>
        </b-button>
      </b-card-header>
      <b-collapse :id="todo.id" appear role="tabpanel">
        <b-card-body>
          <b-card-text>{{ todo.description }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </article>
</section>
</template>

<script>
export default {
    name: 'TodoComponent',
    props: ['todos', 'isCompleted'],
}
</script>
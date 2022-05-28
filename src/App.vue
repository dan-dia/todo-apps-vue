<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <header class="sticky-top">
      <headerComponent />
    </header>

    <main class="flex-grow-1">
      <MainComponent></MainComponent>
    </main>

    <footer class="bg-dark">
      <FooterComponent />
    </footer>
  </div>
</template>

<style>
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

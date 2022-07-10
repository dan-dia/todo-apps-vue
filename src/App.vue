<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <v-app>
    <HeaderComponent></HeaderComponent>
    <MainComponent></MainComponent>
    <FooterComponent></FooterComponent>
  </v-app>
</template>

<style>
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

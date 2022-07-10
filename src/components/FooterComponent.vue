<template>
    <v-footer app light>
        <p class="text-center mx-auto my-0">
            Copyright &copy; {{ updateYear }}. <span>Created with <v-icon color="red" small>mdi-heart</v-icon> by
                <a href="http://github.com/dan-dia" target="_blank" rel="noopener noreferrer"
                    class="text-decoration-none">Dandi Ahmadin</a></span>
        </p>
    </v-footer>
</template>

<style scoped>
@media screen and (max-width: 425px) {
    span {
        display: block;
    }
}
</style>

<script setup>
import { computed } from "@vue/composition-api";

const year = new Date().getFullYear();

const updateYear = computed(() => {
    return (year === 2022) ? `2022` : `2022 - ${year}`;
});
</script>
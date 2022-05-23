<template>
    <footer class="bg-dark">
        <p class="text-white text-center py-1 m-0">
            Copyright &copy; {{updateYear}}. <span>Created with <b-icon-heart-fill variant="danger"></b-icon-heart-fill> by <a href="http://github.com/dandia14" target="_blank" rel="noopener noreferrer" class="text-decoration-none">Dandi Ahmadin</a></span>
        </p>
    </footer>
</template>

<style scoped>
 @media screen and (max-width: 425px) {
    span {
        display: block;
    }
 }
</style>

<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            year: new Date().getFullYear()
        }
    },
    computed: {
        updateYear() {
            return this.year === 2022 ? `2022` : `2022 - ${this.year}`;
        }
    }

}
</script>
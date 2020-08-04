<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">{{ title }}</a>
            <router-link to="pwned">Pwned</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'PandoraMenu',
    props: {
        title: String
    }, 
    data() {
        return {
            test: "Hola"
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">{{ title }}</a>
            <button @click="ViewPwneds()" class="btn btn-primary">Advanced Config</button>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'PandoraMenu',
    props: {
        title: String,
        password: String,
        verifypassword: String
    },
    methods: {
        ViewPwneds() {
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-4">
                <h1 class="title center">{{ essid }}</h1>
                <p>Intentos almacenados: {{ pwneds.length }}</p>
                <button @click="Return()" class="btn btn-primary btn-block">Regresar</button>
            </div>

            <div class="col-md-8">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ESSID</th>
                            <th>BSSID</th>
                            <th>Password</th>
                            <th>Model</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pwned of pwneds" v-bind:key="pwned.ID">
                            <td>{{ pwned.ID }}</td>
                            <td>{{ pwned.ESSID }}</td>
                            <td>{{ pwned.BSSID }}</td>
                            <td>{{ pwned.psw1 }}</td>
                            <td>{{ pwned.model }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EssidView',
    data() {
        return {
            essid: '',
            pwneds: {}
        }
    },
    methods: {
        GetSelectData() {
            this.essid = this.$route.params.id
            fetch(`/api/config/pwned/${this.essid}`)
                .then(res => res.json())
                .then(data => {
                    this.pwneds = data;
            })
        },
        Return() {
            this.$router.push('/pwned')
        }
    },
    created() {
        this.GetSelectData()
    }
}
</script>
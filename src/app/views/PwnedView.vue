<template>
    <div class="container pt-5">
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
                    <td>
                        <router-link :to="{ name: 'EssidView', params: {id: pwned.ESSID} }">
                            {{ pwned.ESSID }}
                        </router-link>
                    </td>
                    <td>{{ pwned.BSSID }}</td>
                    <td>{{ pwned.psw1 }}</td>
                    <td>{{ pwned.model }}</td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="GetData()">Actualizar</button>
    </div>
</template>

<script>
class Pwneds {
    constructor(id, essid, bssid, psw1, psw2) {
        this.id = id,
        this.essid = essid,
        this.bssid = bssid,
        this.psw1 = psw1,
        this.psw2 = psw2
    }
}

export default {
    name: "PwnedView",
    data() {
        return {
            pwneds: [],
            SelectData: ''
        }
    },
    methods: {
        GetData() {
            fetch('/api/config/pwned')
                .then(res => res.json())
                .then(data => {
                    this.pwneds = data;
                })
            this.SelectData = '';
        }
    },
    created() {
        this.GetData()
    }
}
</script>
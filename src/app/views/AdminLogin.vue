<template>
    <div class="container">
        <div class="row pt-5 pt-5 justify-content-center">
            <div class="col-md-7">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="Login()" >
                            <div class="form-group">
                                <input 
                                    v-model="username" 
                                    class="form-control" 
                                    type="text">
                            </div>
                            <div class="form-group">
                                <input 
                                    v-model="password" 
                                    class="form-control"
                                    type="password">
                            </div>
                            <button class="btn btn-primary btn-block">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import hash from '../encrypt/hash';

export default {
    name: 'AdminLogin',
    data() {
        return {
            username: '',
            password: '',
            EncryptedPassword: ''
        }
    },
    methods: {
        Login() {
            if(this.username && this.password) {
                fetch('/api/config/login/' + this.username)
                    .then(res => res.json())
                    .then(data => {
                        this.EncryptedPassword = hash.Hash(this.password)
                        if(data[0].psw == this.EncryptedPassword) {
                            this.$router.push('/pwned')
                        } else {
                            this.username = '';
                            this.password = ''; 
                            this.EncryptedPassword = '';
                            alert('Contraseña incorrecta')
                        }
                    })
            }
        }
    }
}
</script>
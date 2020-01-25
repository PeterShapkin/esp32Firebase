<template>
    <div>
        <input
                type="email"
                placeholder="Email"
                v-model="email"
        />
        <input
                type="password"
                placeholder="Пароль"
                v-model="password"
        />
        <button
                :class="{'disabled' : !email || !password }"
                @click="toDashboard"
                :disabled="!email || !password"
        >
            Войти
        </button>
    </div>
</template>

<script>
    import firebase from 'firebase/app'

    export default {

        name: 'SignIn',

        data() {
            return {
                email: '',
                password: null,
            }
        },

        methods: {
            toDashboard() {
                // TODO залогиниться
                firebase.auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(
                        () => {
                            // eslint-disable-next-line no-console
                            console.log('ok')
                            this.$router.push({
                                name: 'Dashboard',
                            })
                        },
                        // eslint-disable-next-line no-console
                        () => console.log('net')
                    )
            }
        }
    }
</script>

<style scoped>
div {
    width: 20%;
    margin: 40vh auto auto;
}

input {
    width: 100%;
    font-size: 15px;
    border: none;
    padding: 10px;
    margin-bottom: 15px;
    border-bottom: 2px solid gainsboro;
}

button {
    background-color: dodgerblue;
    border-radius: 3px;
    border: none;
    color: white;
    box-shadow: 2px 2px 4px grey;
    font-size: 15px;
    font-weight: 500;
    padding: 5px 10px;
    margin-top: 20px;
}

.disabled {
    color: darkgray;
    background-color: steelblue;
    box-shadow: 0 0;
}
</style>

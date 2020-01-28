<template>
    <div>
        <input
                type="email"
                placeholder="Email"
                v-model="email"
        >
        <input
                type="password"
                placeholder="Пароль"
                v-model="password"
        >
        <button
                v-if="!entering"
                :class="{'disabled' : !email || !password }"
                @click="toDashboard"
                :disabled="!email || !password"
        >
            Войти
        </button>
        <div
                class="loader"
                v-if="entering"
        >

        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app'

    export default {

        name: 'SignIn',

        data() {
            return {
                email: 'test@abc.com',
                password: '123qwer',
                entering: false,
            }
        },

        methods: {
            toDashboard() {

                this.entering = true

                firebase.auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(
                        () => {
                            localStorage.setItem('auth', 'true')

                            this.entering = false
                            this.email = ''
                            this.password = ''

                            this.$router.push({
                                name: 'Dashboard',
                            })
                        },
                    )
            }
        }
    }
</script>

<style scoped lang="stylus">
@import '../styles/loader.styl'

div
    width 20%
    margin 40vh auto auto


input
    width 100%
    font-size 15px
    border none
    padding 10px
    margin-bottom 15px
    border-bottom 2px solid gainsboro
    outline none


button
    background-color dodgerblue
    border-radius 3px
    border none
    color white
    box-shadow 2px 2px 4px grey
    font-size 15px
    font-weight 500
    padding 5px 10px
    margin-top 20px
    outline none

    &:active
        box-shadow 0 0


.disabled
    color darkgray
    background-color steelblue
    box-shadow: 0 0


.loader
    $defaultLoader(-1, 28px)
    width 28px
    height 28px
    margin-top 20px

</style>

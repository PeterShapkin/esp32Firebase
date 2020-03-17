<template>
    <div class="wrapper">
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
        <input
                placeholder="MAC"
                v-model="mac"
        >

        <div class="buttonBlock">
            <button
                    v-if="!entering"
                    :class="{'disabled' : !email || !password || !mac}"
                    @click="toDashboard"
                    :disabled="!email || !password || !mac"
            >
                Войти
            </button>
            <button
                    v-if="!entering"
                    :class="{'disabled' : !email || !password || !mac}"
                    @click="logIn"
                    :disabled="!email || !password || !mac"
            >
                Зарегистрироваться
            </button>
            <div
                    class="loader"
                    v-if="entering"
            >

            </div>
        </div>

    </div>
</template>

<script>
    //запрос с железки - POST по урлу база/:mac (права на запись маков
    // (то есть каждого узла верхнего уровня) = true, чтение маков = auth !== null)
    // !! Просто авторизованный пользователь не сможет видеть чужие данные, т.к. вывод данных только введённому урлу !!
    // ..А если он введёт чужой мак руками в адресную строку?..
    // То есть каждый запрос будет добавлять новую запись, и на борде надо выводить
    // записи согласно timestamp'у.

    //TODO если пароль/логин неправильные
    //TODO сделать лодер нормально
    //TODO проверить, если есть аккаунт с такими же данными при регистрации

    import firebase from 'firebase/app'

    export default {

        name: 'SignIn',

        data() {
            return {
                email: 'test@abc.com',
                password: '123qwer',
                mac: '123',
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
                                params: {
                                    mac: this.mac
                                }
                            })

                            this.mac = ''
                        },
                    )
            },

            logIn() {

                this.entering = true

                firebase.auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(
                        () => {
                            // Если в FirebaseRD ещё нет узла с названием
                            // введённого MAC'а...
                            if (!firebase.database().ref('/' + this.mac).key){

                                // создаём узел в FirebaseRD, где имя узла -
                                // это регистрируемый MAC:
                                firebase.database()
                                    .ref('/' + this.mac)
                                    .set('')

                                // создаём запись в группе 'users', чтобы при авторизации
                                // сопоставить введённый email с MAC-адресом и направить
                                // нужные данные:
                                firebase.database()
                                    .ref('users/')
                                    .set({
                                        userEmail: this.email,
                                        mac: this.mac
                                    })
                            }
                            else {
                                console.log('Такой MAC-адрес уже зарегистрирован.')
                            }
                        }
                    )

            }
        }
    }
</script>

<style scoped lang="stylus">
@import '../styles/loader.styl'


.wrapper
    width 20%
    margin 40vh auto auto


.buttonBlock
    display flex
    justify-content center
    margin-top 30px


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
    outline none

    &:first-child
        margin-right 20px

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

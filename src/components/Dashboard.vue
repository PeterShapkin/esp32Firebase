<template>
  <div>
    <table
          v-for="(view, key) in addresses"
          :key="view.mac + Date.now() + key"
    >
      <thead>
        <tr @click="addresses[key][key] = !addresses[key][key]">
          <td>{{view.mac}}</td>
          <td>{{formatDate(view.time)}}</td>
        </tr>
      </thead>

      <tbody v-if="addresses[key][key]">
        <tr
           v-for="state in view.state"
           :key="state[0]"
        >
          <td>{{state[0]}}</td>
          <td
                  v-for="ioState in state[1]"
                  :key="Date.now() + ioState + Math.random()"
          >
            {{ioState}}
          </td>
        </tr>
      </tbody>

    </table>

    <input
            type="file"
            @change="onChangeHandler"
    >
    <progress
            max="100"
            :value="uploader"
    />
    <button @click="logOut">
      Выйти
    </button>
  </div>
</template>

<script>
  import firebase from 'firebase/app'

  export default {

  name: 'Dashboard',

  data() {
    return {
      uploader: 0,
      addresses: {},
    }
  },

  created() {
    firebase.database()
            .ref('/data')
            .orderByKey()
            .limitToLast(20)
            .on(
                    'value',
                    response => {

                      this.addresses = {}

                      const databaseObject = Object.fromEntries(
                              Object.entries(response.val()).reverse()
                      )

                      for (const key in databaseObject) {

                        this.$set(
                                this.addresses,
                                [key],
                                databaseObject[key]
                        )

                        this.$set(
                                this.addresses[key],
                                [key],
                                false
                        )
                      }

                    }
            )
  },

  methods: {
    // Обработчик для загрузки файла в firebase.storage
    onChangeHandler(e) {

      const file = e.target.files[0]

      // Создать ссылку на место хранения файла в store
      const storeRef = firebase.storage().ref('firmware/' + file.name)

      const task = storeRef.put(file)

      //TODO request.auth != null; - вставить в rules FBStorage

      task.on(
              'state_changed',
              snapshot => {
                this.uploader = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              },
              // eslint-disable-next-line no-console
              error => console.log(error.message),

              () => {
                this.uploader = 0
                // eslint-disable-next-line no-console
                console.log('success!')
              }
      )
    },

    logOut() {
      firebase.auth()
              .signOut()
              .then(
                      () => {
                        localStorage.setItem('auth', 'false')
                        this.$router.push({
                          name: 'SignIn'
                        })
                      }
              )
    },

    formatDate(date) {
      const timestamp = Date.parse(date)
      return new Date(timestamp).toLocaleString()
    },
  },
}
</script>

<style scoped lang="stylus">
.view
  font 700 32px Arial sans-serif

table
  border 1px solid red


td
  border 1px solid black


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


button:active
  box-shadow 0 0


.TD
  margin 0

.TDRR
  margin 0

</style>



<!--<table-->
<!--        v-for="(view, key) in views"-->
<!--        :key="key"-->
<!--&gt;-->
<!--  <thead>-->
<!--  <tr @click="addresses[key] = showAddress === key ? null : key">-->
<!--    <td>{{view.mac}}</td>-->
<!--    <td>{{formatDate(view.time)}}</td>-->
<!--  </tr>-->
<!--  </thead>-->

<!--  <tbody v-if="showAddress === key ">-->
<!--  <tr-->
<!--          v-for="state in view.state"-->
<!--          :key="state[0]"-->
<!--  >-->
<!--    <td class="TD">{{state[0]}}</td>-->
<!--    <td-->
<!--            v-for="(ioState, key) in state[1]"-->
<!--            :key="key + Date.now() + view.mac"-->
<!--            class="TDRR"-->
<!--    >-->
<!--      {{ioState}}-->
<!--    </td>-->
<!--  </tr>-->
<!--  </tbody>-->

<!--</table>-->
